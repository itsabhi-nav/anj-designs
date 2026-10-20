import { NextResponse } from "next/server";

import { emailIsConfigured, sendContactEmail } from "@/lib/email";
import { validateContact, type ContactPayload } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form endpoint.
 *
 * The route is honest about delivery: it answers 200 only when the message
 * was actually handed to the email provider. Without a configured provider it
 * answers 503 and the interface offers a mailto fallback instead of a fake
 * success state.
 */

/** Simple in-memory rate limit: 5 submissions per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We have received several enquiries from this connection. Please try again shortly, or call us directly.",
      },
      { status: 429 }
    );
  }

  let body: Partial<ContactPayload>;
  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "The submission could not be read." },
      { status: 400 }
    );
  }

  const { data, errors } = validateContact(body);

  if (!data) {
    // A filled honeypot looks like a successful submission to the bot but is
    // rejected silently for everyone else.
    if (errors.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    return NextResponse.json(
      { ok: false, message: "Please correct the highlighted fields.", errors },
      { status: 422 }
    );
  }

  if (!emailIsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The contact form is not connected to an email service on this deployment yet. Please email us directly and we will respond straight away.",
        configurationRequired: true,
      },
      { status: 503 }
    );
  }

  const result = await sendContactEmail(data);

  if (!result.delivered) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Your message could not be delivered by the email service. Please email us directly and we will respond straight away.",
        detail: result.reason,
      },
      { status: 502 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Your enquiry has been sent.",
      reference: result.id ?? "received",
    },
    { status: 200 }
  );
}

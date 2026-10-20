import { escapeHtml } from "@/lib/validation";
import type { ContactPayload } from "@/lib/validation";

/**
 * Contact-form delivery.
 *
 * The site never claims a message was sent unless the provider confirmed it.
 *
 *  • `RESEND_API_KEY` present  → the message is handed to Resend and the
 *    response is only "delivered" when Resend returns 2xx.
 *  • No API key                → `sendContactEmail` returns
 *    { delivered: false, reason }, the route answers 503 and the interface
 *    offers a pre-filled mailto fallback instead of a fake success state.
 *
 * Credentials are read server-side only and are never exposed to the client.
 */

export interface DeliveryResult {
  delivered: boolean;
  reason?: string;
  id?: string;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function emailIsConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

function buildHtml(data: ContactPayload): string {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Project type", data.projectType],
    ["Project location", data.location || "—"],
    ["Budget", data.budget || "—"],
  ];

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#F1F0E8;font-family:Manrope,Helvetica,Arial,sans-serif;color:#202720;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#FAFAF6;border:1px solid rgba(16,40,32,.14);">
        <tr><td style="background:#102820;padding:28px 32px;">
          <p style="margin:0;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#C0A878;">New enquiry</p>
          <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;color:#F1F0E8;font-weight:500;">ANJ Designs by Decor Inn</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows
              .map(
                ([label, value]) => `<tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(16,40,32,.1);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#849B80;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(16,40,32,.1);font-size:15px;">${escapeHtml(value)}</td>
                </tr>`
              )
              .join("")}
          </table>
          <p style="margin:26px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#849B80;">Message</p>
          <p style="margin:10px 0 0;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message || "—")}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendContactEmail(data: ContactPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "website@anjdesigns.in";

  if (!apiKey || !to) {
    return {
      delivered: false,
      reason: "No email provider is configured on this deployment.",
    };
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `New ${data.projectType} enquiry — ${data.name}`,
        html: buildHtml(data),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return {
        delivered: false,
        reason: `Email provider responded ${response.status}. ${detail.slice(0, 200)}`,
      };
    }

    const result = (await response.json().catch(() => ({}))) as { id?: string };
    return { delivered: true, id: result.id };
  } catch (error) {
    return {
      delivered: false,
      reason: error instanceof Error ? error.message : "Unknown delivery error",
    };
  }
}

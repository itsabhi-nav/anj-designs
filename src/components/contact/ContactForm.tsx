"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Check, Loader2, Send } from "lucide-react";

import { contact } from "@/data/site";
import { BUDGETS, PROJECT_TYPES } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
  website: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [reference, setReference] = useState<string>("");

  const set = (key: keyof FormState) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const mailtoFallback = useMemo(() => {
    const subject = `New ${values.projectType || "interior design"} enquiry — ${values.name || "Website visitor"}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Project type: ${values.projectType}`,
      `Project location: ${values.location}`,
      `Budget: ${values.budget}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${contact.emails.primary}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [values]);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!values.email.trim()) next.email = "We need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(values.email.trim()))
      next.email = "Please check that email address.";
    if (!values.projectType) next.projectType = "Please choose the kind of project.";
    if (values.phone && !/^[+]?[\d\s()-]{7,20}$/.test(values.phone.trim()))
      next.phone = "Please check that phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        reference?: string;
      };

      if (response.ok) {
        setStatus("success");
        setReference(payload.reference ?? "");
        setValues(EMPTY);
        return;
      }

      setStatus("error");
      setServerMessage(
        payload.message ??
          "We could not deliver your message right now. Please email us directly."
      );
    } catch {
      setStatus("error");
      setServerMessage(
        "The connection was interrupted before your message could be sent. Please email us directly."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="border border-forest/15 bg-ivory p-8 lg:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest text-champagne">
          <Check className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-display text-3xl text-ink">
          Thank you — your enquiry is with us.
        </h3>
        <p className="mt-4 max-w-md text-body-md text-ink-muted">
          We have received your message and a member of the team will respond
          shortly. If it is urgent, please call{" "}
          <a
            href={contact.phones[1].href}
            className="link-underline text-forest"
          >
            {contact.phones[1].label}
          </a>
          .
        </p>
        {reference && (
          <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-sage">
            Reference: {reference}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReference("");
          }}
          className="btn btn-outline btn-sm mt-8"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="border border-forest/15 bg-ivory p-6 sm:p-8 lg:p-12"
    >
      <h2 className="font-display text-3xl text-ink">Tell us about your space</h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-muted">
        The more you tell us, the more useful our first conversation will be.
        Fields marked with an asterisk are required.
      </p>

      {status === "error" && (
        <div
          role="alert"
          className="mt-7 flex gap-3 border border-[#a1442f]/30 bg-[#a1442f]/[0.06] p-4"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0 text-[#a1442f]"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div className="text-sm leading-relaxed">
            <p className="text-[#a1442f]">{serverMessage}</p>
            <p className="mt-2 text-ink-muted">
              You can also send it straight to{" "}
              <a
                href={mailtoFallback}
                className="link-underline text-forest"
              >
                {contact.emails.primary}
              </a>{" "}
              — your message will be pre-filled.
            </p>
          </div>
        </div>
      )}

      <div className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Field
          id="field-name"
          label="Full name *"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
          required
        />
        <Field
          id="field-email"
          label="Email *"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
          required
        />
        <Field
          id="field-phone"
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
          autoComplete="tel"
        />

        <div>
          <label htmlFor="field-projectType" className="field-label">
            Project type *
          </label>
          <select
            id="field-projectType"
            value={values.projectType}
            onChange={(event) => set("projectType")(event.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={
              errors.projectType ? "error-projectType" : undefined
            }
            className="field mt-2 appearance-none rounded-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23849B80%22 stroke-width=%221.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8"
          >
            <option value="">Select a service</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p id="error-projectType" className="field-error">
              <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              {errors.projectType}
            </p>
          )}
        </div>

        <Field
          id="field-location"
          label="Project location"
          value={values.location}
          onChange={set("location")}
          error={errors.location}
          placeholder="City, area"
        />

        <div className="sm:col-span-2">
          <label htmlFor="field-budget" className="field-label">
            Indicative budget
          </label>
          <select
            id="field-budget"
            value={values.budget}
            onChange={(event) => set("budget")(event.target.value)}
            className="field mt-2 appearance-none rounded-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23849B80%22 stroke-width=%221.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8"
          >
            <option value="">Prefer not to say yet</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="field-message" className="field-label">
            Your message
          </label>
          <textarea
            id="field-message"
            rows={5}
            value={values.message}
            onChange={(event) => set("message")(event.target.value)}
            placeholder="Tell us about the space, the scope and the timeline you have in mind."
            className="field mt-2 resize-y"
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, visible to naive bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => set("website")(event.target.value)}
        />
      </div>

      <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn btn-primary disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <Send className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-ink-muted">
          We use your details only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `error-${id.replace("field-", "")}` : undefined}
        className="field mt-2"
      />
      {error && (
        <p
          id={`error-${id.replace("field-", "")}`}
          className="field-error"
        >
          <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/site";

const INTERESTS = [
  "Solar panels",
  "Solar battery",
  "Inverter or replacement",
  "EV charger",
  "Heat pump hot water",
  "Pool heating",
];

const BILLS = [
  "Under $400 a quarter",
  "$400 – $700 a quarter",
  "$700 – $1,200 a quarter",
  "Over $1,200 a quarter",
  "Not sure",
];

const field =
  "w-full rounded-[14px] border border-blue/15 bg-paper px-4 py-3.5 text-[0.95rem] text-blue outline-none transition-colors duration-300 placeholder:text-ink-soft/70 focus:border-ember focus:ring-2 focus:ring-ember/20";
const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft";

export default function QuoteForm() {
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [errorKind, setErrorKind] = useState(null);
  const [fieldErrors, setFieldErrors] = useState([]);
  const liveRef = useRef(null);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      address: fd.get("address"),
      propertyType: fd.get("propertyType"),
      bill: fd.get("bill"),
      notes: fd.get("notes"),
      company: fd.get("company"), // honeypot
      interests: fd.getAll("interests"),
    };

    setState("sending");
    setFieldErrors([]);
    try {
      // POST, never a query string: this carries a name, phone and home address.
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setState("sent");
        // Send them to a dedicated URL rather than swapping the form for a
        // message in place. A real /thank-you page is what analytics and ad
        // platforms count as a conversion — an in-place state change is
        // invisible to them, so every lead would go unattributed.
        // No form data in the URL: this carries a name, phone and address.
        router.push("/thank-you");
        return;
      }
      setFieldErrors(data.fields || []);
      setErrorKind(data.error || "unknown");
      setState("error");
    } catch {
      setErrorKind("network");
      setState("error");
    }
  }

  // Brief confirmation while the router navigates to /thank-you. Without this
  // the form would sit there looking unresponsive for the moment it takes.
  if (state === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[22px] border border-green/30 bg-green/[0.06] p-[clamp(1.75rem,3vw,3rem)]"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-green/20">
          <svg width="20" height="20" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#63b93b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="t-h3 mt-6 text-blue">Thanks, we have it.</h2>
        <p className="t-body mt-3 max-w-[48ch] text-ink">Taking you through…</p>
      </div>
    );
  }

  const failed = state === "error";

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Your name *</label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Jane Nguyen"
            aria-invalid={fieldErrors.includes("name") || undefined} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} placeholder="0400 000 000"
            aria-invalid={fieldErrors.includes("phone") || undefined} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="jane@example.com"
          aria-invalid={fieldErrors.includes("email") || undefined} />
      </div>

      <div className="mt-5">
        <label htmlFor="address" className={labelCls}>Installation address *</label>
        <input id="address" name="address" required autoComplete="street-address" className={field}
          placeholder="Street, suburb and postcode"
          aria-invalid={fieldErrors.includes("address") || undefined} />
        <p className="mt-2 text-[0.8rem] text-ink-soft">
          We need this to check your roof, your distributor and which rebates you qualify for.
        </p>
      </div>

      <fieldset className="mt-8">
        <legend className={labelCls}>Property type</legend>
        <div className="flex flex-wrap gap-2.5">
          {["Home", "Business"].map((t, i) => (
            <label key={t} className="qf-chip">
              <input type="radio" name="propertyType" value={t} defaultChecked={i === 0} className="peer sr-only" />
              <span className="qf-chip-face">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className={labelCls}>What are you interested in?</legend>
        <div className="flex flex-wrap gap-2.5">
          {INTERESTS.map((t) => (
            <label key={t} className="qf-chip">
              <input type="checkbox" name="interests" value={t} className="peer sr-only" />
              <span className="qf-chip-face">{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="bill" className={labelCls}>Roughly what is your power bill?</label>
        <select id="bill" name="bill" className={field} defaultValue="">
          <option value="" disabled>Select a range</option>
          {BILLS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className={labelCls}>Anything else we should know?</label>
        <textarea id="notes" name="notes" rows={4} className={`${field} resize-y`}
          placeholder="Shading, roof type, an existing system, a deadline — anything that helps us quote accurately." />
      </div>

      {failed && (
        <div role="alert" ref={liveRef} className="mt-7 rounded-[16px] border border-ember/35 bg-ember/[0.06] p-5">
          {errorKind === "missing_fields" || errorKind === "invalid_email" ? (
            <p className="text-[0.92rem] leading-relaxed text-blue">
              Please check the highlighted fields and try again.
            </p>
          ) : (
            <>
              <p className="text-[0.92rem] font-semibold text-blue">We could not send that just now.</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                Sorry — please call us on{" "}
                <a href={SITE.quotePhoneHref} className="font-semibold text-ember underline underline-offset-4">{SITE.quotePhone}</a>{" "}
                or email{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-ember underline underline-offset-4">{SITE.email}</a>{" "}
                and we will pick it up straight away.
              </p>
            </>
          )}
        </div>
      )}

      <button type="submit" disabled={state === "sending"} className="btn btn-ember mt-9 w-full disabled:opacity-70">
        <span>{state === "sending" ? "Sending…" : "Request my free quote"}</span>
      </button>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-soft">
        We use your details only to prepare and discuss your quote. No obligation, and no pushy
        sales visit.
      </p>
    </form>
  );
}

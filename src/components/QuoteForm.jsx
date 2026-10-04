"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/Select";
import { SITE } from "@/lib/site";
import { QUOTE_SERVICES, labelForSlug, resolveServiceSlug } from "@/lib/quote-services";
import { BRIGHTE_APPROVED, NSW_PROGRAM_ACCESS } from "@/lib/finance";
import { useAuState } from "@/lib/state-context";
import { EVENTS, track } from "@/lib/track";

/**
 * Quote request form.
 *
 * REBUILT to the client brief, 4 October 2026. The shape it asks for:
 * service tiles, a Residential/Commercial choice, an address, short contact
 * fields, an optional bill upload, "Help me choose", and a 0% finance
 * question.
 *
 * THE RULE THAT DRIVES THE STATE DESIGN: every selection must survive a
 * validation error. The release checklist calls this out specifically, and it
 * is the classic way a form loses a lead — someone picks four services, fills
 * everything in, mistypes an email, and the server bounces it back with the
 * selections gone. So nothing here is an uncontrolled input. Every value
 * lives in React state, a failed submit only sets an error, and the form
 * re-renders with all of it intact.
 */

const PROPERTY = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
];

const BILLS = [
  "Under $400 a quarter",
  "$400 to $700 a quarter",
  "$700 to $1,200 a quarter",
  "Over $1,200 a quarter",
  "Not sure",
];

/* 6MB. Phone cameras produce 3 to 5MB photos of a bill, so this has room for
   a real one without letting someone paste a video into a JSON request. */
const MAX_UPLOAD = 6 * 1024 * 1024;

const field =
  "w-full rounded-[14px] border border-blue/15 bg-paper px-4 py-3.5 text-[0.95rem] text-blue outline-none transition-colors duration-300 placeholder:text-ink-soft/70 focus:border-ember focus:ring-2 focus:ring-ember/20";
const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft";

export default function QuoteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { state: auState } = useAuState();

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorKind, setErrorKind] = useState(null);
  const [fieldErrors, setFieldErrors] = useState([]);

  // ---- everything the visitor has chosen, all controlled ----
  const [property, setProperty] = useState("residential");
  const [services, setServices] = useState([]);
  const [helpMeChoose, setHelpMeChoose] = useState(false);
  const [wantsFinance, setWantsFinance] = useState(false);
  const [bill, setBill] = useState("");
  /* Marketing consent. SEPARATE from the enquiry, and unticked by default.
     Bundling the two — "submit this and you agree to receive marketing" — is
     not consent, it is a condition of getting a quote, and it is the thing
     the Privacy Act and the Spam Act are both written to catch. Someone must
     be able to ask for a price without signing up to a mailing list. */
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  /* The package a visitor picked on the packages page, carried through in the
     URL. It is EDITABLE here, not locked: someone who chose Gold and then
     changed their mind should not have to go back and start again. Clearing
     it simply means "no package chosen". */
  const [chosenPackage, setChosenPackage] = useState("");
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    abn: "",
    // Asked for only when it changes the answer. See below.
    existingInverter: "",
    notes: "",
  });
  const [upload, setUpload] = useState(null); // { name, size, type, data }
  const [uploadError, setUploadError] = useState(null);

  const errorRef = useRef(null);

  /* Preselect from ?service=. The hero's three buttons and every service
     page's quote button arrive here with the service already decided, so
     asking again would be asking a question the visitor has just answered. */
  useEffect(() => {
    const pkg = params.get("package");
    if (pkg) setChosenPackage(pkg.slice(0, 40));

    const slug = resolveServiceSlug(params.get("service"));
    if (!slug) return;
    setServices([slug]);
    if (slug === "commercial") setProperty("commercial");
  }, [params]);

  // Move focus to the error so a keyboard or screen reader user is told.
  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const visible = QUOTE_SERVICES.filter((s) =>
    property === "commercial" ? s.scope === "commercial" : s.scope === "residential"
  );

  const financeOffered = BRIGHTE_APPROVED || (NSW_PROGRAM_ACCESS && auState === "NSW");

  function toggleService(slug) {
    setServices((prev) => {
      // quote_start fires once, on the first real interaction, not on page
      // view: a view is not a start and counting it as one inflates every
      // downstream rate.
      if (prev.length === 0) track(EVENTS.QUOTE_START, { service: slug, state: auState });
      return prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
    });
  }

  function onProperty(next) {
    setProperty(next);
    // Drop selections that do not exist in the other scope, so a commercial
    // enquiry never arrives carrying "Pool heating".
    setServices((prev) =>
      prev.filter((slug) => {
        const s = QUOTE_SERVICES.find((x) => x.slug === slug);
        return s && (next === "commercial" ? s.scope === "commercial" : s.scope === "residential");
      })
    );
  }

  async function onFile(e) {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) {
      setUpload(null);
      return;
    }
    if (file.size > MAX_UPLOAD) {
      setUploadError("That file is over 6MB. Send a photo of the first page, or email it to us.");
      setUpload(null);
      e.target.value = "";
      return;
    }
    try {
      const data = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = () => reject(r.error);
        r.readAsDataURL(file);
      });
      setUpload({ name: file.name, size: file.size, type: file.type, data });
    } catch {
      setUploadError("We could not read that file. You can email it to us instead.");
      e.target.value = "";
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const payload = {
      ...contact,
      propertyType: property === "commercial" ? "Business" : "Home",
      // Readable labels, not slugs: this lands in someone's inbox or CRM and
      // "battery-existing-solar" is not a thing a salesperson should decode.
      interests: services.map(labelForSlug),
      serviceSlugs: services,
      helpMeChoose,
      wantsFinance,
      chosenPackage,
      marketingOptIn,
      state: auState,
      bill,
      attachment: upload,
      company: "", // honeypot stays empty for real people
    };

    setStatus("sending");
    setFieldErrors([]);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("sent");
        track(EVENTS.QUOTE_SUBMIT, {
          services: services.join(","),
          property,
          state: auState,
          wantsFinance,
          helpMeChoose,
          hasAttachment: Boolean(upload),
        });
        // A real URL, because that is what analytics and ad platforms count
        // as a conversion. No form data in it: this carries a name, a phone
        // number and a home address.
        router.push("/thank-you");
        return;
      }
      setFieldErrors(data.fields || []);
      setErrorKind(data.error || "unknown");
      setStatus("error");
      track(EVENTS.QUOTE_ERROR, { reason: data.error || "unknown" });
    } catch {
      setErrorKind("network");
      setStatus("error");
    }
  }

  if (status === "sent") {
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

  const failed = status === "error";
  const invalid = (k) => fieldErrors.includes(k) || undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ---------- 1. who is asking ---------- */}
      <fieldset>
        <legend className={labelCls}>This is for a</legend>
        <div
          role="radiogroup"
          aria-label="Property type"
          className="inline-flex rounded-full bg-cloud p-1 ring-1 ring-blue/10"
        >
          {PROPERTY.map((p) => {
            const on = p.key === property;
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                onClick={() => onProperty(p.key)}
                className={`rounded-full px-5 py-2 text-[0.86rem] font-semibold transition-colors duration-300 ${
                  on ? "bg-action text-blue" : "text-ink hover:text-blue"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* ---------- 2. what they need ---------- */}
      <fieldset className="mt-8">
        <legend className={labelCls}>What are you after? Pick as many as apply</legend>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {visible.map((s) => {
            const on = services.includes(s.slug);
            return (
              <label
                key={s.slug}
                className={`flex cursor-pointer items-start gap-3 rounded-[16px] border p-3.5 transition-colors duration-300 ${
                  on
                    ? "border-action bg-action/[0.10]"
                    : "border-blue/12 bg-paper hover:border-blue/25"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={on}
                  onChange={() => toggleService(s.slug)}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border-2 ${
                    on ? "border-blue bg-blue" : "border-blue/25"
                  }`}
                >
                  {on && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#F8C646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.92rem] font-semibold leading-snug text-blue">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
                    {s.line}
                  </span>
                </span>
              </label>
            );
          })}
        </div>

        {/* Help me choose. Separate from the tiles on purpose: it is not a
            service, it is permission to not know yet, and a visitor who is
            unsure should not have to guess at a tile to get past this step. */}
        <label
          className={`mt-2.5 flex cursor-pointer items-start gap-3 rounded-[16px] border border-dashed p-3.5 transition-colors duration-300 ${
            helpMeChoose ? "border-action bg-action/[0.10]" : "border-blue/20 hover:border-blue/35"
          }`}
        >
          <input
            type="checkbox"
            className="sr-only"
            checked={helpMeChoose}
            onChange={() => setHelpMeChoose((v) => !v)}
          />
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border-2 ${
              helpMeChoose ? "border-blue bg-blue" : "border-blue/25"
            }`}
          >
            {helpMeChoose && (
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#F8C646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span>
            <span className="block text-[0.92rem] font-semibold text-blue">Help me choose</span>
            <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
              Not sure what you need? We will work it out from your bill and your roof.
            </span>
          </span>
        </label>
      </fieldset>

      {/* The package carried in from the packages page. Shown as a summary
          the visitor can clear, not as a hidden field: an enquiry that says
          "Gold" when the person has since changed their mind is worse than
          one that says nothing. */}
      {chosenPackage && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-action bg-action/[0.10] px-4 py-3.5">
          <span className="text-[0.9rem] text-blue">
            Package chosen: <strong>{chosenPackage}</strong>
          </span>
          <button
            type="button"
            onClick={() => setChosenPackage("")}
            className="text-[0.82rem] font-semibold text-ember underline underline-offset-4"
          >
            Clear
          </button>
        </div>
      )}

      {/* ---------- 3. where ---------- */}
      <div className="mt-8">
        <label htmlFor="address" className={labelCls}>Installation address *</label>
        <input
          id="address"
          name="address"
          required
          autoComplete="street-address"
          className={field}
          placeholder="Start typing your street address"
          value={contact.address}
          onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
          aria-invalid={invalid("address")}
          aria-describedby="address-help"
        />
        <p id="address-help" className="mt-2 text-[0.8rem] text-ink-soft">
          We need this to check your roof, your distributor and which rebates apply in your
          state.
        </p>
        {/* NOTE FOR THE NEXT DEV: the brief asks for address SEARCH. Real
            autocomplete needs a places provider and an API key, which Lumenx
            has not supplied. The field is deliberately a plain, correctly
            autocompleted input until then rather than a fake suggestion list:
            a dropdown that cannot find your street is worse than no dropdown.
            Drop a provider in here and the rest of the form is unaffected. */}
      </div>

      {/* Existing inverter. Shown ONLY when the answer changes what we quote:
          adding a battery to existing solar, or repairing an inverter. The
          brand and model decide whether the job is a hybrid swap, an
          AC-coupled battery beside the existing unit, or a replacement, and
          those are very different numbers. Asking everyone would be three
          extra fields of friction for the 80% it does not apply to. */}
      {(services.includes("battery-existing-solar") || services.includes("inverter-repair")) && (
        <div className="mt-5">
          <label htmlFor="existingInverter" className={labelCls}>
            Your current inverter, brand and model{" "}
            <span className="font-normal normal-case tracking-normal text-ink-soft">
              (if you know it)
            </span>
          </label>
          <input
            id="existingInverter"
            className={field}
            placeholder="e.g. Sungrow SG5K-D, or Fronius Primo 5.0"
            value={contact.existingInverter}
            onChange={(e) => setContact((c) => ({ ...c, existingInverter: e.target.value }))}
          />
          <p className="mt-2 text-[0.8rem] text-ink-soft">
            It is on the label on the front of the unit. This is the single thing that lets us
            quote accurately without visiting first, so it is worth a photo if you are unsure.
          </p>
        </div>
      )}

      {property === "commercial" && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="abn" className={labelCls}>ABN</label>
            <input
              id="abn"
              className={field}
              placeholder="11 222 333 444"
              value={contact.abn}
              onChange={(e) => setContact((c) => ({ ...c, abn: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="bill-c" className={labelCls}>Monthly power bill</label>
            <Select id="bill-c" name="bill" value={bill} options={BILLS} onChange={setBill} placeholder="Select a range" />
          </div>
        </div>
      )}

      {/* ---------- 4. contact ---------- */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Your name *</label>
          <input
            id="name" required autoComplete="name" className={field} placeholder="Jane Nguyen"
            value={contact.name}
            onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
            aria-invalid={invalid("name")}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone *</label>
          <input
            id="phone" type="tel" required autoComplete="tel" className={field} placeholder="0400 000 000"
            value={contact.phone}
            onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
            aria-invalid={invalid("phone")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input
          id="email" type="email" required autoComplete="email" className={field} placeholder="jane@example.com"
          value={contact.email}
          onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
          aria-invalid={invalid("email")}
        />
      </div>

      {property !== "commercial" && (
        <div className="mt-5">
          <label htmlFor="bill" className={labelCls}>Roughly what is your power bill?</label>
          <Select id="bill" name="bill" value={bill} options={BILLS} onChange={setBill} placeholder="Select a range" />
        </div>
      )}

      {/* ---------- 5. optional bill upload ---------- */}
      <div className="mt-5">
        <label htmlFor="billfile" className={labelCls}>
          Your latest bill {property === "commercial" ? "or 12 months of interval data" : ""}{" "}
          <span className="font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
        </label>
        <input
          id="billfile"
          type="file"
          accept="image/*,.pdf,.csv,.xlsx"
          onChange={onFile}
          className="block w-full cursor-pointer rounded-[14px] border border-dashed border-blue/20 bg-paper px-4 py-3.5 text-[0.9rem] text-ink file:mr-4 file:rounded-full file:border-0 file:bg-cloud file:px-4 file:py-2 file:text-[0.82rem] file:font-semibold file:text-blue hover:border-blue/35"
        />
        {upload && (
          <p className="mt-2 text-[0.8rem] text-green-ink">
            Attached: {upload.name} ({Math.round(upload.size / 1024)}KB)
          </p>
        )}
        {uploadError && (
          <p role="alert" className="mt-2 text-[0.8rem] text-ember">{uploadError}</p>
        )}
        <p className="mt-2 text-[0.8rem] text-ink-soft">
          A photo of the first page is enough. It lets us size the system on what you actually
          use rather than on an estimate.
        </p>
      </div>

      {/* ---------- 6. finance interest ---------- */}
      {financeOffered && (
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-[16px] border border-blue/12 bg-cloud p-4">
          <input
            type="checkbox"
            className="sr-only"
            checked={wantsFinance}
            onChange={() => setWantsFinance((v) => !v)}
          />
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border-2 ${
              wantsFinance ? "border-blue bg-blue" : "border-blue/25"
            }`}
          >
            {wantsFinance && (
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#F8C646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span>
            <span className="block text-[0.92rem] font-semibold text-blue">
              I am interested in 0% finance
            </span>
            <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
              We will include the repayment options with your quote. Ticking this does not apply
              for anything and does not affect your credit file.
            </span>
          </span>
        </label>
      )}

      <div className="mt-5">
        <label htmlFor="notes" className={labelCls}>Anything else we should know?</label>
        <textarea
          id="notes" rows={4} className={`${field} resize-y`}
          placeholder="Shading, roof type, an existing system, a deadline: anything that helps us quote accurately."
          value={contact.notes}
          onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
        />
      </div>

      {failed && (
        <div
          role="alert"
          ref={errorRef}
          tabIndex={-1}
          className="mt-7 rounded-[16px] border border-ember/35 bg-ember/[0.06] p-5 outline-none"
        >
          {errorKind === "missing_fields" || errorKind === "invalid_email" ? (
            <>
              <p className="text-[0.92rem] font-semibold text-blue">
                Please check the highlighted fields.
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                Everything else you chose has been kept.
              </p>
            </>
          ) : (
            <>
              <p className="text-[0.92rem] font-semibold text-blue">We could not send that just now.</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                Sorry about that. Please call us on{" "}
                <a href={SITE.phoneHref} className="font-semibold text-ember underline underline-offset-4">{SITE.phone}</a>{" "}
                or email{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-ember underline underline-offset-4">{SITE.email}</a>{" "}
                and we will pick it up straight away.
              </p>
            </>
          )}
        </div>
      )}

      {/* ---------- 7. marketing opt-in, on its own ----------
          Unticked, optional, and worded so that declining it is obviously
          fine. It sits ABOVE the submit button rather than below it, because
          a consent control a reader scrolls past after submitting is not a
          consent control. */}
      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className="sr-only"
          checked={marketingOptIn}
          onChange={() => setMarketingOptIn((v) => !v)}
        />
        <span
          aria-hidden="true"
          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] border-2 ${
            marketingOptIn ? "border-blue bg-blue" : "border-blue/25"
          }`}
        >
          {marketingOptIn && (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#F8C646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-[0.86rem] leading-relaxed text-ink">
          Send me occasional updates about rebate changes and new offers.{" "}
          <span className="text-ink-soft">
            Optional. You will get your quote either way, and you can unsubscribe at any time.
          </span>
        </span>
      </label>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-7 w-full disabled:opacity-70">
        <span>{status === "sending" ? "Sending…" : "Request my free quote"}</span>
      </button>

      {/* Privacy notice. Beside the form and before the data leaves the
          browser, not buried in the footer: it tells the reader what we
          collect it for and links to the policy that says the rest. */}
      <p className="mt-5 text-[0.8rem] leading-relaxed text-ink-soft">
        We use your name, contact details and address only to prepare and discuss your quote, to
        check your rebate eligibility and to lodge the paperwork. We do not sell your
        information. See our{" "}
        <Link href="/privacy-policy" className="font-semibold text-ember underline underline-offset-4">
          Privacy Policy
        </Link>{" "}
        for how long we keep it and how to ask for it back. No obligation, and no pushy sales
        visit.
      </p>
    </form>
  );
}

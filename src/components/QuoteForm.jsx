"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "@/components/Select";
import { SITE } from "@/lib/site";
import { QUOTE_SERVICES, SERVICE_SLUGS, labelForSlug, resolveServiceSlug } from "@/lib/quote-services";
import { BRIGHTE_APPROVED, NSW_PROGRAM_ACCESS } from "@/lib/finance";
import { useAuState } from "@/lib/state-context";
import { EVENTS, track } from "@/lib/track";
import {
  BILLS_COMMERCIAL,
  BILLS_RESIDENTIAL,
  FIELD_ORDER,
  LIMITS,
  SERVICE_STATES,
  parseAuPhone,
  suggestEmail,
  validateQuote,
} from "@/lib/quote-validation";
import { readAttribution } from "@/lib/attribution";

/**
 * Quote request form.
 *
 * REBUILT to the client brief, 4 October 2026: service tiles, a
 * Residential/Commercial choice, an address, short contact fields, an
 * optional bill upload, "Help me choose", and a 0% finance question.
 *
 * VALIDATED 8 October 2026 for the GoHighLevel connection. The rules live in
 * lib/quote-validation.js and the API route runs the same file, so the form
 * and the server can never disagree. Errors appear under the field they
 * belong to: after the visitor leaves a field, and on every field once they
 * have tried to submit.
 *
 * THE RULE THAT DRIVES THE STATE DESIGN: every selection must survive a
 * validation error. Someone picks four services, fills everything in,
 * mistypes an email, and nothing they chose is lost. Every value lives in
 * React state; a failed submit only shows errors.
 */

const PROPERTY = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
];

const STATE_LABELS = SERVICE_STATES.map((s) => s.label);
const stateCode = (label) => SERVICE_STATES.find((s) => s.label === label)?.code ?? "";
const stateLabel = (code) => SERVICE_STATES.find((s) => s.code === code)?.label ?? "";

/* 6MB. Phone cameras produce 3 to 5MB photos of a bill. */
const MAX_UPLOAD = 6 * 1024 * 1024;

const fieldBase =
  "w-full rounded-[14px] border bg-paper px-4 py-3.5 text-[0.95rem] text-blue outline-none transition-colors duration-300 placeholder:text-ink-soft/70 focus:border-ember focus:ring-2 focus:ring-ember/20";
const field = (bad) => `${fieldBase} ${bad ? "border-ember/70" : "border-blue/15"}`;
const labelCls = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft";
const optional = (
  <span className="font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
);

/** The message under a field. Its id is what the input's aria-describedby points at. */
function FieldError({ id, msg }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[0.8rem] font-medium leading-snug text-ember">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-px shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 4.5v4.2M8 11.2v.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span>{msg}</span>
    </p>
  );
}

function Tick({ on }) {
  return (
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
  );
}

export default function QuoteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { state: auState } = useAuState();

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorKind, setErrorKind] = useState(null);

  // ---- everything the visitor has chosen, all controlled ----
  const [property, setProperty] = useState("residential");
  const [services, setServices] = useState([]);
  const [helpMeChoose, setHelpMeChoose] = useState(false);
  const [wantsFinance, setWantsFinance] = useState(false);
  const [bill, setBill] = useState("");
  /* Marketing consent. SEPARATE from the enquiry, and unticked by default:
     someone must be able to ask for a price without joining a mailing list
     (Privacy Act and Spam Act). */
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  /* The package picked on the packages page, carried in the URL. Editable,
     not locked: clearing it means "no package chosen". */
  const [chosenPackage, setChosenPackage] = useState("");
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    businessName: "",
    abn: "",
    existingInverter: "",
    notes: "",
  });
  const [upload, setUpload] = useState(null); // { name, size, type }
  const [uploadError, setUploadError] = useState(null);

  // ---- validation display ----
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const errorRef = useRef(null);
  // True once the visitor picks a state themselves; until then it follows the site state.
  const statePicked = useRef(false);

  const set = (k) => (e) => {
    const value = e?.target ? e.target.value : e;
    setContact((c) => ({ ...c, [k]: value }));
    // A server message is about the value that was sent; editing clears it.
    setServerErrors((s) => (s[k] ? { ...s, [k]: undefined } : s));
  };
  const touch = (k) => () => setTouched((t) => (t[k] ? t : { ...t, [k]: true }));

  /* Preselect from ?service= and ?package=. */
  useEffect(() => {
    const pkg = params.get("package");
    if (pkg) setChosenPackage(pkg.slice(0, 40));

    const slug = resolveServiceSlug(params.get("service"));
    if (!slug) return;
    setServices([slug]);
    if (slug === "commercial") setProperty("commercial");
  }, [params]);

  /* Default the address state to the state the visitor is browsing in. The
     site state loads from storage a moment after first render, so this keeps
     following it until the visitor picks a state, and never overrides that. */
  useEffect(() => {
    if (!statePicked.current) setContact((c) => ({ ...c, state: auState }));
  }, [auState]);

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  const visible = QUOTE_SERVICES.filter((s) =>
    property === "commercial" ? s.scope === "commercial" : s.scope === "residential"
  );
  const bills = property === "commercial" ? BILLS_COMMERCIAL : BILLS_RESIDENTIAL;
  const financeOffered = BRIGHTE_APPROVED || (NSW_PROGRAM_ACCESS && auState === "NSW");

  const input = {
    ...contact,
    property,
    services,
    helpMeChoose,
    bill,
  };

  /* Re-run the shared rules on every render. Cheap, and it means an error
     clears the moment the value becomes valid instead of on the next blur. */
  const { errors: clientErrors } = useMemo(
    () => validateQuote(input, SERVICE_SLUGS),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contact, property, services, helpMeChoose, bill]
  );

  /** The error to SHOW for a field: only once it has been left, or after a submit attempt. */
  const err = (k) => serverErrors[k] || ((attempted || touched[k]) && clientErrors[k]) || null;
  const describe = (k, ...extra) => [err(k) && `${k}-error`, ...extra].filter(Boolean).join(" ") || undefined;

  const emailSuggestion = !clientErrors.email ? suggestEmail(contact.email) : null;

  function toggleService(slug) {
    setServices((prev) => {
      // quote_start fires once, on the first real interaction.
      if (prev.length === 0) track(EVENTS.QUOTE_START, { service: slug, state: auState });
      return prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
    });
  }

  function onProperty(next) {
    setProperty(next);
    // Drop selections that do not exist in the other scope, and the bill
    // range, because the two scopes use different ranges.
    setServices((prev) =>
      prev.filter((slug) => {
        const s = QUOTE_SERVICES.find((x) => x.slug === slug);
        return s && (next === "commercial" ? s.scope === "commercial" : s.scope === "residential");
      })
    );
    setBill("");
  }

  /** Tidy a valid phone number into the local format when the visitor leaves the field. */
  function onPhoneBlur() {
    touch("phone")();
    const p = parseAuPhone(contact.phone);
    if (!p.error) setContact((c) => ({ ...c, phone: p.display }));
  }

  function onFile(e) {
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
    setUpload({ name: file.name, size: file.size, type: file.type });
  }

  function focusFirstError(errs) {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (!first) return;
    const el = document.getElementById(first === "services" ? "services-group" : first);
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    setAttempted(true);
    if (Object.keys(clientErrors).length) {
      setStatus("idle");
      focusFirstError(clientErrors);
      track(EVENTS.QUOTE_ERROR, { reason: "validation", fields: Object.keys(clientErrors).join(",") });
      return;
    }

    const payload = {
      ...input,
      wantsFinance: financeOffered && wantsFinance,
      chosenPackage,
      marketingOptIn,
      siteState: auState,
      attachment: upload ? { name: upload.name, type: upload.type } : null,
      attribution: readAttribution(),
      company: e.currentTarget.elements.company?.value || "", // honeypot
    };

    setStatus("sending");
    setServerErrors({});
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
          state: contact.state,
          wantsFinance,
          helpMeChoose,
          hasAttachment: Boolean(upload),
        });
        // A real URL, because that is what analytics and ad platforms count
        // as a conversion. No form data in it.
        router.push("/thank-you");
        return;
      }
      if (data.error === "validation" && data.errors) {
        setServerErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }
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

  const shownErrorCount = attempted ? Object.keys({ ...clientErrors, ...serverErrors }).filter((k) => err(k)).length : 0;

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
        <div role="radiogroup" aria-label="Property type" className="inline-flex rounded-full bg-cloud p-1 ring-1 ring-blue/10">
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
      <fieldset
        id="services-group"
        tabIndex={-1}
        aria-describedby={describe("services")}
        className="mt-8 rounded-[18px] outline-none"
      >
        <legend className={labelCls}>What are you after? Pick as many as apply *</legend>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {visible.map((s) => {
            const on = services.includes(s.slug);
            return (
              <label
                key={s.slug}
                className={`flex cursor-pointer items-start gap-3 rounded-[16px] border p-3.5 transition-colors duration-300 ${
                  on ? "border-action bg-action/[0.10]" : err("services") ? "border-ember/45 bg-paper" : "border-blue/12 bg-paper hover:border-blue/25"
                }`}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleService(s.slug)} />
                <Tick on={on} />
                <span className="min-w-0">
                  <span className="block text-[0.92rem] font-semibold leading-snug text-blue">{s.label}</span>
                  <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">{s.line}</span>
                </span>
              </label>
            );
          })}
        </div>

        {/* Help me choose: permission to not know yet, so an unsure visitor
            does not have to guess at a tile to get past this step. */}
        <label
          className={`mt-2.5 flex cursor-pointer items-start gap-3 rounded-[16px] border border-dashed p-3.5 transition-colors duration-300 ${
            helpMeChoose ? "border-action bg-action/[0.10]" : "border-blue/20 hover:border-blue/35"
          }`}
        >
          <input type="checkbox" className="sr-only" checked={helpMeChoose} onChange={() => setHelpMeChoose((v) => !v)} />
          <Tick on={helpMeChoose} />
          <span>
            <span className="block text-[0.92rem] font-semibold text-blue">Help me choose</span>
            <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
              Not sure what you need? We will work it out from your bill and your roof.
            </span>
          </span>
        </label>
        <FieldError id="services-error" msg={err("services")} />
      </fieldset>

      {chosenPackage && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-action bg-action/[0.10] px-4 py-3.5">
          <span className="text-[0.9rem] text-blue">
            Package chosen: <strong>{chosenPackage}</strong>
          </span>
          <button type="button" onClick={() => setChosenPackage("")} className="text-[0.82rem] font-semibold text-ember underline underline-offset-4">
            Clear
          </button>
        </div>
      )}

      {/* ---------- 3. where ----------
          Four parts rather than one free-text line: they map straight onto
          GHL's address fields, and the postcode is checked against the state
          (rebates, distributor and STC zone all depend on it).
          NOTE FOR THE NEXT DEV: address SEARCH needs a places provider and an
          API key, which Lumenx has not supplied. Drop one onto #street and
          have it fill the other three; validation is unaffected. */}
      <fieldset className="mt-8">
        <legend className={labelCls}>Installation address *</legend>
        <div>
          <label htmlFor="street" className="sr-only">Street address</label>
          <input
            id="street"
            autoComplete="address-line1"
            maxLength={LIMITS.street}
            className={field(err("street"))}
            placeholder="Street address, e.g. 12 Example Street"
            value={contact.street}
            onChange={set("street")}
            onBlur={touch("street")}
            aria-invalid={Boolean(err("street")) || undefined}
            aria-describedby={describe("street")}
          />
          <FieldError id="street-error" msg={err("street")} />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr_0.8fr]">
          <div>
            <label htmlFor="suburb" className="sr-only">Suburb</label>
            <input
              id="suburb"
              autoComplete="address-level2"
              maxLength={LIMITS.suburb}
              className={field(err("suburb"))}
              placeholder="Suburb"
              value={contact.suburb}
              onChange={set("suburb")}
              onBlur={touch("suburb")}
              aria-invalid={Boolean(err("suburb")) || undefined}
              aria-describedby={describe("suburb")}
            />
            <FieldError id="suburb-error" msg={err("suburb")} />
          </div>
          <div>
            <label htmlFor="state" className="sr-only">State</label>
            <Select
              id="state"
              name="state"
              value={stateLabel(contact.state)}
              options={STATE_LABELS}
              onChange={(label) => {
                statePicked.current = true;
                set("state")(stateCode(label));
                touch("state")();
              }}
              placeholder="State"
              invalid={Boolean(err("state"))}
              describedBy={describe("state")}
            />
            <FieldError id="state-error" msg={err("state")} />
          </div>
          <div>
            <label htmlFor="postcode" className="sr-only">Postcode</label>
            <input
              id="postcode"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={4}
              className={field(err("postcode"))}
              placeholder="Postcode"
              value={contact.postcode}
              onChange={(e) => set("postcode")(e.target.value.replace(/\D/g, ""))}
              onBlur={touch("postcode")}
              aria-invalid={Boolean(err("postcode")) || undefined}
              aria-describedby={describe("postcode")}
            />
            <FieldError id="postcode-error" msg={err("postcode")} />
          </div>
        </div>
        <p id="address-help" className="mt-2 text-[0.8rem] text-ink-soft">
          We install across Victoria and New South Wales. The address lets us check your roof,
          your distributor and which rebates apply.
        </p>
      </fieldset>

      {/* Existing inverter. Shown ONLY when the answer changes what we quote:
          a battery for existing solar, or an inverter repair. */}
      {(services.includes("battery-existing-solar") || services.includes("inverter-repair")) && (
        <div className="mt-5">
          <label htmlFor="existingInverter" className={labelCls}>
            Your current inverter, brand and model{" "}
            <span className="font-normal normal-case tracking-normal text-ink-soft">(if you know it)</span>
          </label>
          <input
            id="existingInverter"
            maxLength={LIMITS.existingInverter}
            className={field(false)}
            placeholder="e.g. Sungrow SG5K-D, or Fronius Primo 5.0"
            value={contact.existingInverter}
            onChange={set("existingInverter")}
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
            <label htmlFor="businessName" className={labelCls}>Business name *</label>
            <input
              id="businessName"
              autoComplete="organization"
              maxLength={LIMITS.businessName}
              className={field(err("businessName"))}
              placeholder="Example Pty Ltd"
              value={contact.businessName}
              onChange={set("businessName")}
              onBlur={touch("businessName")}
              aria-invalid={Boolean(err("businessName")) || undefined}
              aria-describedby={describe("businessName")}
            />
            <FieldError id="businessName-error" msg={err("businessName")} />
          </div>
          <div>
            <label htmlFor="abn" className={labelCls}>ABN {optional}</label>
            <input
              id="abn"
              inputMode="numeric"
              maxLength={LIMITS.abn}
              className={field(err("abn"))}
              placeholder="11 222 333 444"
              value={contact.abn}
              onChange={(e) => set("abn")(e.target.value.replace(/[^\d\s]/g, ""))}
              onBlur={touch("abn")}
              aria-invalid={Boolean(err("abn")) || undefined}
              aria-describedby={describe("abn")}
            />
            <FieldError id="abn-error" msg={err("abn")} />
          </div>
        </div>
      )}

      {/* ---------- 4. contact ---------- */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>First and last name *</label>
          <input
            id="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            className={field(err("name"))}
            placeholder="Jane Nguyen"
            value={contact.name}
            onChange={set("name")}
            onBlur={touch("name")}
            aria-invalid={Boolean(err("name")) || undefined}
            aria-describedby={describe("name")}
          />
          <FieldError id="name-error" msg={err("name")} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Australian phone number *</label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={LIMITS.phone}
            className={field(err("phone"))}
            placeholder="0412 345 678"
            value={contact.phone}
            onChange={set("phone")}
            onBlur={onPhoneBlur}
            aria-invalid={Boolean(err("phone")) || undefined}
            aria-describedby={describe("phone")}
          />
          <FieldError id="phone-error" msg={err("phone")} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={labelCls}>Email *</label>
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={LIMITS.email}
          className={field(err("email"))}
          placeholder="jane@example.com"
          value={contact.email}
          onChange={set("email")}
          onBlur={touch("email")}
          aria-invalid={Boolean(err("email")) || undefined}
          aria-describedby={describe("email", emailSuggestion && "email-suggest")}
        />
        <FieldError id="email-error" msg={err("email")} />
        {emailSuggestion && (
          <p id="email-suggest" className="mt-2 text-[0.8rem] text-ink">
            Did you mean{" "}
            <button
              type="button"
              onClick={() => set("email")(emailSuggestion)}
              className="font-semibold text-ember underline underline-offset-4"
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="bill" className={labelCls}>
          {property === "commercial" ? "Roughly what is the monthly power bill? *" : "Roughly what is your power bill? *"}
        </label>
        <Select
          id="bill"
          name="bill"
          value={bill}
          options={bills}
          onChange={(v) => {
            setBill(v);
            touch("bill")();
          }}
          placeholder="Select a range"
          invalid={Boolean(err("bill"))}
          describedBy={describe("bill")}
        />
        <FieldError id="bill-error" msg={err("bill")} />
      </div>

      {/* ---------- 5. optional bill upload ---------- */}
      <div className="mt-5">
        <label htmlFor="billfile" className={labelCls}>
          Your latest bill {property === "commercial" ? "or 12 months of interval data" : ""} {optional}
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
        {uploadError && <p role="alert" className="mt-2 text-[0.8rem] text-ember">{uploadError}</p>}
        <p className="mt-2 text-[0.8rem] text-ink-soft">
          A photo of the first page is enough. It lets us size the system on what you actually
          use rather than on an estimate.
        </p>
      </div>

      {/* ---------- 6. finance interest ---------- */}
      {financeOffered && (
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-[16px] border border-blue/12 bg-cloud p-4">
          <input type="checkbox" className="sr-only" checked={wantsFinance} onChange={() => setWantsFinance((v) => !v)} />
          <Tick on={wantsFinance} />
          <span>
            <span className="block text-[0.92rem] font-semibold text-blue">I am interested in 0% finance</span>
            <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">
              We will include the repayment options with your quote. Ticking this does not apply
              for anything and does not affect your credit file.
            </span>
          </span>
        </label>
      )}

      <div className="mt-5">
        <label htmlFor="notes" className={labelCls}>Anything else we should know? {optional}</label>
        <textarea
          id="notes"
          rows={4}
          maxLength={LIMITS.notes}
          className={`${field(err("notes"))} resize-y`}
          placeholder="Shading, roof type, an existing system, a deadline: anything that helps us quote accurately."
          value={contact.notes}
          onChange={set("notes")}
          aria-invalid={Boolean(err("notes")) || undefined}
          aria-describedby={describe("notes")}
        />
        <FieldError id="notes-error" msg={err("notes")} />
      </div>

      {shownErrorCount > 0 && (
        <p role="alert" className="mt-7 rounded-[16px] border border-ember/35 bg-ember/[0.06] p-4 text-[0.9rem] text-blue">
          <strong>
            Please fix {shownErrorCount === 1 ? "the highlighted field" : `the ${shownErrorCount} highlighted fields`}.
          </strong>{" "}
          Everything else you entered has been kept.
        </p>
      )}

      {status === "error" && (
        <div role="alert" ref={errorRef} tabIndex={-1} className="mt-7 rounded-[16px] border border-ember/35 bg-ember/[0.06] p-5 outline-none">
          <p className="text-[0.92rem] font-semibold text-blue">We could not send that just now.</p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
            Sorry about that. Please call us on{" "}
            <a href={SITE.phoneHref} className="font-semibold text-ember underline underline-offset-4">{SITE.phone}</a>{" "}
            or email{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-ember underline underline-offset-4">{SITE.email}</a>{" "}
            and we will pick it up straight away.
          </p>
        </div>
      )}

      {/* ---------- 7. marketing opt-in, on its own ----------
          Unticked, optional, above the submit button. */}
      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input type="checkbox" className="sr-only" checked={marketingOptIn} onChange={() => setMarketingOptIn((v) => !v)} />
        <Tick on={marketingOptIn} />
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

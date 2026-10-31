/**
 * Server-only GoHighLevel API calls, used for one job: saving the customer's
 * uploaded bill onto their contact so the team can open it in GHL.
 *
 * Why this exists alongside the inbound webhook: a webhook can only carry
 * text. The bill is a file, so it goes in through the API: find or create the
 * contact (upsert, matched on email/phone exactly as the workflow's own
 * Create Contact step does), then upload the file to its "Bill Upload" field.
 * The webhook that follows updates the same contact.
 *
 * Environment variables (see docs/GHL.md):
 *   GHL_API_TOKEN      Private Integration token for the Lumenx sub-account
 *   GHL_LOCATION_ID    the sub-account ID
 *   GHL_BILL_FIELD_ID  optional: the "Bill Upload" field's ID (found by key
 *                      automatically when not set)
 * Without the first two, `billUploadConfigured()` is false and the lead is
 * still delivered, flagged so the team knows to ask for the bill.
 */

// GHL_API_BASE exists only so tests can point this at a local stand-in.
const BASE = process.env.GHL_API_BASE || "https://services.leadconnectorhq.com";
const VERSION = process.env.GHL_API_VERSION || "2021-07-28";

export function billUploadConfigured() {
  return Boolean(process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID);
}

/* The "Bill Upload" field's ID. GHL_BILL_FIELD_ID wins if set; otherwise it is
   looked up once by the field's key (contact.bill_upload) and remembered for
   the life of the server.

   THE FIELD MUST BE A *PUBLIC* FILE UPLOAD FIELD. Tested 31 October 2026:
   /forms/upload-custom-files returns "500 Internal server error" for a
   field created with "Private files", and only works with a public one.
   GHL fixes that setting when the field is created, so a private field
   cannot be repaired, only replaced. */
let billFieldId = process.env.GHL_BILL_FIELD_ID || null;

async function getBillFieldId() {
  if (billFieldId) return billFieldId;
  const data = await call(`/locations/${process.env.GHL_LOCATION_ID}/customFields`, {
    method: "GET",
    headers: headers(),
  });
  const field = (data?.customFields || []).find(
    (f) => f?.fieldKey === "contact.bill_upload" || f?.name === "Bill Upload"
  );
  if (!field?.id) throw new Error('GHL has no "Bill Upload" custom field');
  billFieldId = field.id;
  return billFieldId;
}

function headers(extra = {}) {
  return {
    Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
    Version: VERSION,
    Accept: "application/json",
    ...extra,
  };
}

async function call(path, init) {
  const res = await fetch(`${BASE}${path}`, { ...init, signal: AbortSignal.timeout(15_000) });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON error page; the status is what matters.
  }
  if (!res.ok) {
    // Status and GHL's own message only. Never the request body: it carries
    // the customer's details.
    throw new Error(`GHL ${path.split("?")[0]} ${res.status}: ${json?.message || text.slice(0, 200)}`);
  }
  return json;
}

/** Find or create the contact. Returns its ID. */
export async function upsertContact({ firstName, lastName, email, phone }) {
  const data = await call("/contacts/upsert", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      locationId: process.env.GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      source: "Website - Quote Form",
    }),
  });
  const id = data?.contact?.id;
  if (!id) throw new Error("GHL upsert returned no contact id");
  return id;
}

/** Depth-first search for the first http(s) URL in GHL's custom field value. */
function findUrl(value) {
  if (typeof value === "string") return /^https?:\/\//.test(value) ? value : null;
  if (Array.isArray(value)) {
    for (const v of value) {
      const u = findUrl(v);
      if (u) return u;
    }
    return null;
  }
  if (value && typeof value === "object") {
    if (typeof value.url === "string" && /^https?:\/\//.test(value.url)) return value.url;
    for (const v of Object.values(value)) {
      const u = findUrl(v);
      if (u) return u;
    }
  }
  return null;
}

/**
 * Upload the bill to the contact's "Bill Upload" field. Returns the file's GHL
 * link when GHL's response includes one (null if it does not; the file is
 * still on the contact either way).
 */
export async function uploadBill(contactId, file) {
  const fieldId = await getBillFieldId();
  const form = new FormData();
  // GHL's documented key format: "<custom_field_id>_<random id>".
  form.append(`${fieldId}_${crypto.randomUUID()}`, file, file.name);

  const q = new URLSearchParams({ contactId, locationId: process.env.GHL_LOCATION_ID });
  const data = await call(`/forms/upload-custom-files?${q}`, {
    method: "POST",
    headers: headers(), // fetch sets the multipart boundary itself
    body: form,
  });

  // GHL returns the updated contact; the field's value is
  // { "<uuid>": { meta: {...}, url: "https://…/contacts/file/download?id=…" } }.
  const fromReply = urlForField(data?.contact, fieldId);
  if (fromReply) return fromReply;

  // Not always in the reply, so read the contact back once.
  const contact = await call(`/contacts/${contactId}`, { method: "GET", headers: headers() });
  return urlForField(contact?.contact, fieldId);
}

function urlForField(contact, fieldId) {
  const fields = contact?.customFields;
  const ours = Array.isArray(fields) ? fields.find((f) => f?.id === fieldId) : null;
  return ours ? findUrl(ours.value) : null;
}

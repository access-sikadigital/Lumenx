/**
 * Quote form validation, shared by the browser and the API route.
 *
 * ONE set of rules, imported in both places. The form checks as the visitor
 * types so they see a problem next to the field it belongs to; the route runs
 * the exact same checks again because a browser check is a convenience, not a
 * control. If the two ever disagreed, someone would pass the form and then be
 * bounced by the server for a reason the form never mentioned.
 *
 * Every rule here answers a real CRM problem:
 *  - First and last name, so GHL gets first_name / last_name and the team can
 *    address the customer properly.
 *  - Australian numbers only, normalised to +61 format, so GHL's duplicate
 *    matching works and SMS follow-up actually sends.
 *  - Street, suburb, state and postcode as separate parts, so they land in
 *    GHL's own address fields, and the postcode is checked against the state
 *    (rebates, distributors and STC zones all hang off it).
 */

export const SERVICE_STATES = [
  { code: "VIC", label: "Victoria" },
  { code: "NSW", label: "New South Wales" },
];

export const BILLS_RESIDENTIAL = [
  "Under $400 a quarter",
  "$400 to $700 a quarter",
  "$700 to $1,200 a quarter",
  "Over $1,200 a quarter",
  "Not sure",
];

/* Business bills are monthly and an order of magnitude larger. The old form
   showed household quarterly ranges under a "Monthly power bill" label. */
export const BILLS_COMMERCIAL = [
  "Under $1,000 a month",
  "$1,000 to $3,000 a month",
  "$3,000 to $10,000 a month",
  "Over $10,000 a month",
  "Not sure",
];

export const LIMITS = {
  name: 120,
  email: 160,
  phone: 20,
  street: 150,
  suburb: 60,
  businessName: 120,
  abn: 20,
  existingInverter: 120,
  notes: 2000,
};

const collapse = (v) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim() : "");

/* ------------------------------------------------------------------ */
/* Name: first and last, in one field                                  */
/* ------------------------------------------------------------------ */

// Letters from any script (Vietnamese, Chinese and Arabic names included),
// plus the punctuation real surnames use: O'Brien, Smith-Jones, St. Clair.
const NAME_PART = /^[\p{L}\p{M}][\p{L}\p{M}'’.-]*$/u;

export function parseName(raw) {
  const full = collapse(raw);
  if (!full) return { error: "Please enter your first and last name." };
  if (full.length > LIMITS.name) return { error: "That name is too long." };
  const parts = full.split(" ");
  if (!parts.every((p) => NAME_PART.test(p))) {
    return { error: "Names can only contain letters, spaces, hyphens and apostrophes." };
  }
  if (parts.length < 2) {
    return { error: "Please enter your first and last name, e.g. Jane Nguyen." };
  }
  return { full, first: parts[0], last: parts.slice(1).join(" ") };
}

/* ------------------------------------------------------------------ */
/* Phone: Australian mobile or landline only                           */
/* ------------------------------------------------------------------ */

/**
 * Accepts the ways Australians actually write a number:
 *   0412 345 678 · 0412-345-678 · (03) 9123 4567 · +61 412 345 678
 *   +61 (0) 412 345 678 · 61412345678 · 0061 412 345 678
 * and returns it as +61XXXXXXXXX for GHL plus a readable local format.
 *
 * Mobiles (04) and the four geographic landline areas (02, 03, 07, 08) only.
 * 13/1300/1800 numbers are business inbound lines that cannot receive an SMS
 * or a callback from a mobile reliably, so they are not a contact number.
 */
export function parseAuPhone(raw) {
  const input = collapse(raw);
  if (!input) return { error: "Please enter your phone number." };

  let d = input.replace(/\(0\)/g, "").replace(/[\s().-]/g, "");
  if (!/^\+?\d+$/.test(d)) {
    return { error: "Phone numbers can only contain digits, spaces and +." };
  }
  d = d.replace(/^\+/, "");
  if (d.startsWith("0061")) d = "0" + d.slice(4);
  else if (d.startsWith("61") && d.length === 11) d = "0" + d.slice(2);

  if (!/^0[2-478]\d{8}$/.test(d)) {
    return {
      error: "Please enter an Australian mobile or landline, e.g. 0412 345 678 or 03 9123 4567.",
    };
  }
  // Placeholder-style numbers: 0400 000 000, 0411 111 111 and so on.
  if (/^(\d)\1{7}$/.test(d.slice(2))) {
    return { error: "That does not look like a real number. Please check it." };
  }

  const mobile = d[1] === "4";
  const display = mobile
    ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`
    : `(${d.slice(0, 2)}) ${d.slice(2, 6)} ${d.slice(6)}`;
  return { e164: `+61${d.slice(1)}`, display, type: mobile ? "Mobile" : "Landline" };
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

const EMAIL =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export function parseEmail(raw) {
  const v = collapse(raw).replace(/\s/g, "");
  if (!v) return { error: "Please enter your email address." };
  if (v.length > LIMITS.email || !EMAIL.test(v)) {
    return { error: "Please enter a valid email address, e.g. jane@example.com." };
  }
  // Lower-cased whole: GHL matches duplicate contacts on email, and Jane@ and
  // jane@ are the same inbox in practice.
  return { email: v.toLowerCase() };
}

/* The handful of misspellings that account for most bounced enquiries.
   A suggestion only: it never blocks the form, because a domain that looks
   like a typo can be real. */
const DOMAIN_TYPOS = {
  "gmial.com": "gmail.com", "gmai.com": "gmail.com", "gmal.com": "gmail.com",
  "gamil.com": "gmail.com", "gmail.co": "gmail.com", "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com", "gmail.com.au": "gmail.com",
  "hotmial.com": "hotmail.com", "hotmai.com": "hotmail.com", "hotmail.co": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlook.co": "outlook.com", "outlok.com": "outlook.com", "outlook.con": "outlook.com",
  "yaho.com": "yahoo.com", "yahoo.con": "yahoo.com",
  "bigpond.con": "bigpond.com", "bigpond.co": "bigpond.com", "bigpnd.com": "bigpond.com",
  "icloud.co": "icloud.com", "iclod.com": "icloud.com", "icloud.con": "icloud.com",
};

export function suggestEmail(raw) {
  const v = collapse(raw).toLowerCase();
  const at = v.lastIndexOf("@");
  if (at < 1) return null;
  const fix = DOMAIN_TYPOS[v.slice(at + 1)];
  return fix ? `${v.slice(0, at)}@${fix}` : null;
}

/* ------------------------------------------------------------------ */
/* Address                                                             */
/* ------------------------------------------------------------------ */

/* Postcode ranges by state. NSW excludes the ACT's 2600–2618 and 2900–2920.
   VIC includes the 8000s used by some Melbourne addresses. */
const POSTCODE_RANGES = {
  VIC: [[3000, 3999], [8000, 8999]],
  NSW: [[2000, 2599], [2619, 2899], [2921, 2999]],
};

export function postcodeMatchesState(postcode, state) {
  const n = Number(postcode);
  return (POSTCODE_RANGES[state] || []).some(([lo, hi]) => n >= lo && n <= hi);
}

/* ------------------------------------------------------------------ */
/* ABN (commercial, optional)                                          */
/* ------------------------------------------------------------------ */

/** The ATO's published ABN check-digit algorithm. */
export function isValidAbn(raw) {
  const d = String(raw).replace(/\s/g, "");
  if (!/^\d{11}$/.test(d)) return false;
  const w = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const sum = d.split("").reduce((s, ch, i) => s + (Number(ch) - (i === 0 ? 1 : 0)) * w[i], 0);
  return sum % 89 === 0;
}

/* ------------------------------------------------------------------ */
/* The whole form                                                      */
/* ------------------------------------------------------------------ */

/**
 * Validate one submission. Returns `{ errors, values }`:
 *   errors — { fieldName: "message" }, empty when the form is good
 *   values — the cleaned, normalised data (only complete when errors is empty)
 *
 * `serviceSlugs` is the list of valid slugs, passed in so this file does not
 * have to import the service catalogue.
 */
export function validateQuote(input, serviceSlugs = []) {
  const errors = {};
  const values = {};
  const commercial = input.property === "commercial";

  const name = parseName(input.name);
  if (name.error) errors.name = name.error;
  else Object.assign(values, { fullName: name.full, firstName: name.first, lastName: name.last });

  const phone = parseAuPhone(input.phone);
  if (phone.error) errors.phone = phone.error;
  else Object.assign(values, { phone: phone.e164, phoneDisplay: phone.display, phoneType: phone.type });

  const email = parseEmail(input.email);
  if (email.error) errors.email = email.error;
  else values.email = email.email;

  const street = collapse(input.street);
  if (!street) errors.street = "Please enter the street address.";
  else if (street.length < 5 || !/\p{L}/u.test(street)) errors.street = "Please enter the full street address, e.g. 12 Example Street.";
  else if (street.length > LIMITS.street) errors.street = "That address is too long.";
  else values.street = street;

  const suburb = collapse(input.suburb);
  if (!suburb) errors.suburb = "Please enter the suburb.";
  else if (!/^[\p{L}\p{M}][\p{L}\p{M} '’.-]*$/u.test(suburb) || suburb.length > LIMITS.suburb) {
    errors.suburb = "Please enter a valid suburb name.";
  } else values.suburb = suburb;

  const state = SERVICE_STATES.some((s) => s.code === input.state) ? input.state : "";
  if (!state) errors.state = "Please choose a state. We install in Victoria and New South Wales.";
  else values.state = state;

  const postcode = collapse(input.postcode);
  if (!postcode) errors.postcode = "Please enter the postcode.";
  else if (!/^\d{4}$/.test(postcode)) errors.postcode = "Postcodes are 4 digits.";
  else if (state && !postcodeMatchesState(postcode, state)) {
    errors.postcode = `${postcode} is not a ${state} postcode.`;
  } else values.postcode = postcode;

  const services = Array.isArray(input.services)
    ? [...new Set(input.services.filter((s) => serviceSlugs.includes(s)))]
    : [];
  values.services = services;
  values.helpMeChoose = input.helpMeChoose === true;
  if (!services.length && !values.helpMeChoose) {
    errors.services = "Pick at least one service, or tick “Help me choose”.";
  }

  const bills = commercial ? BILLS_COMMERCIAL : BILLS_RESIDENTIAL;
  if (!bills.includes(input.bill)) errors.bill = "Please choose a range. “Not sure” is fine.";
  else values.bill = input.bill;

  values.property = commercial ? "commercial" : "residential";

  if (commercial) {
    const business = collapse(input.businessName);
    if (!business) errors.businessName = "Please enter the business name.";
    else if (business.length > LIMITS.businessName) errors.businessName = "That name is too long.";
    else values.businessName = business;

    const abn = collapse(input.abn).replace(/\s/g, "");
    if (abn && !isValidAbn(abn)) errors.abn = "That ABN is not valid. Check the 11 digits, or leave it blank.";
    else values.abn = abn ? abn.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4") : "";
  } else {
    values.businessName = "";
    values.abn = "";
  }

  values.existingInverter = collapse(input.existingInverter).slice(0, LIMITS.existingInverter);
  const notes = typeof input.notes === "string" ? input.notes.trim() : "";
  if (notes.length > LIMITS.notes) errors.notes = `Please keep this under ${LIMITS.notes} characters.`;
  else values.notes = notes;

  return { errors, values };
}

/** The order fields appear on the page, so focus goes to the FIRST problem. */
export const FIELD_ORDER = [
  "services", "street", "suburb", "state", "postcode", "businessName", "abn",
  "name", "phone", "email", "bill", "notes",
];

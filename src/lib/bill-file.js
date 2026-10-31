/**
 * The optional electricity bill on the quote form.
 *
 * The file travels browser → /api/quote → GHL, where it is saved to a File
 * Upload field on the contact. Two limits shape everything here:
 *
 *  - Vercel rejects a function request body over 4.5MB, so the file plus the
 *    rest of the form has to fit under that. MAX_BILL_BYTES leaves headroom.
 *  - GHL accepts PDF, JPG, PNG, GIF, CSV, XLS and XLSX, but not HEIC (the
 *    iPhone camera format) or WebP. Photos are therefore re-encoded as JPEG in
 *    the browser, which also shrinks a 4MB phone photo to a few hundred KB
 *    while keeping a bill perfectly readable.
 *
 * Shared by the form (to prepare the file) and the API route (to check it).
 */

export const MAX_BILL_BYTES = 4 * 1024 * 1024;

/** What GHL will store, by MIME type → the extension it is saved under. */
export const BILL_TYPES = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "text/csv": "csv",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

/** The file picker's accept list: images of any kind (converted), plus documents. */
export const BILL_ACCEPT = "image/*,.pdf,.csv,.xls,.xlsx";

/* A bill photo stays sharp at this size; anything larger is wasted bytes. */
const MAX_IMAGE_SIDE = 2200;

/** A tidy, safe file name: no paths, no odd characters, the right extension. */
export function safeBillName(name, type) {
  const ext = BILL_TYPES[type] || "bin";
  const base = String(name || "bill")
    .replace(/\.[^.]+$/, "")
    .replace(/[^A-Za-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "bill"}.${ext}`;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("decode"));
    };
    img.src = url;
  });
}

/**
 * Browser only. Turns whatever the visitor picked into a file GHL accepts and
 * Vercel will carry. Resolves to `{ file }` or `{ error }` (a message to show
 * under the picker).
 */
export async function prepareBillFile(file) {
  if (!file) return { file: null };

  if (file.type.startsWith("image/")) {
    let loaded;
    try {
      loaded = await loadImage(file);
    } catch {
      // Typically a HEIC photo in a browser that cannot read HEIC (Chrome on
      // Windows). Safari and iPhones convert it on the way in.
      return { error: "We could not read that photo. Please save it as a JPG or PDF, or email it to us." };
    }
    const { img, url } = loaded;
    const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    // White underneath, so a transparent PNG does not turn black as a JPEG.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);

    const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (!blob) return { error: "We could not process that photo. Please try a JPG or PDF." };
    if (blob.size > MAX_BILL_BYTES) {
      return { error: "That photo is too large even after compressing. Please send the first page only." };
    }
    return { file: new File([blob], safeBillName(file.name, "image/jpeg"), { type: "image/jpeg" }) };
  }

  if (!BILL_TYPES[file.type]) {
    return { error: "Please upload a PDF, a photo, or a CSV/Excel file." };
  }
  if (file.size > MAX_BILL_BYTES) {
    return { error: "That file is over 4MB. Send the first page only, or email it to us." };
  }
  return { file: new File([file], safeBillName(file.name, file.type), { type: file.type }) };
}

/**
 * Server side. Checks the file's first bytes match the type it claims, so a
 * renamed executable cannot ride in as "bill.pdf".
 */
export function sniffMatches(bytes, type) {
  const b = (i) => bytes[i];
  const starts = (...sig) => sig.every((v, i) => b(i) === v);
  switch (type) {
    case "application/pdf":
      return starts(0x25, 0x50, 0x44, 0x46); // %PDF
    case "image/jpeg":
      return starts(0xff, 0xd8, 0xff);
    case "image/png":
      return starts(0x89, 0x50, 0x4e, 0x47);
    case "image/gif":
      return starts(0x47, 0x49, 0x46, 0x38); // GIF8
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return starts(0x50, 0x4b, 0x03, 0x04); // zip
    case "application/vnd.ms-excel":
      return starts(0xd0, 0xcf, 0x11, 0xe0); // OLE
    case "text/csv": {
      // Plain text: no NUL bytes in the first 1KB.
      const n = Math.min(bytes.length, 1024);
      for (let i = 0; i < n; i++) if (bytes[i] === 0) return false;
      return true;
    }
    default:
      return false;
  }
}

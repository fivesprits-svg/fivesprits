export type AadhaarErrors = { aadhaar?: string };

export function validateAadhaar(aadhaar: string): AadhaarErrors {
  const cleaned = aadhaar.replace(/\s/g, "");
  if (!cleaned) return { aadhaar: "Please enter your Aadhaar number" };
  if (!/^\d{12}$/.test(cleaned)) return { aadhaar: "Enter a valid 12-digit Aadhaar number" };
  return {};
}

export function formatAadhaar(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function getLastDigit(aadhaar: string): number {
  const cleaned = aadhaar.replace(/\s/g, "");
  return parseInt(cleaned[cleaned.length - 1] || "0", 10);
}

export function formatDisplayMobile(mobile?: string | null): string {
  if (!mobile || !mobile.trim()) return "+91 98450 12345";
  const raw = mobile.trim();
  const digits = raw.replace(/\D/g, "");

  // If 10 digits (standard Indian mobile)
  if (digits.length === 10) {
    return `+91 ${digits}`;
  }
  // If prefixed with 91 once (12 digits)
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2)}`;
  }
  // If doubly prefixed with 91 (14 digits)
  if (digits.length === 14 && digits.startsWith("9191")) {
    return `+91 ${digits.slice(4)}`;
  }
  // If raw string starts with + or contains repeated +91
  const cleaned = raw.replace(/^(\+91|\+|\s)+/g, "").trim();
  const remainingDigits = cleaned.replace(/\D/g, "");
  if (remainingDigits.length === 10) {
    return `+91 ${remainingDigits}`;
  }
  return `+91 ${cleaned.replace(/^91(?=\d{10})/g, "")}`;
}

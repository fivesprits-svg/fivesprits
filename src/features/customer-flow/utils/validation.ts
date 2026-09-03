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

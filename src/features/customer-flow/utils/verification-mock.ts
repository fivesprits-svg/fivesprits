import type { CustomerSession } from "@/features/customer-flow/types/state";

/**
 * Mock verification service.
 * TODO: Replace with real DigiLocker API integration.
 *
 * Mock logic:
 * - Aadhaar ending in an even digit → age >= 25 (pass)
 * - Aadhaar ending in an odd digit → age < 25 (fail)
 */
export function mockVerifyAadhaar(aadhaarNumber: string): { dateOfBirth: string; age: number } {
  const cleaned = aadhaarNumber.replace(/\s/g, "");
  const lastDigit = parseInt(cleaned[cleaned.length - 1] || "0", 10);
  const isEven = lastDigit % 2 === 0;

  const now = new Date();
  const year = now.getFullYear();

  if (isEven) {
    return { dateOfBirth: "1990-01-15", age: year - 1990 };
  }
  return { dateOfBirth: "2005-06-20", age: year - 2005 };
}

export function shouldVerificationFail(session: CustomerSession | null): boolean {
  if (!session?.age) return false;
  return session.age < 25;
}

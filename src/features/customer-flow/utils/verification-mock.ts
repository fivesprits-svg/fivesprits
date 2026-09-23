import type { UserDetails } from "@/features/customer-flow/types/state";

/**
 * Mock verification service.
 * TODO: Replace with real DigiLocker API integration.
 *
 * Mock logic:
 * - Aadhaar ending in an even digit → age >= 25 (pass)
 * - Aadhaar ending in an odd digit → age < 25 (fail)
 */
export function mockVerifyAadhaar(aadhaarNumber: string): { dateOfBirth: string; age: number } {
  const dateOfBirth = "1990-01-15";
  console.log(aadhaarNumber);

  const dob = new Date(dateOfBirth);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();

  const hasBirthdayPassed =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return {
    dateOfBirth,
    age,
  };
}

export function shouldVerificationFail(userDetails: UserDetails | null): boolean {
  if (!userDetails?.age) return false;
  return userDetails.age < 25;
}

import type { UserDetails } from "@/features/customer-flow/types/state";

export function isSessionLoggedIn(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(userDetails.verified);
}

export function isDigilockerCompleted(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(userDetails.verificationComplete || userDetails.profileComplete);
}

export function isProfileCompleted(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(userDetails.profileComplete);
}

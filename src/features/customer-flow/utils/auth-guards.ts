import type { UserDetails } from "@/features/customer-flow/types/state";

export function isSessionLoggedIn(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(userDetails.verified);
}

export function isDigilockerCompleted(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(
    userDetails.verificationComplete ||
    userDetails.verificationSkipped ||
    userDetails.profileComplete,
  );
}

export function isProfileCompleted(userDetails: UserDetails | null): boolean {
  if (!userDetails) return false;
  return Boolean(userDetails.profileComplete);
}

export function canGuestViewPath(pathname: string): boolean {
  if (
    ["/categories", "/brands", "/products", "/combo-offers", "/offers"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return true;
  }

  return pathname === "/gift-offers";
}

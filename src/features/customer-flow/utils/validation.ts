export type LoginErrors = { name?: string; mobile?: string };

export function validateLogin(name: string, mobile: string): LoginErrors {
  return {
    name: name.trim() ? undefined : "Please enter your name",
    mobile: /^\d{10}$/.test(mobile) ? undefined : "Enter a valid 10-digit mobile number",
  };
}

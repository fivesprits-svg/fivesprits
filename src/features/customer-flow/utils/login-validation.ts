export type LoginErrors = { name?: string; mobile?: string };

export function validateLogin(name: string, mobile: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!name.trim()) {
    errors.name = "User name is required";
  }
  if (!mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(mobile)) {
    errors.mobile = "Enter a 10-digit valid number";
  }
  return errors;
}

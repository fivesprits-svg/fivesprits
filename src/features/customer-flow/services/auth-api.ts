import { getAuthToken } from "./api-client";

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const clean = envUrl.replace(/\/+$/, "");
  return clean.endsWith("/api/v1") ? clean : `${clean}/api/v1`;
};

export interface RequestOtpPayload {
  username: string;
  mobileNumber: string;
}

export interface VerifyOtpPayload {
  username: string;
  mobileNumber: string;
  otp: string;
}

export interface CustomerLoginPayload {
  mobileNumber: string;
  password: string;
}

export interface CustomerUser {
  id?: string;
  name?: string;
  username?: string;
  mobileNumber?: string;
  role?: string;
  [key: string]: unknown;
}

export interface AuthApiResponse<T = unknown> {
  success?: boolean;
  status?: number;
  message?: string;
  data: T;
}

export async function requestOtpApi(payload: RequestOtpPayload): Promise<
  AuthApiResponse<{
    username: string;
    mobileNumber: string;
    otp?: string;
    otpExpiresAt?: string;
  }>
> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/auth/customer/request-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: payload.username.trim(),
      mobileNumber: payload.mobileNumber.trim(),
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
      "Failed to request verification code. Please try again.";
    throw new Error(errorMsg);
  }
  return json;
}

export async function verifyOtpApi(payload: VerifyOtpPayload): Promise<
  AuthApiResponse<{
    accessToken: string;
    user: CustomerUser;
  }>
> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/auth/customer/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: payload.username.trim(),
      mobileNumber: payload.mobileNumber.trim(),
      otp: payload.otp.trim(),
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
      "Verification failed. Please check the code and try again.";
    throw new Error(errorMsg);
  }
  return json;
}

export async function customerLoginApi(payload: CustomerLoginPayload): Promise<
  AuthApiResponse<{
    accessToken: string;
    user: CustomerUser;
  }>
> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/auth/customer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobileNumber: payload.mobileNumber.trim(),
      password: payload.password,
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
      "Invalid mobile number or password.";
    throw new Error(errorMsg);
  }
  return json;
}

export async function logoutApi(): Promise<AuthApiResponse<null>> {
  const baseUrl = getBaseUrl();
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg =
      (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
      "Logout failed. Please try again.";
    throw new Error(errorMsg);
  }
  return json;
}

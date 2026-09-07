import { apiFetch, getAuthToken } from "./api-client";

export interface CustomerProfile {
  _id: string;
  name: string;
  username?: string;
  mobileNumber?: string;
  email?: string;
  roleName?: string;
  permitNumber?: string;
  dateOfBirth?: string;
  age?: number;
  userType?: string;
  createdAt?: string;
}

export async function fetchCustomerProfileApi(): Promise<CustomerProfile | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const res = await apiFetch<CustomerProfile>("/users/me");
    return res.data;
  } catch (err) {
    console.warn("fetchCustomerProfileApi error:", err);
    return null;
  }
}

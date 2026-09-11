import { apiFetch } from "./api-client";

export interface UpdateProfilePayload {
  name?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  permitNumber?: string;
  address?: string;
  pincode?: string;
  googleMapsLocation?: string;
}

export interface ProfileUpdateResponse {
  _id: string;
  name: string;
  lastName?: string;
  email?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  permitNumber?: string;
  address?: string;
  pincode?: string;
  googleMapsLocation?: string;
}

export async function updateProfileApi(
  payload: UpdateProfilePayload,
): Promise<ProfileUpdateResponse> {
  const res = await apiFetch<ProfileUpdateResponse>("/profile/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res.data;
}

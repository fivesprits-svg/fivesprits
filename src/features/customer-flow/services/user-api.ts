import { apiFetch, apiUpload } from "./api-client";

export interface CustomerProfile {
  _id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  mobileNumber?: string;
  email?: string;
  roleName?: string;
  permitNumber?: string;
  dateOfBirth?: string;
  age?: number;
  address?: string;
  pincode?: string;
  googleMapsLocation?: string;
  userType?: string;
  createdAt?: string;
  profileImageUrl?: string | null;
  permitDocumentUrl?: string | null;
  profileFileId?: string | null;
  permitDocumentFileId?: string | null;
  cartCount?: number;
}

export async function fetchCustomerProfileApi(): Promise<CustomerProfile | null> {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("customer_access_token") ||
        window.localStorage.getItem("access_token") ||
        null
      : null;
  if (!token) return null;

  try {
    const res = await apiFetch<CustomerProfile>("/users/me");
    return res.data;
  } catch (err) {
    console.warn("fetchCustomerProfileApi error:", err);
    return null;
  }
}

export async function uploadFileApi(
  file: File,
  folder: string = "uploads",
  recordId?: string,
): Promise<{ fileUrl: string; _id: string }> {
  const res = await apiUpload(file, folder, recordId);
  const upload = res.data;

  if (!upload || typeof upload.fileUrl !== "string" || typeof upload._id !== "string") {
    throw new Error("The server returned an incomplete upload response. Please try again.");
  }

  return { fileUrl: upload.fileUrl, _id: upload._id };
}

export const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const clean = envUrl.replace(/\/+$/, "");
  return clean.endsWith("/api/v1") ? clean : `${clean}/api/v1`;
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return (
    window.localStorage.getItem("customer_access_token") ||
    window.localStorage.getItem("access_token") ||
    window.localStorage.getItem("token") ||
    null
  );
};

export const clearAuthStorage = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("customer_access_token");
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("customer_user");
  document.cookie = "customer_access_token=; path=/; max-age=0; SameSite=Lax";
};

const handleUnauthorized = (status: number, payload: { status?: number }) => {
  if (status !== 401 && payload.status !== 401) return;
  clearAuthStorage();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("customer-auth-expired"));
  }
};

export interface UploadResult {
  _id: string;
  name: string;
  originalName: string;
  filePath: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export async function apiUpload(
  file: File,
  folder: string,
  recordId?: string,
): Promise<{ success?: boolean; status?: number; message?: string; data: UploadResult }> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/upload`;
  const token = getAuthToken();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  if (recordId) {
    formData.append("recordId", recordId);
  }

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  const json = await res.json().catch(() => ({}));
  handleUnauthorized(res.status, json);
  if (!res.ok) {
    const errorMsg =
      (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
      `Upload failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  return json;
}

const inFlightRequests = new Map<string, Promise<unknown>>();

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ success?: boolean; status?: number; message?: string; data: T }> {
  const method = (options.method || "GET").toUpperCase();
  const baseUrl = getBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const cacheKey = `${method}:${url}:${token || ""}`;

  // Deduplicate concurrent GET requests
  // if (method === "GET") {
  //   const existing = inFlightRequests.get(cacheKey);
  //   if (existing) {
  //     return existing as Promise<{ success?: boolean; status?: number; message?: string; data: T }>;
  //   }
  // }

  const fetchPromise = (async () => {
    try {
      console.log("REQUEST:", {
        url,
        method: options?.method || "GET",
        headers,
        body: options?.body,
      });

      const res = await fetch(url, {
        ...options,
        headers,
      });

      const json = await res.json().catch(() => ({}));
      handleUnauthorized(res.status, json);
      if (!res.ok) {
        const errorMsg =
          (Array.isArray(json?.message) ? json.message.join(", ") : json?.message) ||
          `Request failed with status ${res.status}`;
        throw new Error(errorMsg);
      }

      return json;
    } finally {
      if (method === "GET") {
        setTimeout(() => {
          inFlightRequests.delete(cacheKey);
        }, 100);
      }
    }
  })();

  if (method === "GET") {
    inFlightRequests.set(cacheKey, fetchPromise);
  }

  return fetchPromise;
}

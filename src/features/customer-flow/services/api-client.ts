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
    null
  );
};

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
  if (method === "GET") {
    const existing = inFlightRequests.get(cacheKey);
    if (existing) {
      return existing as Promise<{ success?: boolean; status?: number; message?: string; data: T }>;
    }
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url, {
        ...options,
        headers,
      });

      const json = await res.json().catch(() => ({}));
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

import { apiFetch } from "./api-client";

export const digilockerDocumentTypes = ["aadhaar"] as const;

export type DigilockerDocumentType = (typeof digilockerDocumentTypes)[number];

export type StartDigilockerKycPayload = {
  documents: DigilockerDocumentType[];
  panName?: string;
  panNo?: string;
};

export type StartDigilockerKycData = {
  attemptId: string;
  redirectUrl: string;
  status: "PENDING";
};

export type UserDetailsFromDigilocker = {
  firstName?: string;
  lastName?: string;
  aadhaarNumber?: string;
  dob?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  digilockerStatus?: string;
  ageVerified?: boolean;
};

export type CompleteDigilockerKycData = {
  attemptId: string;
  user?: UserDetailsFromDigilocker;
};

export type DigilockerKycStatus = {
  attemptId: string;
  status:
    | "CREATED"
    | "LINK_READY"
    | "CONSENT_PENDING"
    | "PROCESSING"
    | "VERIFIED"
    | "FAILED"
    | "EXPIRED"
    | "CANCELLED";
  documentsVerified: string[];
};

export async function startDigilockerKyc(
  payload: StartDigilockerKycPayload,
): Promise<StartDigilockerKycData> {
  const panName = payload.panName?.trim();
  const panNo = payload.panNo?.trim();
  const response = await apiFetch<StartDigilockerKycData>("/kyc/digilocker/start", {
    method: "POST",
    body: JSON.stringify({
      documents: payload.documents,
      ...(panName ? { panName } : {}),
      ...(panNo ? { panNo } : {}),
    }),
  });

  return response.data;
}

export async function completeDigilockerKyc(
  callbackToken: string,
): Promise<CompleteDigilockerKycData> {
  const response = await apiFetch<CompleteDigilockerKycData>("/kyc/digilocker/complete", {
    method: "POST",
    body: JSON.stringify({ callbackToken }),
  });

  return response.data;
}

export async function getDigilockerKycStatus(attemptId: string): Promise<DigilockerKycStatus> {
  const response = await apiFetch<DigilockerKycStatus>(
    `/kyc/digilocker/status/${encodeURIComponent(attemptId)}`,
  );

  return response.data;
}

export function isKycVerifiedForDocuments(
  attempt: DigilockerKycStatus,
  requestedDocuments: readonly DigilockerDocumentType[],
): boolean {
  return (
    attempt.status === "VERIFIED" &&
    (attempt.documentsVerified.length === 0 ||
      requestedDocuments.every((document) => attempt.documentsVerified.includes(document)))
  );
}

const kycPollDelays = [2000, 5000, 10000] as const;

export function getNextKycPollDelay(pollCount: number): number | null {
  return kycPollDelays[pollCount] ?? null;
}

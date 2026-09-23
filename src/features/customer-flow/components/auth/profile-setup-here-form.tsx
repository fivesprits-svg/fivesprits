"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";
import { useToast } from "@/features/customer-flow/components/ui/toast";
import { FlowNavButtons } from "@/features/customer-flow/components/auth/flow-nav-buttons";

// API configuration from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_ENDPOINT = "/api/v1/users/me";
const API_URL = `${API_BASE_URL}${API_ENDPOINT}`;

export function ProfileSetupHereForm() {
  const router = useRouter();
  const { state, completeProfile } = useCustomerFlow();
  const { success } = useToast();
  const [customerName, setCustomerName] = useState(state.userDetails?.name ?? "");
  const [permitNumber, setPermitNumber] = useState(state.userDetails?.permitNumber ?? "");
  const [address, setAddress] = useState(state.userDetails?.address ?? "");
  const [pincode, setPincode] = useState(state.userDetails?.pincode ?? "");
  const [googleMapsUrl, setGoogleMapsUrl] = useState(state.userDetails?.googleMapsLocation ?? "");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const userDetails = state.userDetails;
  const [errors, setErrors] = useState<{
    customerName?: string;
    permitNumber?: string;
    address?: string;
    pincode?: string;
    googleMapsUrl?: string;
  }>({});

  const validatePincode = (value: string): string | undefined => {
    if (!value.trim()) return "Please enter your pincode";
    if (!/^\d{6}$/.test(value)) return "Enter a valid 6-digit pincode";
    return undefined;
  };

  const validateGoogleMapsUrl = (value: string): string | undefined => {
    if (value.trim() && !/^https:\/\/(www\.)?google\.com\/maps/.test(value)) {
      return "Please enter a valid Google Maps URL";
    }
    return undefined;
  };

  // File handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  // API request
  const submitProfileUpdate = async (data: Record<string, unknown>) => {
    const accessToken = state?.accessToken;
    if (!accessToken) {
      throw new Error("Authentication required. Please log in again.");
    }

    const response = await fetch(API_URL, {
      method: "PATCH",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return response.json();
  };

  // Form submission
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields
    const next: typeof errors = {};
    if (!customerName.trim()) next.customerName = "Please enter your name";
    if (!permitNumber.trim()) next.permitNumber = "Please enter your permit number";
    if (!address.trim()) next.address = "Please enter your address";

    const pincodeError = validatePincode(pincode);
    if (pincodeError) next.pincode = pincodeError;

    const googleMapsError = validateGoogleMapsUrl(googleMapsUrl);
    if (googleMapsError) next.googleMapsUrl = googleMapsError;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Split customerName into firstName and lastName
    const nameParts = customerName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    setLoading(true);
    try {
      // Prepare payload with all required fields
      const payload: Record<string, unknown> = {
        firstName,
        lastName,
        pincode,
        address,
        permitNumber,
      };

      // Include optional fields if present
      if (googleMapsUrl.trim()) {
        payload.googleMapsLocation = googleMapsUrl.trim();
      }

      // Upload file if attached
      if (attachedFile) {
        const formData = new FormData();
        formData.append("permitDocument", attachedFile);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("pincode", pincode);
        formData.append("address", address);
        formData.append("permitNumber", permitNumber);
        if (googleMapsUrl.trim()) {
          formData.append("googleMapsLocation", googleMapsUrl.trim());
        }

        const accessToken = state?.accessToken;
        const formDataResponse = await fetch(API_URL, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        });

        if (!formDataResponse.ok) {
          throw new Error(`API error: ${formDataResponse.status}`);
        }

        await formDataResponse.json();
      } else {
        await submitProfileUpdate(payload);
      }

      // Success: complete profile and navigate
      completeProfile();
      success("Registration completed successfully! Welcome to The Five Spirits.");
      router.push("/categories");
    } catch (error) {
      console.error("Failed to save profile:", error);
      setErrors((prev) => ({
        ...prev,
        customerName:
          error instanceof Error ? error.message : "Failed to save profile. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    submitHandler(event);
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-6 md:space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        <div className="space-y-4">
          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Customer Name <span className="text-red-500">*</span>
            </span>

            <div className="relative">
              <input
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value);

                  if (errors.customerName) {
                    setErrors((prev) => ({
                      ...prev,
                      customerName: undefined,
                    }));
                  }
                }}
                placeholder="Enter your name"
                aria-invalid={Boolean(errors.customerName)}
                className="customer-input bg-gray-50/80 pr-10 text-sm font-medium text-gray-700"
              />
            </div>

            {errors.customerName && (
              <span role="alert" className="mt-1 block text-xs font-medium text-red-500">
                {errors.customerName}
              </span>
            )}
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Mobile Number
            </span>

            <div className="relative">
              <input
                value={formatDisplayMobile(userDetails?.mobile)}
                readOnly
                className="customer-input cursor-not-allowed bg-gray-50/80 pr-10 text-sm font-medium text-gray-700"
              />

              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Verified"
                width={20}
                height={20}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 opacity-80"
              />
            </div>
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold text-[#a67854]">
              Permit Number <span className="text-red-500">*</span>
            </span>

            <input
              value={permitNumber}
              onChange={(event) => {
                setPermitNumber(event.target.value);

                if (errors.permitNumber) {
                  setErrors((prev) => ({
                    ...prev,
                    permitNumber: undefined,
                  }));
                }
              }}
              placeholder="e.g. LNC-2026-908B"
              aria-invalid={Boolean(errors.permitNumber)}
              className="customer-input text-sm"
            />

            {errors.permitNumber && (
              <span role="alert" className="mt-1 block text-xs font-medium text-red-500">
                {errors.permitNumber}
              </span>
            )}
          </label>

          <div>
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Permit Document (Optional)
            </span>

            <label className="group relative flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50/50 px-4 py-2.5 transition hover:border-[#a67854] hover:bg-white">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-[#f7f4ee] group-hover:text-[#a67854]">
                  <Image
                    src="/customer-flow/icons/lock.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="opacity-60"
                  />
                </div>

                <span className="truncate text-xs font-medium text-gray-600">
                  {attachedFile?.name || "Upload license or permit copy (PDF, JPG)"}
                </span>
              </div>

              <span className="shrink-0 text-xs font-semibold text-[#a67854]">
                {attachedFile ? "Replace" : "Browse"}
              </span>

              <input
                type="file"
                accept=".pdf,image/png,image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Address <span className="text-red-500">*</span>
            </span>

            <input
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);

                if (errors.address) {
                  setErrors((prev) => ({
                    ...prev,
                    address: undefined,
                  }));
                }
              }}
              placeholder="e.g. 456 Indiranagar, 80 Feet Road"
              aria-invalid={Boolean(errors.address)}
              className="customer-input text-sm"
            />

            {errors.address && (
              <span role="alert" className="mt-1 block text-xs font-medium text-red-500">
                {errors.address}
              </span>
            )}
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Pincode <span className="text-red-500">*</span>
            </span>

            <input
              value={pincode}
              onChange={(event) => {
                setPincode(event.target.value.replace(/\D/g, "").slice(0, 6));

                if (errors.pincode) {
                  setErrors((prev) => ({
                    ...prev,
                    pincode: undefined,
                  }));
                }
              }}
              inputMode="numeric"
              placeholder="e.g. 560038"
              aria-invalid={Boolean(errors.pincode)}
              className="customer-input text-sm"
            />

            {errors.pincode && (
              <span role="alert" className="mt-1 block text-xs font-medium text-red-500">
                {errors.pincode}
              </span>
            )}
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Google Maps URL (Optional)
            </span>

            <input
              value={googleMapsUrl}
              onChange={(event) => {
                setGoogleMapsUrl(event.target.value);
                if (errors.googleMapsUrl) {
                  setErrors((prev) => ({ ...prev, googleMapsUrl: undefined }));
                }
              }}
              placeholder="e.g. https://maps.app.goo.gl/xyz123"
              aria-invalid={Boolean(errors.googleMapsUrl)}
              className="customer-input text-sm"
            />

            {errors.googleMapsUrl && (
              <span role="alert" className="mt-1 block text-xs font-medium text-red-500">
                {errors.googleMapsUrl}
              </span>
            )}
          </label>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <FlowNavButtons
          backHref="/age-verification"
          submitLabel="Save & Continue"
          loading={loading}
          loadingLabel="Saving..."
        />
      </div>
    </form>
  );
}

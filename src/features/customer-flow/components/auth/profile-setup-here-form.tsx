"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function ProfileSetupHereForm() {
  const router = useRouter();
  const { state, completeProfile } = useCustomerFlow();
  const [permitNumber, setPermitNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    permitNumber?: string;
    address?: string;
    pincode?: string;
  }>({});

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next: { permitNumber?: string; address?: string; pincode?: string } = {};
    if (!permitNumber.trim()) next.permitNumber = "Please enter your permit number";
    if (!address.trim()) next.address = "Please enter your address";
    if (!pincode.trim()) next.pincode = "Please enter your pincode";
    else if (!/^\d{6}$/.test(pincode)) next.pincode = "Enter a valid 6-digit pincode";
    setErrors(next);
    if (!next.permitNumber && !next.address && !next.pincode) {
      setLoading(true);
      completeProfile();
      router.push("/categories");
    }
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-6 md:space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
        {/* Left Column: Account & Verification Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <span className="size-2 rounded-full bg-[#a67854]" />
            <h3 className="font-outfit text-xs font-bold tracking-wider text-gray-800 uppercase">
              Identity & Permit Information
            </h3>
          </div>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Customer Name
            </span>
            <div className="relative">
              <input
                defaultValue={state.session?.name || "Rajesh S. Kumar"}
                readOnly
                className="customer-input cursor-not-allowed bg-gray-50/80 pr-10 text-sm font-medium text-gray-700"
              />
              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Verified"
                width={16}
                height={16}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 opacity-40"
              />
            </div>
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Mobile Number
            </span>
            <div className="relative">
              <input
                defaultValue={
                  state.session?.mobile ? `+91 ${state.session.mobile}` : "+91 98450 12345"
                }
                readOnly
                className="customer-input cursor-not-allowed bg-gray-50/80 pr-10 text-sm font-medium text-gray-700"
              />
              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Verified"
                width={16}
                height={16}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 opacity-40"
              />
            </div>
          </label>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold text-[#a67854]">
              Permit Number <span className="text-red-500">*</span>
            </span>
            <input
              value={permitNumber}
              onChange={(event) => setPermitNumber(event.target.value)}
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
                  {attachedFile ? attachedFile : "Upload license or permit copy (PDF, JPG)"}
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

        {/* Right Column: Delivery & Location Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <span className="size-2 rounded-full bg-[#a67854]" />
            <h3 className="font-outfit text-xs font-bold tracking-wider text-gray-800 uppercase">
              Delivery & Location Details
            </h3>
          </div>

          <label className="block">
            <span className="customer-input-label mb-1.5 block text-xs font-semibold">
              Delivery Address <span className="text-red-500">*</span>
            </span>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
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
              onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))}
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
              onChange={(event) => setGoogleMapsUrl(event.target.value)}
              placeholder="e.g. https://maps.app.goo.gl/vandalbar"
              className="customer-input text-sm"
            />
          </label>

          <div className="rounded-xl border border-gray-200/80 bg-[#faf8f5] p-3 text-[11px] leading-relaxed text-gray-500">
            <p className="font-medium text-gray-700">🔒 Fast-Track Delivery Verification</p>
            <p className="mt-0.5">
              Your permit and address details are securely stored to ensure seamless requirement
              processing and government compliance.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-gray-100 pt-5 sm:flex-row">
        <p className="font-geist text-xs text-gray-400">
          All personal information is protected under standard encryption.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="customer-continue-button w-full sm:w-auto sm:min-w-[220px]"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </form>
  );
}

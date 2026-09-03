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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    permitNumber?: string;
    address?: string;
    pincode?: string;
  }>({});

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
    <form onSubmit={submit} className="mt-8 space-y-[15px] md:mt-10 md:space-y-5" noValidate>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Customer Name</span>
        <div className="relative">
          <input
            defaultValue={state.session?.name || "Rajesh S. Kumar"}
            readOnly
            className="customer-input cursor-not-allowed bg-gray-50 pr-10"
          />
          <Image
            src="/customer-flow/icons/lock.svg"
            alt=""
            width={16}
            height={16}
            className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50"
          />
        </div>
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Mobile Number</span>
        <div className="relative">
          <input
            defaultValue={state.session?.mobile ? `+91 ${state.session.mobile}` : ""}
            readOnly
            className="customer-input cursor-not-allowed bg-gray-50 pr-10"
          />
          <Image
            src="/customer-flow/icons/lock.svg"
            alt=""
            width={16}
            height={16}
            className="absolute top-1/2 right-3 -translate-y-1/2 opacity-50"
          />
        </div>
      </label>
      <label className="block">
        <span className="text-brand-primary customer-input-label mb-2.5 block md:text-sm">
          Permit Number
        </span>
        <input
          value={permitNumber}
          onChange={(event) => setPermitNumber(event.target.value)}
          placeholder="LNC-2026-908B"
          aria-invalid={Boolean(errors.permitNumber)}
          className="customer-input"
        />
        {errors.permitNumber && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.permitNumber}
          </span>
        )}
      </label>
      <button
        type="button"
        className="border-common-border font-outfit text-common-gray hover:border-common-gray w-full rounded-2xl border-2 border-dashed py-3 text-sm font-semibold transition md:py-4 md:text-base"
      >
        Attach Document
      </button>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Address <span className="text-common-error">*</span>
        </span>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          placeholder="456 Indiranagar, 80 Feet Road"
          aria-invalid={Boolean(errors.address)}
          className="customer-input"
        />
        {errors.address && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.address}
          </span>
        )}
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">
          Pincode <span className="text-common-error">*</span>
        </span>
        <input
          value={pincode}
          onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))}
          inputMode="numeric"
          placeholder="560038"
          aria-invalid={Boolean(errors.pincode)}
          className="customer-input"
        />
        {errors.pincode && (
          <span
            role="alert"
            className="text-common-error mt-1.5 block text-xs font-medium md:text-sm"
          >
            {errors.pincode}
          </span>
        )}
      </label>
      <label className="block">
        <span className="customer-input-label mb-2.5 block md:text-sm">Google Maps URL</span>
        <input
          value={googleMapsUrl}
          onChange={(event) => setGoogleMapsUrl(event.target.value)}
          placeholder="https://maps.app.goo.gl/vandalbar"
          className="customer-input"
        />
      </label>
      <button type="submit" disabled={loading} className="customer-continue-button mt-4 md:mt-6">
        {loading ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
}

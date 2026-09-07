"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function DesktopProfileSection() {
  const router = useRouter();
  const { state, logout } = useCustomerFlow();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showPermitModal, setShowPermitModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const permitInputRef = useRef<HTMLInputElement>(null);

  const [permitDocument, setPermitDocument] = useState<{
    name: string;
    url?: string;
    type?: "pdf" | "image" | "doc";
    uploaded: boolean;
  } | null>({
    name: "Excise_Permit_2026.pdf",
    type: "pdf",
    uploaded: true,
  });

  const [profileData, setProfileData] = useState({
    name: state.session?.name || "Rajesh Kumar",
    mobile: formatDisplayMobile(state.session?.mobile),
    permitNumber: "PRM-2024-00587",
    address: "42, MG Road, Sector 15, Gurugram, Haryana",
    pincode: "122001",
    mapsLocation: "https://maps.google.com/?q=Gurugram",
  });

  function handleEditField(field: string, currentValue: string) {
    setEditingField(field);
    setEditValue(currentValue);
  }

  function handleSaveField() {
    if (editingField) {
      setProfileData((prev) => ({
        ...prev,
        [editingField]: editValue,
      }));
    }
    setEditingField(null);
    setEditValue("");
  }

  return (
    <div className="hidden md:block">
      <PortalShell title="My Profile" eyebrow="Account Settings">
        <div className="mx-auto max-w-7xl">
          {/* Header Title & Subtitle */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-unbounded text-2xl font-black text-gray-900">
                Account & Profile
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500">
                Manage your personal credentials and delivery address.
              </p>
            </div>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-12 items-start gap-6">
            {/* Left Column: User Summary & Navigation */}
            <div className="col-span-4 rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative size-24">
                  {profilePhoto ? (
                    <div className="relative size-24 overflow-hidden rounded-full border-4 border-[#e8d5c4] shadow-sm">
                      <Image
                        src={profilePhoto}
                        alt={profileData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="grid size-24 place-items-center rounded-full border-4 border-[#e8d5c4] bg-[#ece7e1] text-3xl font-black text-gray-800 shadow-sm">
                      {profileData.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="absolute right-0 bottom-0 grid size-7 place-items-center rounded-full border-2 border-white bg-[#a67854] text-white shadow-md transition hover:bg-[#8f6442]"
                    title={profilePhoto ? "Change Photo" : "Upload Photo"}
                  >
                    <Image
                      src="/customer-flow/icons/icon-camera.svg"
                      alt=""
                      width={12}
                      height={12}
                    />
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const url = URL.createObjectURL(e.target.files[0]);
                        setProfilePhoto(url);
                      }
                    }}
                  />
                </div>

                {/* Profile Photo Controls */}
                <div className="mt-2.5 flex items-center gap-2 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowImagePopup(true)}
                    className="text-[#a67854] hover:underline"
                  >
                    View
                  </button>
                  <span className="text-gray-300">•</span>
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="text-gray-700 hover:text-[#a67854] hover:underline"
                  >
                    {profilePhoto ? "Change" : "Upload"}
                  </button>
                  {profilePhoto && (
                    <>
                      <span className="text-gray-300">•</span>
                      <button
                        type="button"
                        onClick={() => {
                          setProfilePhoto(null);
                          if (imageInputRef.current) imageInputRef.current.value = "";
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>

                <h2 className="font-unbounded mt-3.5 text-base font-bold text-gray-900">
                  {profileData.name}
                </h2>
                <p className="font-geist text-xs font-medium text-gray-500">{profileData.mobile}</p>

                <div className="mt-4 w-full divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50/70 p-3 text-xs">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-gray-500">DigiLocker Status</span>
                    <span className="font-semibold text-emerald-700">Verified</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-gray-500">Permit Status</span>
                    <span className="font-semibold text-[#a67854]">Authorized</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLogoutPopup(true)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 text-xs font-bold text-red-600 transition hover:bg-red-50"
                >
                  <Image src="/customer-flow/icons/log-out.svg" alt="" width={15} height={15} />
                  Sign Out Account
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Sections Grid */}
            <div className="col-span-8 space-y-5">
              {/* Section 1: Identity & Permit Information */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#a67854]" />
                    <h3 className="font-outfit text-xs font-bold tracking-wider text-gray-800 uppercase">
                      Identity & Permit Credentials
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                      Customer Name
                    </span>
                    <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 text-xs font-medium text-gray-700">
                      <span className="truncate">{profileData.name}</span>
                      <Image
                        src="/customer-flow/icons/lock.svg"
                        alt="Verified"
                        width={14}
                        height={14}
                        className="opacity-40"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="mb-1.5 block text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                      Mobile Number
                    </span>
                    <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-gray-50/70 px-3.5 text-xs font-medium text-gray-700">
                      <span className="truncate">{profileData.mobile}</span>
                      <Image
                        src="/customer-flow/icons/lock.svg"
                        alt="Verified"
                        width={14}
                        height={14}
                        className="opacity-40"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        Permit Number
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditField("permitNumber", profileData.permitNumber)}
                        className="text-[11px] font-bold text-[#a67854] uppercase hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-900">
                      <span className="truncate">{profileData.permitNumber}</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        Permit Document
                      </span>
                    </div>
                    {permitDocument?.uploaded ? (
                      <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-[#fbf9f6] px-3.5 text-xs">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Image
                            src="/customer-flow/icons/lock.svg"
                            alt=""
                            width={13}
                            height={13}
                            className="opacity-60"
                          />
                          <span className="truncate font-medium text-gray-800">
                            {permitDocument.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowPermitModal(true)}
                            className="text-[11px] font-bold text-[#a67854] hover:underline"
                          >
                            View
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            type="button"
                            onClick={() => {
                              setPermitDocument(null);
                              if (permitInputRef.current) permitInputRef.current.value = "";
                            }}
                            aria-label="Remove permit document"
                            className="grid size-6 place-items-center rounded-md bg-red-50 text-red-500 transition hover:bg-red-100"
                            title="Remove"
                          >
                            <Image
                              src="/customer-flow/icons/delete-btn.svg"
                              alt="Delete"
                              width={14}
                              height={14}
                              className="size-3.5 opacity-80 hover:opacity-100"
                            />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => permitInputRef.current?.click()}
                        className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 text-xs font-semibold text-[#a67854] transition hover:border-[#a67854] hover:bg-white"
                      >
                        <Image
                          src="/customer-flow/icons/icon-camera.svg"
                          alt=""
                          width={14}
                          height={14}
                          className="opacity-60"
                        />
                        <span>Upload Permit Copy</span>
                      </button>
                    )}
                    <input
                      ref={permitInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.webp"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const url = URL.createObjectURL(file);
                          const isImage =
                            file.type.startsWith("image/") ||
                            /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name);
                          const isPdf =
                            file.type === "application/pdf" || /\.pdf$/i.test(file.name);
                          setPermitDocument({
                            name: file.name,
                            url,
                            type: isImage ? "image" : isPdf ? "pdf" : "doc",
                            uploaded: true,
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery & Shipping Address */}
              <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#a67854]" />
                    <h3 className="font-outfit text-xs font-bold tracking-wider text-gray-800 uppercase">
                      Delivery & Location Details
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        Delivery Address
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditField("address", profileData.address)}
                        className="text-[11px] font-bold text-[#a67854] uppercase hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-800">
                      <span className="truncate">{profileData.address}</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        Pincode
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditField("pincode", profileData.pincode)}
                        className="text-[11px] font-bold text-[#a67854] uppercase hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-800">
                      <span className="truncate">{profileData.pincode}</span>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        Google Maps Location
                      </span>
                      <button
                        type="button"
                        onClick={() => handleEditField("mapsLocation", profileData.mapsLocation)}
                        className="text-[11px] font-bold text-[#a67854] uppercase hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex h-11 items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 text-xs font-medium text-gray-800">
                      <span className="truncate">{profileData.mapsLocation}</span>
                      <a
                        href={profileData.mapsLocation}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-[11px] font-semibold text-[#a67854] hover:underline"
                      >
                        Open Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalShell>

      {/* Logout Confirmation Modal */}
      {showLogoutPopup && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card">
            <h2 className="profile-popup-title">Logout Confirmation</h2>
            <p className="profile-popup-subtitle mt-3">Are you sure you want to sign out?</p>
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="profile-popup-save-btn"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setShowLogoutPopup(false)}
                className="profile-popup-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {showImagePopup && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card max-w-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-unbounded text-base font-bold text-gray-900">Profile Photo</h2>
              <button
                type="button"
                onClick={() => setShowImagePopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-[#ece7e1]">
              {profilePhoto ? (
                <div className="relative size-full">
                  <Image src={profilePhoto} alt={profileData.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="grid size-full place-items-center text-5xl font-black text-[#755337]">
                  {profileData.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowImagePopup(false);
                  imageInputRef.current?.click();
                }}
                className="profile-popup-save-btn flex-1 text-xs"
              >
                {profilePhoto ? "Upload New Photo" : "Upload Photo"}
              </button>
              {profilePhoto && (
                <button
                  type="button"
                  onClick={() => {
                    setProfilePhoto(null);
                    if (imageInputRef.current) imageInputRef.current.value = "";
                    setShowImagePopup(false);
                  }}
                  className="rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowImagePopup(false)}
                className="profile-popup-cancel-btn text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permit Document Preview Modal */}
      {showPermitModal && permitDocument && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card max-w-lg !p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <h2 className="font-unbounded text-sm font-bold text-gray-900">
                  Excise Permit Document
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="grid size-8 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Document Content */}
            {permitDocument.type === "image" && permitDocument.url ? (
              /* 1. Image Preview Mode */
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#E8DFC8] bg-gray-50 p-2.5 shadow-inner">
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-black/5">
                  <Image
                    src={permitDocument.url}
                    alt={permitDocument.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2 text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-outfit text-[10px] font-bold text-gray-500 uppercase">
                      Permit File:
                    </span>
                    <span className="font-geist max-w-[200px] truncate font-semibold text-gray-900">
                      {permitDocument.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </div>
              </div>
            ) : permitDocument.type === "pdf" && permitDocument.url ? (
              /* 2. Uploaded PDF Viewer Mode */
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-[#E8DFC8] bg-gray-100 shadow-inner">
                <iframe
                  src={`${permitDocument.url}#toolbar=0`}
                  title={permitDocument.name}
                  className="h-[340px] w-full rounded-2xl border-0"
                />
                <div className="flex items-center justify-between border-t border-gray-200 bg-white p-3 text-xs">
                  <span className="font-geist truncate font-bold text-gray-900">
                    {permitDocument.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Verified PDF
                  </span>
                </div>
              </div>
            ) : (
              /* 3. Official State Excise Certificate Document Mode (Default) */
              <div className="relative mt-4 overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FDFCF7] via-[#FAF6EE] to-[#F5EFE3] p-5 shadow-inner">
                {/* Security Watermark in background */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] select-none">
                  <span className="font-outfit rotate-[-25deg] text-6xl font-black tracking-widest text-gray-900 uppercase">
                    STATE EXCISE
                  </span>
                </div>

                {/* Document Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#D4AF37]/35 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5E34] to-[#5C3A1E] text-white shadow-sm ring-2 ring-[#D4AF37]/40">
                      <svg
                        className="size-6 text-[#FFD700]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-outfit text-[10px] font-black tracking-widest text-[#8B5E34] uppercase">
                        State Excise Department
                      </p>
                      <h3 className="font-outfit text-sm font-black text-gray-950">
                        Official State Excise Copy
                      </h3>
                      <p className="font-geist text-[10px] text-gray-500">{permitDocument.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                      <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Verified
                    </span>
                    <span className="font-geist text-[9px] font-semibold text-gray-400">
                      FORM L-50 PERMIT
                    </span>
                  </div>
                </div>

                {/* Document Credentials Grid */}
                <div className="relative z-10 mt-4 grid grid-cols-2 gap-3.5 rounded-xl border border-[#E8DFC8] bg-white/85 p-4 shadow-2xs backdrop-blur-xs">
                  <div>
                    <span className="font-outfit block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Permit Number:
                    </span>
                    <span className="font-geist text-sm font-extrabold tracking-wide text-gray-950">
                      {profileData.permitNumber}
                    </span>
                  </div>

                  <div>
                    <span className="font-outfit block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Holder Name:
                    </span>
                    <span className="font-geist block truncate text-sm font-bold text-gray-900">
                      {profileData.name}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-2.5">
                    <span className="font-outfit block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Authorized Area:
                    </span>
                    <span className="font-geist text-sm font-semibold text-gray-900">
                      {profileData.pincode}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-2.5">
                    <span className="font-outfit block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Status:
                    </span>
                    <span className="font-geist text-xs font-bold text-[#8B5E34]">
                      Possession Authorized
                    </span>
                  </div>
                </div>

                {/* Document Footer */}
                <div className="relative z-10 mt-3.5 flex items-center justify-between border-t border-[#D4AF37]/25 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="grid size-6 place-items-center rounded-md border border-[#C5A059] bg-[#FAF6EE] text-[8px] font-black text-[#8B5E34]">
                      SEAL
                    </div>
                    <div>
                      <p className="font-geist text-[10px] font-bold text-gray-800">
                        Digitally Certified
                      </p>
                      <p className="font-geist text-[9px] text-gray-400">
                        Excise Verification Registry
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-500">
                    <svg
                      className="size-4 text-emerald-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-geist text-[10px] font-bold text-gray-600">
                      Tamper-Proof
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons: Upload Again | Trash Icon | Close */}
            <div className="mt-5 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowPermitModal(false);
                  permitInputRef.current?.click();
                }}
                className="font-outfit flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 text-xs font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                <Image
                  src="/customer-flow/icons/icon-camera.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="brightness-0 invert"
                />
                Upload Again
              </button>

              {/* Trash Icon Button */}
              <button
                type="button"
                onClick={() => {
                  setPermitDocument(null);
                  if (permitInputRef.current) permitInputRef.current.value = "";
                  setShowPermitModal(false);
                }}
                aria-label="Remove permit document"
                className="grid size-11 shrink-0 place-items-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 active:scale-95"
                title="Remove Document"
              >
                <Image
                  src="/customer-flow/icons/delete-btn.svg"
                  alt="Delete"
                  width={18}
                  height={18}
                  className="size-4.5 opacity-85 hover:opacity-100"
                />
              </button>

              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="font-outfit flex h-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-5 text-xs font-bold text-gray-700 transition hover:bg-gray-100 active:scale-[0.99]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Field Edit Modal */}
      {editingField && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card">
            <span className="profile-popup-subtitle block font-semibold text-gray-800">
              {editingField === "permitNumber" && "Edit Permit Number"}
              {editingField === "address" && "Edit Delivery Address"}
              {editingField === "pincode" && "Edit Pincode"}
              {editingField === "mapsLocation" && "Edit Google Maps Location"}
            </span>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="profile-popup-input mt-4"
              autoFocus
            />
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={handleSaveField} className="profile-popup-save-btn">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingField(null)}
                className="profile-popup-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

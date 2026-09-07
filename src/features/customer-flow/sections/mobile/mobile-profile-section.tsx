"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MobileBottomNav } from "@/features/customer-flow/components/navigation/mobile-bottom-nav";
import { MobileHeader } from "@/features/customer-flow/components/navigation/mobile-header";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

export function MobileProfileSection() {
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

  const profileData = {
    name: state.session?.name || "Rajesh Kumar",
    mobile: formatDisplayMobile(state.session?.mobile),
    permitNumber: "PRM-2024-00587",
    address: "42, MG Road, Sector 15, Gurugram, Haryana",
    pincode: "122001",
    mapsLocation: "maps.google.com/rajesh-store",
  };

  function handleEditField(field: string, currentValue: string) {
    setEditingField(field);
    setEditValue(currentValue);
  }

  function handleSaveField() {
    setEditingField(null);
    setEditValue("");
  }

  return (
    <div className="min-h-dvh bg-white pb-28 md:hidden">
      <MobileHeader title="My Profile" backHref="/categories" />
      <main className="mx-auto w-full max-w-[390px] px-6 pt-6">
        <div className="text-center">
          <div className="relative mx-auto size-24">
            {profilePhoto ? (
              <div className="relative size-24 overflow-hidden rounded-full border-4 border-[#e8d5c4]">
                <Image src={profilePhoto} alt={profileData.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="grid size-24 place-items-center rounded-full border-4 border-[#e8d5c4] bg-[#ece7e1] text-3xl font-black text-gray-800">
                {profileData.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="absolute right-0 bottom-0 grid size-8 place-items-center rounded-full border-2 border-white bg-[#a67854] text-white shadow-md"
              title={profilePhoto ? "Change Photo" : "Upload Photo"}
            >
              <Image src="/customer-flow/icons/icon-camera.svg" alt="" width={14} height={14} />
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

          {/* Photo Actions */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
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

          <h1 className="font-unbounded mt-2 text-xl font-bold">{profileData.name}</h1>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <span className="profile-field-label mb-2 block">Customer Name</span>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.name}</span>
              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Locked"
                width={18}
                height={18}
                className="opacity-40"
              />
            </div>
          </div>

          <div>
            <span className="profile-field-label mb-2 block">Mobile Number</span>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.mobile}</span>
              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Locked"
                width={18}
                height={18}
                className="opacity-40"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="profile-field-label">Permit Number</span>
              <button
                type="button"
                onClick={() => handleEditField("permitNumber", profileData.permitNumber)}
                className="profile-edit-btn"
              >
                Edit
              </button>
            </div>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.permitNumber}</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="profile-field-label">Permit Document</span>
            </div>
            {permitDocument?.uploaded ? (
              <div className="profile-doc-chip flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Image
                    src="/customer-flow/icons/lock.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="text-[#a67854]"
                  />
                  <span className="truncate text-xs font-medium text-gray-800">
                    {permitDocument.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setShowPermitModal(true)}
                    className="text-[#a67854] hover:underline"
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
                className="profile-upload-btn flex items-center justify-center gap-2"
              >
                <span>Upload Permit Copy</span>
                <Image
                  src="/customer-flow/icons/icon-camera.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="opacity-70"
                />
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
                  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
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

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="profile-field-label">Delivery Address</span>
              <button
                type="button"
                onClick={() => handleEditField("address", profileData.address)}
                className="profile-edit-btn"
              >
                Edit
              </button>
            </div>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.address}</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="profile-field-label">Pincode</span>
              <button
                type="button"
                onClick={() => handleEditField("pincode", profileData.pincode)}
                className="profile-edit-btn"
              >
                Edit
              </button>
            </div>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.pincode}</span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="profile-field-label">Google Maps Location</span>
              <button
                type="button"
                onClick={() => handleEditField("mapsLocation", profileData.mapsLocation)}
                className="profile-edit-btn"
              >
                Edit
              </button>
            </div>
            <div className="profile-field-value">
              <span className="flex-1 truncate">{profileData.mapsLocation}</span>
              <Image
                src="/customer-flow/icons/lock.svg"
                alt="Copy"
                width={18}
                height={18}
                className="opacity-40"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowLogoutPopup(true)}
          className="customer-logout-button mt-8"
        >
          <Image src="/customer-flow/icons/log-out.svg" alt="" width={18} height={18} />
          Logout
        </button>
      </main>

      <MobileBottomNav active="Profile" />

      {/* Logout Confirmation */}
      {showLogoutPopup && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card">
            <h2 className="profile-popup-title">Logout Confirmation</h2>
            <p className="profile-popup-subtitle mt-3">Are your sure you want to do logout?</p>
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
          <div className="profile-popup-card">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="font-unbounded text-sm font-bold text-gray-900">Profile Photo</h2>
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
                <div className="grid size-full place-items-center text-4xl font-black text-[#755337]">
                  {profileData.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowImagePopup(false);
                  imageInputRef.current?.click();
                }}
                className="profile-popup-save-btn text-xs"
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
                  className="rounded-full border border-red-200 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  Remove Photo
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
          <div className="profile-popup-card max-w-[360px] !p-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <h2 className="font-unbounded text-xs font-bold text-gray-900">Permit Document</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="grid size-7 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Dynamic Document Content */}
            {permitDocument.type === "image" && permitDocument.url ? (
              /* 1. Image Preview Mode */
              <div className="relative mt-3.5 overflow-hidden rounded-2xl border border-[#E8DFC8] bg-gray-50 p-2 shadow-inner">
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-black/5">
                  <Image
                    src={permitDocument.url}
                    alt={permitDocument.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between px-1.5 text-[11px]">
                  <span className="font-geist max-w-[190px] truncate font-semibold text-gray-900">
                    {permitDocument.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </div>
              </div>
            ) : permitDocument.type === "pdf" && permitDocument.url ? (
              /* 2. Uploaded PDF Viewer Mode */
              <div className="relative mt-3.5 overflow-hidden rounded-2xl border border-[#E8DFC8] bg-gray-100 shadow-inner">
                <iframe
                  src={`${permitDocument.url}#toolbar=0`}
                  title={permitDocument.name}
                  className="h-[280px] w-full rounded-2xl border-0"
                />
                <div className="flex items-center justify-between border-t border-gray-200 bg-white p-2.5 text-[11px]">
                  <span className="font-geist max-w-[190px] truncate font-bold text-gray-900">
                    {permitDocument.name}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Verified PDF
                  </span>
                </div>
              </div>
            ) : (
              /* 3. Official State Excise Certificate Document Mode (Default) */
              <div className="relative mt-3.5 overflow-hidden rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FDFCF7] via-[#FAF6EE] to-[#F5EFE3] p-4 shadow-inner">
                {/* Security Watermark */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035] select-none">
                  <span className="font-outfit rotate-[-25deg] text-5xl font-black tracking-widest text-gray-900 uppercase">
                    EXCISE
                  </span>
                </div>

                {/* Document Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#D4AF37]/35 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5E34] to-[#5C3A1E] text-white shadow-sm ring-1 ring-[#D4AF37]/40">
                      <svg
                        className="size-5 text-[#FFD700]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-outfit text-[9px] font-black tracking-widest text-[#8B5E34] uppercase">
                        State Excise Dept
                      </p>
                      <h3 className="font-outfit text-xs font-black text-gray-950">
                        Official State Excise Copy
                      </h3>
                      <p className="font-geist text-[9px] text-gray-500">{permitDocument.name}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-600/20">
                    <span className="size-1 animate-pulse rounded-full bg-emerald-500" />
                    Verified
                  </span>
                </div>

                {/* Document Credentials */}
                <div className="relative z-10 mt-3 space-y-2 rounded-xl border border-[#E8DFC8] bg-white/85 p-3 shadow-2xs backdrop-blur-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-outfit text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Permit Number:
                    </span>
                    <span className="font-geist font-extrabold text-gray-950">
                      {profileData.permitNumber}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-outfit text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Holder Name:
                    </span>
                    <span className="font-geist font-bold text-gray-900">{profileData.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-outfit text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      Authorized Area:
                    </span>
                    <span className="font-geist font-semibold text-gray-900">
                      {profileData.pincode}
                    </span>
                  </div>
                </div>

                {/* Document Footer */}
                <div className="relative z-10 mt-2.5 flex items-center justify-between border-t border-[#D4AF37]/20 pt-2 text-[9px]">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-[#FAF6EE] px-1.5 py-0.5 font-bold text-[#8B5E34] ring-1 ring-[#C5A059]/40">
                      SEAL
                    </span>
                    <span className="font-geist font-medium text-gray-600">
                      Digitally Certified
                    </span>
                  </div>
                  <span className="font-geist font-bold text-emerald-600">✓ Tamper-Proof</span>
                </div>
              </div>
            )}

            {/* Action Buttons: Upload Again | Trash Icon | Close */}
            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowPermitModal(false);
                  permitInputRef.current?.click();
                }}
                className="font-outfit flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-black px-3 text-xs font-bold tracking-wide text-white transition hover:bg-gray-800 active:scale-[0.99]"
              >
                <Image
                  src="/customer-flow/icons/icon-camera.svg"
                  alt=""
                  width={13}
                  height={13}
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
                  width={17}
                  height={17}
                  className="size-4 opacity-85 hover:opacity-100"
                />
              </button>

              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="font-outfit flex h-11 items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-4 text-xs font-bold text-gray-700 transition hover:bg-gray-100 active:scale-[0.99]"
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
            <span className="profile-popup-subtitle block">
              {editingField === "permitNumber" && "Permit Number"}
              {editingField === "address" && "Delivery Address"}
              {editingField === "pincode" && "Pincode"}
              {editingField === "mapsLocation" && "Google Maps Location"}
            </span>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="profile-popup-input mt-4"
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

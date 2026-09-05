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
    uploaded: boolean;
  } | null>({
    name: "Excise_Permit_2026.pdf",
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
                    className="text-red-500 hover:underline"
                  >
                    Remove
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
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPermitDocument({
                    name: e.target.files[0].name,
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
          <div className="profile-popup-card">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#a67854]" />
                <h2 className="font-unbounded text-xs font-bold text-gray-900">Permit Document</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#e8d5c4] bg-[#fbf9f6] p-3.5">
              <div className="flex items-center gap-2.5 border-b border-[#e8d5c4]/60 pb-2.5">
                <div className="grid size-9 place-items-center rounded-lg bg-[#a67854] text-white">
                  <span className="font-outfit text-[11px] font-bold">PDF</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-gray-900">{permitDocument.name}</p>
                  <p className="text-[10px] text-gray-500">Excise Document</p>
                </div>
              </div>

              <div className="mt-2.5 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-gray-600">
                  <span>Permit No:</span>
                  <span className="font-semibold text-gray-900">{profileData.permitNumber}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Holder:</span>
                  <span className="font-semibold text-gray-900">{profileData.name}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowPermitModal(false);
                  permitInputRef.current?.click();
                }}
                className="profile-popup-save-btn text-xs"
              >
                Upload Again
              </button>
              <button
                type="button"
                onClick={() => {
                  setPermitDocument(null);
                  if (permitInputRef.current) permitInputRef.current.value = "";
                  setShowPermitModal(false);
                }}
                className="rounded-full border border-red-200 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50"
              >
                Remove Document
              </button>
              <button
                type="button"
                onClick={() => setShowPermitModal(false)}
                className="profile-popup-cancel-btn text-xs"
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

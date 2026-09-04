"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";

export function DesktopProfileSection() {
  const router = useRouter();
  const { state, logout } = useCustomerFlow();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [permitDocument, setPermitDocument] = useState<{
    name: string;
    uploaded: boolean;
  } | null>(null);

  const profileData = {
    name: state.session?.name || "Rajesh Kumar",
    mobile: state.session?.mobile || "9876543210",
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
    <div className="hidden lg:block">
      <PortalShell title="Profile" eyebrow="Account">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-black/10 bg-white p-10 shadow-[0_15px_50px_rgba(25,20,15,0.06)]">
          <div className="flex items-center gap-5 border-b border-black/10 pb-8">
            <div className="relative size-20">
              <div className="grid size-20 place-items-center rounded-full border-4 border-[#e8d5c4] bg-[#ece7e1] text-3xl font-black">
                {profileData.name.slice(0, 1).toUpperCase()}
              </div>
              <button
                type="button"
                onClick={() => setShowImagePopup(true)}
                className="absolute right-0 bottom-0 grid size-7 place-items-center rounded-full border-2 border-white bg-[#a67854] text-white shadow-md"
              >
                <Image
                  src="/customer-flow/icons/icon-camera.svg"
                  alt=""
                  width={12}
                  height={12}
                  // className="invert"
                />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-black">{profileData.name}</h1>
              {/* <p className="mt-1 text-[#777]">Verified customer</p> */}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5">
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
                <span className="flex-1 truncate">+91 {profileData.mobile}</span>
                <Image
                  src="/customer-flow/icons/lock.svg"
                  alt="Locked"
                  width={18}
                  height={18}
                  className="opacity-40"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
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

          <div className="mt-5">
            {permitDocument?.uploaded ? (
              <div className="profile-doc-chip">
                <Image
                  src="/customer-flow/icons/lock.svg"
                  alt=""
                  width={18}
                  height={18}
                  className="text-[#a67854]"
                />
                <span className="flex-1 truncate text-sm">{permitDocument.name}</span>
                <button
                  type="button"
                  className="grid size-8 place-items-center rounded-full hover:bg-black/5"
                >
                  <Image src="/customer-flow/icons/lock.svg" alt="View" width={16} height={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setPermitDocument(null)}
                  className="grid size-8 place-items-center rounded-full hover:bg-black/5"
                >
                  <Image src="/customer-flow/icons/error.svg" alt="Delete" width={16} height={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPermitDocument({ name: "Permit Document.pdf", uploaded: true })}
                className="profile-upload-btn"
              >
                Upload File
                <Image src="/customer-flow/icons/lock.svg" alt="" width={16} height={16} />
              </button>
            )}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
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
          </div>

          <div className="mt-5">
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

          <button
            type="button"
            onClick={() => setShowLogoutPopup(true)}
            className="customer-logout-button mt-8"
          >
            <Image src="/customer-flow/icons/log-out.svg" alt="" width={18} height={18} />
            Logout
          </button>
        </div>
      </PortalShell>

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

      {showImagePopup && (
        <div className="profile-popup-overlay" role="dialog" aria-modal="true">
          <div className="profile-popup-card">
            <div className="flex aspect-[3/4] items-center justify-center rounded-2xl bg-[#8b6b5a]">
              <Image
                src="/customer-flow/icons/profile.svg"
                alt=""
                width={80}
                height={80}
                className="opacity-30 invert"
              />
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowImagePopup(false)}
                className="profile-popup-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

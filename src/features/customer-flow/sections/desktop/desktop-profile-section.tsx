"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
import { formatDisplayMobile } from "@/features/customer-flow/utils/validation";

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
  } | null>({
    name: "Excise_Permit_2026.pdf",
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
    <div className="hidden lg:block">
      <PortalShell title="My Profile" eyebrow="Account Settings">
        <div className="mx-auto max-w-7xl">
          {/* Header Title & Subtitle */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-unbounded text-2xl font-black text-gray-900">
                Account & Profile
              </h1>
              <p className="font-geist mt-1 text-xs text-gray-500">
                Manage your personal credentials, excise permit verification, and delivery address.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Verified Customer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e8d5c4] bg-[#f7f4ee] px-3 py-1 text-xs font-semibold text-[#a67854]">
                Permit Active
              </span>
            </div>
          </div>

          {/* Main 2-Column Dashboard Grid */}
          <div className="grid grid-cols-12 items-start gap-6">
            {/* Left Column: User Summary & Navigation */}
            <div className="col-span-4 rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative size-20">
                  <div className="grid size-20 place-items-center rounded-full border-4 border-[#e8d5c4] bg-[#ece7e1] text-2xl font-black text-gray-800">
                    {profileData.name.slice(0, 1).toUpperCase()}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowImagePopup(true)}
                    className="absolute right-0 bottom-0 grid size-6 place-items-center rounded-full border-2 border-white bg-[#a67854] text-white shadow-md transition hover:bg-[#8f6442]"
                    title="Change Photo"
                  >
                    <Image
                      src="/customer-flow/icons/icon-camera.svg"
                      alt=""
                      width={11}
                      height={11}
                    />
                  </button>
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
                        <button
                          type="button"
                          onClick={() => setPermitDocument(null)}
                          className="ml-2 text-[11px] font-semibold text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setPermitDocument({ name: "Excise_Permit_2026.pdf", uploaded: true })
                        }
                        className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-gray-50/50 text-xs font-semibold text-[#a67854] hover:border-[#a67854] hover:bg-white"
                      >
                        Upload Permit Copy
                      </button>
                    )}
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

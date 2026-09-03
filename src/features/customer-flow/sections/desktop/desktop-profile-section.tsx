"use client";
import { useRouter } from "next/navigation";
import { PortalShell } from "@/features/customer-flow/components/portal-shell";
import { useCustomerFlow } from "@/features/customer-flow/state/customer-flow-context";
export function DesktopProfileSection() {
  const router = useRouter();
  const { state, logout } = useCustomerFlow();
  return (
    <div className="hidden lg:block">
      <PortalShell title="Profile" eyebrow="Account">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-black/10 bg-white p-10 shadow-[0_15px_50px_rgba(25,20,15,0.06)]">
          <div className="flex items-center gap-5 border-b border-black/10 pb-8">
            <div className="grid size-20 place-items-center rounded-full bg-[#ece7e1] text-3xl font-black">
              {state.session?.name?.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black">{state.session?.name}</h1>
              <p className="mt-1 text-[#777]">Verified customer</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#f5f3ef] p-5">
              <p className="text-xs text-[#777]">Customer Name</p>
              <p className="mt-2 font-bold">{state.session?.name}</p>
            </div>
            <div className="rounded-2xl bg-[#f5f3ef] p-5">
              <p className="text-xs text-[#777]">Mobile Number</p>
              <p className="mt-2 font-bold">+91 {state.session?.mobile}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="mt-8 h-12 rounded-full border border-[#a6403a] px-7 font-bold text-[#a6403a]"
          >
            Logout
          </button>
        </div>
      </PortalShell>
    </div>
  );
}

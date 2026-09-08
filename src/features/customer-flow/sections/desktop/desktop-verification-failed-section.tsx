"use client";
import { useRouter } from "next/navigation";
import { DesktopAuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function DesktopVerificationFailedSection() {
  const router = useRouter();

  return (
    <DesktopAuthPageLayout>
      <div className="customer-desktop-card flex flex-col items-center px-10 py-12 text-center">
        <div className="customer-icon-circle-lg flex items-center justify-center">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#fdf5ee]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4L20.5 19.5H1.5L11 4Z"
                stroke="#c9a07e"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M11 9.5V13" stroke="#c9a07e" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="11" cy="16" r="0.75" fill="#c9a07e" />
            </svg>
          </div>
        </div>
        <h1 className="customer-section-title mt-10 text-3xl">Verification Failed</h1>
        <p className="customer-section-description mt-4 max-w-[320px] text-sm leading-relaxed">
          We couldn&apos;t verify your details. Please check your information and try again. May be
          you are not above 25 Years old
        </p>
        <button
          type="button"
          onClick={() => router.push("/digilocker")}
          className="customer-continue-button mt-10 w-full"
        >
          Try Again
        </button>
      </div>
    </DesktopAuthPageLayout>
  );
}

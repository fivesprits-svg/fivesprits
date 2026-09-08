"use client";
import { useRouter } from "next/navigation";
import { AuthPageLayout } from "@/features/customer-flow/components/ui/auth-page-layout";

export function MobileVerificationFailedSection() {
  const router = useRouter();

  return (
    <AuthPageLayout>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#f5f0eb] px-8 pt-16 pb-6 text-center">
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
        <h1 className="customer-section-title mt-10 text-[26px]">Verification Failed</h1>
        <p className="customer-section-description mt-4 max-w-[280px] text-[13px] leading-relaxed">
          We couldn&apos;t verify your details. Please check your information and try again. May be
          you are not above 25 Years old
        </p>
        <button
          type="button"
          onClick={() => router.push("/digilocker")}
          className="customer-continue-button mt-auto mb-4 w-full"
        >
          Try Again
        </button>
      </div>
    </AuthPageLayout>
  );
}

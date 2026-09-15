"use client";

import { useEffect } from "react";

interface TermsOfServiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ open, onClose }: TermsOfServiceModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-title"
        className="relative flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl transition-all duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="border-common-border border-b px-6 py-5 pr-12">
          <h2
            id="terms-title"
            className="font-unbounded text-common-black text-xl font-bold md:text-2xl"
          >
            Terms of Service
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                1. Acceptance of Terms
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                By accessing or using The Five Spirits, you agree to be bound by these Terms of
                Service. If you do not agree to all of these terms, you may not access or use our
                services.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                2. Eligibility
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                You must be at least 25 years of age to use our services. By using The Five Spirits,
                you represent and warrant that you meet the minimum age requirement and have the
                legal capacity to enter into a binding agreement.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                3. Account Registration
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account. You agree to provide accurate,
                current, and complete information during registration and to update such information
                as necessary.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                4. Orders and Purchases
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                All orders are subject to availability and confirmation of the order price. We
                reserve the right to refuse or cancel any order for any reason, including
                limitations on quantities available, inaccuracies in product or pricing information,
                or errors identified by our fraud detection system.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                5. Pricing and Payment
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                Prices for products are subject to change without notice. We shall not be liable to
                you or any third party for any modification, price change, suspension, or
                discontinuance of the service.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                6. Privacy Policy
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                Your use of our services is also governed by our Privacy Policy, which is
                incorporated into these Terms by reference. Please review our Privacy Policy to
                understand our practices regarding the collection and use of your personal
                information.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                7. Limitation of Liability
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                In no event shall The Five Spirits, nor its directors, employees, partners, agents,
                suppliers, or affiliates, be liable for any indirect, incidental, special,
                consequential, or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h3 className="font-outfit text-common-black text-sm font-semibold md:text-base">
                8. Changes to Terms
              </h3>
              <p className="font-geist text-common-gray mt-2 text-xs leading-relaxed md:text-sm">
                We reserve the right to modify or replace these Terms at any time. It is your
                responsibility to check these Terms periodically for changes. Your continued use of
                the service following the posting of any changes constitutes acceptance of those
                changes.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="border-common-border border-t px-6 py-4">
          <button type="button" onClick={onClose} className="customer-continue-button">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

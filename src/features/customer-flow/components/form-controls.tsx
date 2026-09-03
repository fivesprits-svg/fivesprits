"use client";
import type { InputHTMLAttributes } from "react";
export function TextField({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold tracking-wide text-[#3a281c]">
        {label}
      </span>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        className="h-12 w-full rounded-xl border border-[#ddcfb8] bg-white px-4 text-[15px] text-[#24170e] outline-none placeholder:text-[#a49382] focus:border-[#b37a32] focus:ring-2 focus:ring-[#b37a32]/15"
      />
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-[#b83a32]" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
export function PrimaryButton({
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-[#7d4b22] px-5 text-sm font-bold tracking-wide text-white shadow-[0_8px_22px_rgba(83,46,20,0.2)] transition hover:bg-[#673b1b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a86d2a] disabled:opacity-50 ${className}`}
    />
  );
}

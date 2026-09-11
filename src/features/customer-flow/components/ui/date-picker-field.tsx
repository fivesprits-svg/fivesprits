"use client";

import { useRef } from "react";
import Image from "next/image";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  max?: string;
  min?: string;
}

function formatDateDisplay(isoDate: string): string {
  if (!isoDate) return "";

  const [year, month, day] = isoDate.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DatePickerField({ label, value, onChange, max, min }: DatePickerFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div>
      <span className="profile-field-label mb-2 block">{label}</span>

      <button
        type="button"
        onClick={() => {
          inputRef.current?.showPicker();
        }}
        className="profile-field-value w-full cursor-pointer text-left"
      >
        <span className={`flex-1 truncate ${!value ? "text-gray-400" : ""}`}>
          {value ? formatDateDisplay(value) : "Select date"}
        </span>

        <Image
          src="/customer-flow/icons/lock.svg"
          alt=""
          width={18}
          height={18}
          className="opacity-40"
        />
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={handleChange}
        max={max}
        min={min}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

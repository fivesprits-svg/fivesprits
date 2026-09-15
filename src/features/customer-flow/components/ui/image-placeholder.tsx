"use client";

import Image from "next/image";
import { Gift, Layers, Package } from "lucide-react";

interface ImagePlaceholderProps {
  type?: "combo" | "gift" | "product" | "brand" | "category";
  className?: string;
  compact?: boolean;
}

export function ImagePlaceholder({
  type = "product",
  className = "",
  compact = false,
}: ImagePlaceholderProps) {
  if (type === "product" || type === "brand") {
    if (compact) {
      return (
        <div
          className={`relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF6F0] via-[#F4EFE6] to-[#EAE2D5] p-1.5 ${className}`}
        >
          <div className="relative size-full">
            <Image
              src="/customer-flow/icons/card-bottle.svg"
              alt="Default bottle"
              fill
              className="object-contain"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={`relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE3] to-[#FAF7F2] p-4 text-center select-none ${className}`}
      >
        {/* Background Soft Glow */}
        <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-[#c2966e]/5 blur-xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-[#a67854]/5 blur-xl" />

        {/* Default Bottle Graphic */}
        <div className="relative h-4/5 w-4/5 transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/customer-flow/icons/card-bottle.svg"
            alt="Default bottle"
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  }

  const renderIcon = (sizeClass: string, strokeWidth = 1.5) => {
    switch (type) {
      case "gift":
        return <Gift className={sizeClass} strokeWidth={strokeWidth} />;
      case "combo":
        return <Layers className={sizeClass} strokeWidth={strokeWidth} />;
      case "category":
        return <Layers className={sizeClass} strokeWidth={strokeWidth} />;
      default:
        return <Package className={sizeClass} strokeWidth={strokeWidth} />;
    }
  };

  if (compact) {
    return (
      <div
        className={`flex size-full items-center justify-center bg-gradient-to-br from-[#FAF6F0] via-[#F4EFE6] to-[#EAE2D5] p-2 text-[#a67854] ${className}`}
      >
        {renderIcon("size-5 opacity-70", 1.75)}
      </div>
    );
  }

  return (
    <div
      className={`relative flex size-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE3] to-[#FAF7F2] p-4 text-center select-none ${className}`}
    >
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute -top-8 -right-8 size-32 rounded-full bg-[#c2966e]/5 blur-xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-[#a67854]/5 blur-xl" />

      {/* Centered Lucide Icon */}
      <div className="relative flex size-14 items-center justify-center rounded-2xl border border-[#c2966e]/30 bg-white/85 text-[#a67854] shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-110">
        {renderIcon("size-7", 1.6)}
      </div>
    </div>
  );
}

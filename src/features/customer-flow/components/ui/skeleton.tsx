import type { HTMLAttributes } from "react";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`skeleton ${className}`} {...props} />;
}

export function SkeletonCircle({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`skeleton-circle ${className}`} {...props} />;
}

export function ButtonSpinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-4 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="32"
        strokeLinecap="round"
        opacity="0.3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`skeleton relative overflow-hidden ${className}`}>
      <svg
        className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-3.5 shadow-sm ${className}`}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
      <Skeleton className="mt-3 h-10 w-full rounded-xl" />
    </div>
  );
}

export function CategorySkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <SkeletonCircle className="size-[64px] sm:size-[76px] lg:size-24" />
      <Skeleton className="h-3 w-16 rounded sm:h-3.5" />
    </div>
  );
}

export function BrandSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-200/80 bg-white p-1.5 shadow-sm sm:rounded-2xl sm:p-4 ${className}`}
    >
      <Skeleton className="aspect-[16/10] w-full rounded-lg sm:rounded-xl" />
      <Skeleton className="mx-auto mt-2.5 h-3 w-20 rounded sm:mt-3 sm:h-3.5" />
    </div>
  );
}

export function CartItemSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[22px] border border-gray-100 bg-white p-3 ${className}`}
    >
      <Skeleton className="size-[68px] shrink-0 rounded-[14px]" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-5 w-1/3 rounded" />
      </div>
      <Skeleton className="h-9 w-24 rounded-full" />
    </div>
  );
}

export function ComboOfferCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-gray-200/90 bg-white p-3.5 shadow-sm sm:p-4 ${className}`}
    >
      <Skeleton className="aspect-[20/10] w-full rounded-[20px]" />
      <Skeleton className="mt-3.5 h-6 w-20 rounded-full" />
      <Skeleton className="mt-2.5 h-6 w-3/4 rounded" />
      <div className="mt-3 space-y-2 rounded-2xl bg-[#FAF6F0] p-3.5">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-7 w-20 rounded" />
        </div>
        <Skeleton className="h-11 w-24 rounded-full sm:w-28" />
      </div>
    </div>
  );
}

export function CartSummarySkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 rounded-[26px] bg-white p-5 shadow-sm ${className}`}>
      <Skeleton className="h-5 w-32 rounded" />
      <div className="space-y-2.5">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
      </div>
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="mt-2 h-12 w-full rounded-full" />
    </div>
  );
}

export function AuthPageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex min-h-dvh flex-col items-center justify-center px-8 ${className}`}>
      <SkeletonCircle className="size-24" />
      <Skeleton className="mt-8 h-7 w-48 rounded" />
      <div className="mt-4 space-y-2 text-center">
        <Skeleton className="mx-auto h-4 w-64 rounded" />
        <Skeleton className="mx-auto h-4 w-56 rounded" />
      </div>
      <Skeleton className="mt-auto mb-6 h-[50px] w-full rounded-[130px]" />
    </div>
  );
}

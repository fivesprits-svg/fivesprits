"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export function MobileHeader({
  title,
  subtitle,
  backHref,
  isSearchEnabled = false,
}: {
  title?: string;
  subtitle?: string;
  backHref?: string;
  isSearchEnabled?: boolean;
}) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };
  return (
    <header className="md:hidden">
      {/* <MobileStatusBar /> */}
      <div className="relative flex h-14 items-center justify-center px-6 md:px-10">
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="absolute left-6 grid size-10 cursor-pointer place-items-center rounded-full bg-[#f7f4ee] md:left-10"
        >
          <Image src="/customer-flow/icons/back.svg" alt="" width={16} height={16} />
        </button>

        <div className="text-center">
          {title && <h1 className="text-[17px] font-semibold md:text-lg">{title}</h1>}

          {subtitle && (
            <h3 className="font-outfit text-[11px] font-extrabold tracking-wider text-[#a67854]">
              {subtitle}
            </h3>
          )}
        </div>
        {isSearchEnabled && (
          <button
            type="button"
            aria-label="Search"
            className="absolute right-6 grid size-9 cursor-pointer place-items-center text-gray-800 transition active:scale-95 md:right-10"
          >
            <Image
              src="/customer-flow/icons/icon-search.svg"
              alt="Search"
              width={18}
              height={18}
              className="opacity-90"
            />
          </button>
        )}
      </div>
    </header>
  );
}

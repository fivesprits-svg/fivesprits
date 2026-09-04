"use client";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs font-medium text-gray-400"
    >
      <Link
        href="/categories"
        className="flex items-center gap-1 text-gray-500 transition-colors hover:text-[#a67854]"
      >
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            <span className="text-gray-300">/</span>
            {isLast || !item.href ? (
              <span className="font-semibold text-gray-800">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 transition-colors hover:text-[#a67854]"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

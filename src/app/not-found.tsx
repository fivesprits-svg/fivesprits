import Link from "next/link";
import { getDictionary } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Not Found | Next.js Enterprise AI Starter",
  description: "The page you are trying to access does not exist.",
  path: "/404",
});

export default function NotFoundPage() {
  const dict = getDictionary("en");

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">{dict.errors.notFoundTitle}</h1>
      <p className="mt-3 text-black/70">{dict.errors.notFoundDescription}</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        {dict.nav.home}
      </Link>
    </main>
  );
}

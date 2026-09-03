"use client";

import { useEffect } from "react";
import { getDictionary } from "@/lib/i18n/config";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const dict = getDictionary("en");

  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{dict.errors.generic}</h1>
      <p className="mt-3 text-black/70">
        {error.message || "Unexpected application error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        Retry
      </button>
    </main>
  );
}

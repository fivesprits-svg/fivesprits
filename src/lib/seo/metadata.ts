import type { Metadata } from "next";

export const siteConfig = {
  name: "Next.js Enterprise AI Starter",
  description:
    "Enterprise-grade Next.js starter with server-first rendering, SEO foundation, localization, and Strapi-ready blog architecture.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  ogImage: "https://example.com/og-image.jpg",
  twitterHandle: "@example",
};

export function buildMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
  };
}

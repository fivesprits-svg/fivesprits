import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/metadata";

export const revalidate = 300;

export const SITEMAP_EXCLUDED_PATHS = ["/api", "/_next", "/error", "/not-found"] as const;

const STATIC_SITEMAP_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/otp", changeFrequency: "yearly", priority: 0.3 },
  { path: "/digilocker", changeFrequency: "yearly", priority: 0.3 },
  { path: "/digilocker/otp", changeFrequency: "yearly", priority: 0.3 },
  { path: "/digilocker/verification", changeFrequency: "yearly", priority: 0.3 },
  { path: "/digilocker/verification-failed", changeFrequency: "yearly", priority: 0.3 },
  { path: "/age-verification", changeFrequency: "yearly", priority: 0.3 },
  { path: "/profile-setup", changeFrequency: "yearly", priority: 0.3 },
  { path: "/categories", changeFrequency: "weekly", priority: 0.9 },
  { path: "/brands", changeFrequency: "weekly", priority: 0.8 },
  { path: "/products", changeFrequency: "weekly", priority: 0.8 },
  { path: "/offers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/offers/empty", changeFrequency: "weekly", priority: 0.4 },
  { path: "/offers/gifts", changeFrequency: "weekly", priority: 0.7 },
  { path: "/offers/gifts/select", changeFrequency: "weekly", priority: 0.6 },
  { path: "/cart", changeFrequency: "yearly", priority: 0.4 },
  { path: "/profile", changeFrequency: "yearly", priority: 0.4 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}>;

function isExcludedSitemapPath(path: string): boolean {
  return SITEMAP_EXCLUDED_PATHS.some(
    (excludedPath) => path === excludedPath || path.startsWith(`${excludedPath}/`),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_SITEMAP_ROUTES.filter((route) => !isExcludedSitemapPath(route.path)).map(
    (route) => ({
      url: `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  );
}

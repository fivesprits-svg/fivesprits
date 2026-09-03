import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("customer-flow screen architecture", () => {
  it.each(["brands", "products", "offers", "gift-offers", "gift-selection", "cart"])(
    "keeps independent mobile and desktop %s implementations",
    (screen) => {
      const mobile = source(
        `src/features/customer-flow/sections/mobile/mobile-${screen}-section.tsx`,
      );
      const desktop = source(
        `src/features/customer-flow/sections/desktop/desktop-${screen}-section.tsx`,
      );

      expect(mobile).not.toContain("sections/responsive");
      expect(desktop).not.toContain("sections/responsive");
      expect(mobile).not.toEqual(desktop);
    },
  );

  it("links the Figma Offer navigation item to the offer flow", () => {
    const mobileNavigation = source(
      "src/features/customer-flow/components/navigation/mobile-bottom-nav.tsx",
    );
    const desktopNavigation = source(
      "src/features/customer-flow/components/layout/desktop-header.tsx",
    );

    expect(mobileNavigation).toContain('{ href: "/offers", label: "Offer"');
    expect(desktopNavigation).toContain('href="/offers"');
    expect(source("src/app/offers/page.tsx")).toContain("MobileOffersSection");
    expect(source("src/app/offers/empty/page.tsx")).toContain("MobileEmptyOffersSection");
    expect(source("src/app/offers/[offerId]/page.tsx")).toContain("MobileOfferDetailsSection");
    expect(source("src/app/offers/gifts/page.tsx")).toContain("MobileGiftOffersSection");
    expect(source("src/app/offers/gifts/select/page.tsx")).toContain("MobileGiftSelectionSection");
  });

  it("provides the profile screen and logout confirmation route", () => {
    expect(source("src/app/profile/page.tsx")).toContain("MobileProfileSection");
    expect(
      source("src/features/customer-flow/sections/mobile/mobile-profile-section.tsx"),
    ).toContain("Logout Confirmation");
  });

  it("keeps global CSS limited to Tailwind's import", () => {
    expect(source("src/app/globals.css").trim()).toBe('@import "tailwindcss";');
  });

  it.each(["home", "categories", "cart", "profile"])(
    "uses the exported Figma %s vector",
    (icon) => {
      expect(source(`public/customer-flow/icons/${icon}.svg`)).toContain("data-figma-node");
    },
  );

  it.each(["about-us", "blog", "contact-us", "privacy-policy", "term-and-conditions"])(
    "removes the legacy %s route",
    (route) => {
      expect(existsSync(resolve(process.cwd(), `src/app/${route}/page.tsx`))).toBe(false);
    },
  );

  it("publishes only customer-portal routes in the sitemap", () => {
    const sitemap = source("src/app/sitemap.ts");
    expect(sitemap).toContain('path: "/categories"');
    expect(sitemap).toContain('path: "/profile"');
    expect(sitemap).toContain('path: "/offers"');
    expect(sitemap).not.toContain("getBlogPostsForSitemap");
    expect(sitemap).not.toContain('path: "/about-us"');
  });

  it("implements the Figma mobile status bar and home indicator", () => {
    const chrome = source(
      "src/features/customer-flow/components/navigation/mobile-system-chrome.tsx",
    );
    expect(chrome).toContain("9:41 AM");
    expect(chrome).toContain("status-signal.svg");
    expect(chrome).toContain("home-indicator");
  });

  it.each(["back", "lock", "success", "empty", "remove"])(
    "uses exported Figma geometry for the %s icon",
    (icon) => {
      expect(source(`public/customer-flow/icons/${icon}.svg`)).toContain("data-figma-node");
    },
  );

  it("uses the exported Figma logo geometry on mobile login", () => {
    expect(source("public/customer-flow/icons/logo-mark.svg")).toContain(
      'data-figma-node="234:318"',
    );
    expect(source("src/features/customer-flow/sections/mobile/mobile-login-section.tsx")).toContain(
      "logo-mark.svg",
    );
  });

  it("matches the Figma OTP screen copy and four-cell presentation", () => {
    const otp = source("src/features/customer-flow/sections/mobile/mobile-otp-section.tsx");
    expect(otp).toContain("VERIFY YOUR");
    expect(otp).toContain("NUMBER");
    expect(source("src/features/customer-flow/components/auth/otp-form.tsx")).toContain(
      "grid-cols-4",
    );
  });

  it.each([
    "src/features/blog/services/blog.service.ts",
    "src/lib/strapi/client.ts",
    "src/components/site-header.tsx",
    "src/components/site-footer.tsx",
    "src/app/api/contact/route.ts",
  ])("removes unused starter source %s", (path) => {
    expect(existsSync(resolve(process.cwd(), path))).toBe(false);
  });
});

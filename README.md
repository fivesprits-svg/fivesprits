# Five Spirits Customer Portal

Responsive customer catalogue and requirement-submission design prototype built with Next.js and inline Tailwind utility classes.

Run `npm install` and `npm run dev`, then open `/`. Enter a name and any 10-digit mobile number, then use prototype OTP `1234`.

The clickable flow is `/` → `/otp` → `/categories` → `/brands` → `/products` → `/cart`. Cart and mock session data persist in browser storage. No real OTP, API, database, admin portal, order, checkout, or payment functionality is included.

Quality checks: `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`.

## Starter foundation

Production-grade **Next.js App Router** master codebase for MNC-scale products with:

- SEO-first server rendering
- fast routing and performance defaults
- localization foundation
- Strapi-ready blog architecture
- quality gates, hooks, and CI

---

## 1) Stack & Standards

- Next.js (App Router) + TypeScript (strict)
- React Server Components by default
- Tailwind CSS
- Zod for runtime validation
- Husky + lint-staged for pre-commit quality checks
- GitHub Actions CI for lint/typecheck/build

This repository follows enterprise standards defined in:

- `MASTER_PROMPT.md`
- `.ai/nextjs.md`
- `AGENTS.md`

---

## 2) Core Architecture

```txt
src/
  app/
    api/health/route.ts
    blog/
      [slug]/page.tsx
      page.tsx
    error.tsx
    not-found.tsx
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  features/
    blog/
      components/blog-card.tsx
      services/blog.service.ts
      types/blog.ts
  lib/
    i18n/
      config.ts
      dictionaries/
        en.json
        ar.json
    seo/
      metadata.ts
      jsonld.ts
    strapi/
      client.ts
```

---

## 3) SEO-First / No-Hydration-Wait Strategy

For SEO-critical content:

- rendered on server (RSC / SSR / ISR)
- metadata generated server-side
- robots + sitemap generated via App Router metadata routes
- JSON-LD injected in root layout
- client components used only for interaction islands

This ensures crawlers receive full HTML content immediately.

---

## 4) Fast Routing & Performance Defaults

- App Router nested routing and segment structure
- ISR-ready data fetch (`next: { revalidate }`) in Strapi client
- build-generated `sitemap.ts` with blog slug expansion and ISR refresh
- lean server-first pages to reduce hydration cost
- explicit no-store headers for health/API routes requiring fresh data

---

## 5) Strapi Integration

`src/lib/strapi/client.ts` contains:

- environment validation with Zod
- typed `strapiRequest<T>()`
- secure token usage via server env
- revalidate support

`src/features/blog/services/blog.service.ts` provides:

- `getBlogPosts()`
- `getBlogPostBySlug(slug)`
- `getBlogPostSlugs()`

---

## 6) Localization Foundation

Centralized dictionaries:

- `src/lib/i18n/dictionaries/en.json`
- `src/lib/i18n/dictionaries/ar.json`

And loader/config in `src/lib/i18n/config.ts`.

No hardcoded user-facing content should be introduced for new features.

---

## 7) Hooks, Quality Gates, and CI

### Pre-commit hook

- `.husky/pre-commit` runs `npx lint-staged`

### lint-staged rules (package.json)

- JS/TS files → ESLint with zero warnings
- JSON/MD/CSS files → `node scripts/verify.js`

### CI pipeline

`.github/workflows/ci.yml` runs on push/PR:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`

---

## 8) Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRAPI_URL=https://your-strapi-instance.com
STRAPI_TOKEN=your_readonly_strapi_token
```

---

## 9) Development Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

---

## 10) Sitemap Generation and Exclusions

`src/app/sitemap.ts` is a Next.js metadata route. `npm run build` generates the sitemap endpoint automatically at `/sitemap.xml`; no separate post-build script or file in `public/` is required.

The route refreshes through ISR every five minutes and adds every paginated Strapi blog post when `STRAPI_URL` is configured. Static routes are defined in `STATIC_SITEMAP_ROUTES`.

Use `SITEMAP_EXCLUDED_PATHS` to keep internal or non-indexable routes out of the sitemap. It supports exact paths and path prefixes:

```ts
export const SITEMAP_EXCLUDED_PATHS = ["/api", "/_next", "/error", "/not-found"] as const;
```

For example, add `"/account"` to exclude `/account` and every nested account route.

---

## 11) Session-Based User Data Storage

Store only an opaque, random session identifier in a cookie. Keep user data and session state on the server in a database or shared cache (such as Redis), keyed by that identifier.

- Set the cookie server-side with `HttpOnly`, `Secure` in production, `SameSite=Lax` (or stricter when appropriate), `Path=/`, and a short, explicit expiry.
- Never put user profiles, permissions, access tokens, or other sensitive data in `localStorage`, `sessionStorage`, or readable cookies.
- Read the session only in Server Components, Server Actions, middleware, or route handlers; load the current user from the server-side session store.
- Rotate the session ID after sign-in or privilege changes, validate its expiry on every request, and delete it from both cookie and store on logout.
- For state-changing requests, validate authorization server-side and use same-site cookies plus CSRF protection appropriate to the authentication flow.

Suggested server-side session record:

```ts
type SessionRecord = {
  userId: string;
  expiresAt: Date;
  createdAt: Date;
};
```

---

## 12) Production Checklist Mapping

This starter directly supports your requested checklist categories:

- Frontend standards: server-first structure, dedicated error/not-found pages
- SEO: metadata helpers, robots, sitemap, JSON-LD
- Performance: server rendering defaults, ISR, cache controls
- Caching/errors: no-store example API route + global route error handling
- Blog (Strapi): typed service, listing/detail pages, slug routing
- Localization: centralized dictionary pattern with translation keys

---

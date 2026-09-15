# API Integration, Layout & Code Duplication Audit (Production Readiness)

> **Document Version:** 1.0  
> **Target:** Five Spirit Customer Portal (`/portal`)  
> **Status:** Production Review & Cleanup Blueprint

---

## 1. Executive Summary & Key Observations

We audited the frontend portal codebase across **API clients**, **Next.js layout & page architecture**, **state management**, and **desktop/mobile component duplication**.

### Key Strengths Already in Place:

- Centralized `apiFetch` in `api-client.ts` with in-flight request deduplication for concurrent `GET` requests.
- Next.js Server Components fetching initial data on catalogue pages (`/products`, `/brands`, `/combo-offers`, `/gift-offers`).
- Modularization of the Cart feature using `useCartSection` and reusable cards (`RegularCartItemCard`, `GiftCartItemCard`, `ComboCartItemCard`, `RequirementHistoryCard`, `CartSummarySidebar`).

### Areas Requiring Cleanup Before Production:

1. **API Client & Auth Discrepancy:** `getAuthToken()` reads from `localStorage` (`customer_access_token` vs `access_token`), which is invisible to Server Components during SSR. `auth-api.ts` uses raw `fetch` instead of `apiFetch`.
2. **Redundant Service Files:** Duplicate services exist: `user-api.ts` (`/users/me`) vs `profile-api.ts` (`/profile/me`).
3. **Double Mounting of Desktop & Mobile Sections:** Pages mount both `<DesktopSection />` and `<MobileSection />` in DOM simultaneously (hidden via CSS). If components fetch data in `useEffect`, requests are duplicated.
4. **Catalogue Fallback Data:** Multiple service files (`products-api.ts`, `brands-api.ts`, `offers-api.ts`) hardcode fallback mock arrays from `catalogue.ts` and `offers.ts`. If the backend returns empty results or errors, mock data can unexpectedly display.

---

## 2. API Integration Architecture & Standards

### Current API Surface Overview

| Service File        | Base Endpoint                    | Methods                  | Auth Required | Notes                                                             |
| ------------------- | -------------------------------- | ------------------------ | ------------- | ----------------------------------------------------------------- |
| `auth-api.ts`       | `/auth/customer/*`               | POST                     | No            | Uses raw `fetch()`. Needs unification with `apiFetch`.            |
| `user-api.ts`       | `/users/me`                      | GET, PATCH               | Yes           | Used by context & profile.                                        |
| `profile-api.ts`    | `/profile/me`                    | PATCH                    | Yes           | **Redundant with `user-api.ts`**. Consolidate into `user-api.ts`. |
| `cart-api.ts`       | `/cart`                          | GET, POST, PATCH, DELETE | Yes           | Core cart management.                                             |
| `orders-api.ts`     | `/orders`, `/orders/me`          | GET, POST                | Yes           | Requirement submission & history.                                 |
| `products-api.ts`   | `/products`, `/products/:id`     | GET                      | Optional      | Server + Client catalogue.                                        |
| `brands-api.ts`     | `/brands`, `/brands/:id`         | GET                      | Optional      | Server + Client catalogue.                                        |
| `categories-api.ts` | `/categories`, `/categories/:id` | GET                      | Optional      | Server + Client catalogue.                                        |
| `offers-api.ts`     | `/combo-offers`, `/gift-offers`  | GET                      | Optional      | Offers and gift reward endpoints.                                 |
| `api-client.ts`     | `/upload`                        | POST                     | Yes           | Multi-part upload handler.                                        |

---

## 3. Recommended Architectural Fixes

### 3.1 Unify API Client (`api-client.ts`)

- **Standardized Error Handling:** Ensure all 401 Unauthorized responses trigger a single auth expiration event/handler (clearing tokens and redirecting to `/` or `/login-here`).
- **Unify `auth-api.ts`:** Migrate `requestOtpApi`, `verifyOtpApi`, `loginApi`, `logoutApi` to use `apiFetch` for uniform base URL, headers, and error parsing.

### 3.2 Consolidate Redundant Endpoints

- **Merge `profile-api.ts` into `user-api.ts`:**
  - Remove `profile-api.ts`.
  - Use `fetchCustomerProfileApi()` for `GET /users/me` and `updateCustomerProfileApi()` for `PATCH /users/me`.

### 3.3 Eliminate Duplicate Component-Level API Calls

When creating mobile and desktop views:

- **Rule:** Never fetch data in `useEffect` inside both Desktop and Mobile sections independently.
- **Pattern:**
  1. For Server-rendered pages (`/products`, `/brands`, `/categories`, `/combo-offers`, `/gift-offers`): Fetch data in `page.tsx` and pass as props to both `<DesktopSection ... />` and `<MobileSection ... />`.
  2. For Client-state pages (`/cart`, `/profile`): Fetch data inside a dedicated custom hook (`useCartSection`, `useProfileSection`) at the parent or shared level so it executes only once.

---

## 4. Code Duplication Cleanup Checklist

### 4.1 Catalogue & Offer Pages

- [x] **Cart Page (`/cart`):** Refactored `DesktopCartSection` and `MobileCartSection` to use `useCartSection` and modular card components (`RegularCartItemCard`, `GiftCartItemCard`, `ComboCartItemCard`, `RequirementHistoryCard`, `CartSummarySidebar`).
- [ ] **Combo Offers Page (`/combo-offers`):**
  - Standardize `ComboOfferCard` for grid displays.
  - Share `OfferTabs` component across desktop and mobile.
- [ ] **Gift Offers Page (`/gift-offers` & `/gift-offers/select`):**
  - Extract `GiftProductCard` and `GiftProgressStepper` into `@/features/customer-flow/components/offers/`.
- [ ] **Products & Brands Pages (`/products`, `/brands`):**
  - Standardize `CatalogueCard` usage between desktop grid and mobile scroll views.

---

## 5. Production Environment & Security Hardening

1. **Environment Variables:**
   - Verify `NEXT_PUBLIC_API_URL` is set in production (`.env.production`).
   - Use strict HTTPS endpoints in production.
2. **Mock Data Phasing:**
   - In development, mock data (`defaultProducts`, `defaultBrands`, `defaultComboOffers`) provides graceful fallbacks.
   - For production, replace `console.warn(...) fallback data` with empty states (`[]`) and error toasts so missing backend items don't mask database sync issues.
3. **Image Optimization:**
   - Ensure backend image host domains are listed in `next.config.ts` under `images.remotePatterns` (e.g. S3, Cloudinary, or local CDN).
   - Ensure components safely guard `<Image />` rendering against empty string `""` sources (already implemented in cart & offers).
4. **Type Contracts (`types/state.ts` & `data/`):**
   - Ensure backend MongoDB DTOs match frontend interfaces (`_id` vs `id`, `offerImageUrl` vs `image`, `mrpAmount` vs `mrp`).

---

## 6. Implementation Roadmap Summary

```
Phase 1 (Completed):
  ✔ Fixed strict type incompatibilities on ComboOffer & GiftOffer image properties.
  ✔ Removed hardcoded Figma image fallbacks in offers-api.ts.
  ✔ Eliminated 4 redundant catalogue API calls from Cart page.
  ✔ Decomposed desktop & mobile cart sections into reusable components and useCartSection hook.

Phase 2 (Recommended Next Steps):
  ▶ Merge profile-api.ts into user-api.ts.
  ▶ Unify auth-api.ts to use apiFetch.
  ▶ Extract shared product/brand grid cards across products & brands sections.
  ▶ Configure cookie-based auth token synchronization for seamless SSR authentication.
```

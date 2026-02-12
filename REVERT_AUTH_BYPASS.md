# How to Revert Authentication Bypass

**Created:** 2026-02-13  
**Purpose:** Temporary bypass of authentication for development/testing

## Changes Made

Authentication was temporarily disabled to allow unrestricted access to all routes, with automatic redirection from `/` to `/dashboards/crm`.

## Files Modified

### 1. `src/middleware.ts`
- **Lines 42-81:** Commented out entire authentication logic block
- **Lines 84-87:** Added temporary redirect for root path to dashboard

### 2. `src/configs/auth-routes.ts`
- **Lines 11-13:** Changed root path (`/`) from `"public"` to `"guest"` type

---

## How to Revert

### Step 1: Restore `src/middleware.ts`

**Remove the temporary redirect (lines 84-87):**
```typescript
// TEMPORARY: Redirect root path to dashboard since authentication is disabled
if (pathnameWithoutLocale === "/" || pathnameWithoutLocale === "") {
  return redirect(process.env.HOME_PATHNAME || "/dashboards/crm", request)
}
```

**Uncomment the authentication block (lines 42-81):**
Replace this:
```typescript
// TEMPORARILY DISABLED: Authentication is currently bypassed
// Handle authentication for protected and guest routes
// if (isNotPublic) {
//   ... (all the commented code)
// }
```

With this:
```typescript
// Handle authentication for protected and guest routes
if (isNotPublic) {
  // const token = await getCookieCache(request, {
  //   cookiePrefix: "TmVzdEpTIEJvaWxlcnBsYXRl",
  // })
  let isAuthenticated = false
  try {
    const { data: token } = await betterFetch(
      `${process.env.BACKEND_API_URL}/auth/get-session`,
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
        },
      }
    )
    isAuthenticated = !!token
  } catch (error) {
    console.log("Error fetching session:", error)
  }

  const isGuest = isGuestRoute(pathnameWithoutLocale)
  const isProtected = !isGuest

  // Redirect authenticated users away from guest routes
  if (isAuthenticated && isGuest) {
    return redirect(process.env.HOME_PATHNAME || "/", request)
  }

  // Redirect unauthenticated users from protected routes to sign-in
  if (!isAuthenticated && isProtected) {
    let redirectPathname = "/auth/sign-in"
    // Maintain the original path for redirection, but avoid redirecting to sign-in itself
    if (pathnameWithoutLocale !== "") {
      redirectPathname = ensureRedirectPathname(redirectPathname, pathname)
    }

    return redirect(redirectPathname, request)
  }
}
```

### Step 2: Restore `src/configs/auth-routes.ts`

**Change lines 11-13 from:**
```typescript
// TEMPORARILY CHANGED: Making root path redirect to dashboard
// ["/", { type: "public" }],
["/", { type: "guest" }],
```

**Back to:**
```typescript
["/", { type: "public" }],
```

---

## Quick Revert Checklist

- [ ] Remove temporary redirect in `src/middleware.ts` (lines 84-87)
- [ ] Uncomment authentication logic in `src/middleware.ts` (lines 42-81)
- [ ] Change root path type from `"guest"` to `"public"` in `src/configs/auth-routes.ts`
- [ ] Test that authentication is working by accessing a protected route
- [ ] Delete this file (`REVERT_AUTH_BYPASS.md`)

---

## Testing After Revert

1. Clear browser cookies/session storage
2. Navigate to `http://localhost:3000`
3. Should be redirected to `/auth/sign-in`
4. After login, should redirect to `/dashboards/crm`

---

**Note:** All changes are marked with `TEMPORARILY` or `TEMPORARY` comments for easy identification.

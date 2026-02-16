# Specification

## Summary
**Goal:** Prevent permanent Admin Panel lockouts by adding a first-time admin bootstrap flow, improving the “Access Denied” guidance, and enabling admins to grant admin access to additional principals.

**Planned changes:**
- Backend: Add a method to check whether any admin principal is configured.
- Backend: Add a one-time “become admin” bootstrap method that succeeds only when no admin exists, then enables normal admin checks for that principal.
- Backend: Add an admin-only method to grant admin permission to additional principals.
- Frontend: Update the Admin “Access Denied” screen to explain that admin access depends on the Internet Identity used and provide a prominent log out/switch identity action.
- Frontend: When no admin exists (per backend check), show a “Set up Admin / Become Admin” action that bootstraps the current identity and re-checks admin access automatically.
- Frontend: Add an Admin Settings section that allows an existing admin to paste a Principal ID and grant admin access.
- Preserve existing site features and routes (storefront, Stripe checkout, uploads/products, downloads, contact/newsletter, admin dashboard) while focusing changes only on admin access/setup reliability.

**User-visible outcome:** If no admin is configured, the first user can set up admin access from the Admin area and then manage Products/Stripe Setup normally; if an admin already exists, non-admin users see clear instructions and can log out/switch Internet Identity, and admins can grant access to additional principals to prevent future lockouts.

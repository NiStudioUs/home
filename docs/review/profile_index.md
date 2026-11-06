# Profile Page Architecture & Review Notes

## Overview
The website currently hosts an older, pre-compiled standalone React/Vite application inside `apps/portfolio/web/profile/` (with assets built in October 2026). When visitors navigate directly to `/home/profile/`, GitHub Pages serves `apps/portfolio/web/profile/index.html` as a physical file, which bypasses the main Flutter single-page app shell.

Per user instruction (2026-11-07), `apps/portfolio/web/profile/` is left untouched for now. These notes document the audit findings, discrepancies, and migration steps for when the profile is unified into the main shell.

## Discrepancies Identified in the Profile Review

1. **Visual & Theme Disconnect:**
   - The React profile defaults to a light theme regardless of the site's main theme preference.
   - Header is custom to the profile and does not match `NiTopbar` (different styling, different spacing, different links).
   - Shows "KS" initials in a placeholder circle instead of loading the developer avatar (`assets/developers/dev-avatar.webp`).
   - No direct navigation back to the app pages except a "Portfolio" link.

2. **Metrics & Counters Disagreement:**
   - The profile states: `"7 Apps Built, 3 Apps Live"`.
   - The portfolio site states: 5 primary apps (`scribble-notes`, `sms-stack`, `iky`, `alarm-clock`, `edgewise`), of which 2 are live on Google Play (`sms-stack` and `scribble-notes`).
   - Recommendation for future update: unify metrics to read dynamically from `assets/data.json`.

3. **Routing & Deep Links:**
   - The React profile uses hash/internal routing (`#/timeline`, `#/story`, `#/projects`, `#/stack`).
   - `sitemap.xml` originally listed canonical path URLs (`/home/profile/timeline`, `/home/profile/story`, etc.), which return 404 because the React router expects hash/client-side paths.

4. **Confidentiality / Sanitization:**
   - The work experience at Allica Bank previously referenced `@allica/shared-e2e`.
   - This has been updated in the portfolio data model (`apps/portfolio/lib/models/profile_data.dart`) to `@enterprise/shared-e2e` to prevent disclosing internal enterprise package names.
   - When the React profile is rebuilt in the future, ensure this anonymization is applied to its source data as well.

## Future Migration Plan
When ready to migrate:
1. Retire `apps/portfolio/web/profile/` static build.
2. Route `/profile` entirely through Flutter's `ProfileLayout` and `ProfilePage` (`apps/portfolio/lib/ui/pages/profile_page.dart`).
3. Embed `dev-avatar.webp` instead of "KS" initials.
4. Share `NiTopbar`, `NiFooter`, and `ThemeService` dark/light mode across the profile.

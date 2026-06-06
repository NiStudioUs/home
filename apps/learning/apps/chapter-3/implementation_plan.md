# Implementation Plan: Chapter 3 - URide

This project involves creating a frontend starter code for a taxi ride booking application called **URide**. The application will feature a premium, Uber-like UI leveraging our modern hybrid design system (Glassmorphism, Aurora backgrounds, etc.) and will be fully integrated into the Learning Hub.

## User Review Required

> [!IMPORTANT]
> **Uber-like Styling**: I will prioritize a dark-themed, sleek "Uber" aesthetic using Glassmorphism for the booking interface and Aurora-style backgrounds for dynamic energy.
> [!NOTE]
> **Form Validation**: I will implement real-time validation for the booking form (phone numbers, required fields, trip dates).

## Proposed Changes

### [NEW] Chapter 3 Scaffold (`apps/chapter-3`)
- **[NEW] Project Structure**: Initialize using Vite (`react-ts` template).
- **[NEW] Dependencies**: Install MUI, `react-router-dom`, `framer-motion`, `leaflet`, `react-leaflet`, and `@types/leaflet`.
- **[NEW] `vite.config.ts`**: Configure `base: './'`.
- **[NEW] `src/main.tsx`**: Setup `HashRouter`, custom MUI Dark Theme, and Leaflet CSS.

### UI & Pages
- **[NEW] `Layout.tsx`**: Global layout featuring a Glassmorphism navbar and footer.
- **[NEW] `Home.tsx`**: Hero section with Aurora-style backgrounds and a quick "Book Now" CTA.
- **[NEW] `About.tsx`**: Minimalist company overview with premium typography.
- **[NEW] `Services.tsx`**: Service cards (Standard, Premium, XL) using Hover-lift effects.
- **[NEW] `Contact.tsx`**: Modern contact form with Neumorphic inputs.
- **[NEW] `Booking.tsx`**: Functional booking interface featuring:
  - **Interactive Map**: Integrated **Leaflet** map with OpenStreetMap tiles.
  - **Pickup/Dropoff Points**: Selectable markers on the map.
  - **Vehicle Picker**: Selection for Standard, Luxury, and XL categories.
  - **Booking Form**: Real-time validation for user details and schedule.

### Hub Integration
- **[MODIFY] `src/App.jsx` (Root)**: Register Chapter 3 in the `apps` array.
- **[MODIFY] `package.json` (Root)**: Add Chapter 3 to the `build` script pipeline.

### Documentation & Assets
- **[NEW] `apps/chapter-3/README.md`**: Project overview and design philosophy.
- **[NEW] `apps/chapter-3/implementation_plan.md`**: This implementation plan, stored for future reference.
- **[MOVE] `apps/chapter-3/docs/taxi-ride-booking-application.pdf`**: Rename and relocate the project requirement PDF.

## Open Questions

1. **Specific Location**: Which city should the map default to for the demo (e.g., London, NYC, or a generic placeholder)?
2. **Iconography**: Should I use Material Symbols for car types, or would you like me to generate specific car assets using my image tool?

## Verification Plan

### Automated Tests
- `npm run build` from root to verify full repository integration.
- `cd apps/chapter-3 && npm run build` to verify local TypeScript compilation.
- Verify `leaflet` icons load correctly in the Vite environment.

### Manual Verification
- Verify navigation between all 5 pages (Home, About, Services, Contact, Booking).
- **Map Interaction**: Ensure markers can be placed and the map is fully responsive.
- **Form Validation**: Test the booking form with invalid inputs.
- Verify mobile responsiveness on simulated device views.

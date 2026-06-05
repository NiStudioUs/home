# Learning Repository Refactoring & Course Modules Walkthrough

## What was Accomplished

### 1. Repository Infrastructure
- Restructured the repository into a monolithic architecture to house all isolated learning applications securely inside the `apps/` directory.
- Built a global **React + Vite + Material 3 Portfolio Hub** at the root that dynamically integrates links and metadata for each nested chapter application.
- Configured a powerful, custom **GitHub Actions CI/CD Pipeline**. This script is intelligent enough to automatically detect static HTML folders versus fully-fledged nested React apps (containing `package.json`), build them synchronously, and seamlessly deploy everything to GitHub Pages without artifact duplication bugs.

### 2. Chapter 1: KS Foodie Static Website
- Migrated the raw HTML/CSS codebase securely into `apps/chapter-1`.
- Updated the application metadata within the main Hub to properly attribute the "KS Foodie" naming and Zomato-Red aesthetic guidelines.
- Configured dynamic routing using `import.meta.env.BASE_URL` dot-slash relatives to ensure the GitHub Pages root deployment domain does not swallow absolute paths.

### 3. Chapter 2: React HR Portal
- **Scaffolding**: Initialized a highly deterministic, minimalist Vite + React + TypeScript workspace purely for the Chapter 2 assignment natively within `apps/chapter-2`.
- **Material 3 Design**: Integrated a deeply custom `ThemeProvider` within `src/main.tsx` utilizing a crisp, modern minimalist aesthetic (Rounded 12px borders, subtle `#F8FAFC` backgrounds, flat depth profiles, vibrant `#2563EB` primary colors).
- **Authentication Form**: Created a sophisticated Login/Registration toggled view in `AuthPage.tsx` relying on local JSON `localStorage` simulation logic. 
- **HR Dashboard & Employee Dashboard**: Utilized React Router and natively context-aware MUI `<Tabs>` to deliver rapid, Single-Page navigations without page resets.
    - Built comprehensive mock forms enabling the `HR` role to add employees dynamically to a persistent mock database table.
    - Delivered the exact baseline component needs for the `Employee` role to natively visualize their profile details and construct mock leave request timelines.

## Verification
- All routes verified locally simulating the CI build via `npm run build && npm run preview` and verified to link securely via deep static directories.
- Typescript definitions heavily enforced and completely scaffolded to modern React 18 standards!
- Commits are organically pushing directly to the live GitHub Pages `custom-github-pages` pipeline!
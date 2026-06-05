# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.0] - 2026-06-05

### 🚀 Major Features
- **Unified Monorepo Architecture**: Successfully migrated the Flutter Portfolio (`apps/portfolio`), React Learning Hub (`apps/learning`), and React Developer Profile (`apps/profile`) into a single, cohesive repository structure.
- **Dynamic Hot-Reload Environment**: Implemented the `dev:servers` script that dynamically allocates zero-conflict system ports, boots all Vite dev servers, and natively passes dynamic configurations into Flutter memory via `--dart-define`.
- **Intelligent URL Routing**: Introduced `UrlHelper` to intercept cross-app linking inside Flutter. It gracefully proxies users to the active Vite Hot Module Replacement (HMR) servers during development, while falling back to relative paths for production.
- **Cross-App Theme Syncing**: Overhauled React's `ThemeContext` to securely read url-injected parameters from Flutter, enabling fully synchronized Light/Dark theme switching across all running local dev ports. 

### 🔧 Fixes & Refinements
- **React Router Fix**: Migrated the Developer Profile from `BrowserRouter` to `HashRouter` to prevent routing 404 errors when hosted as a static sub-app under `/profile/`.
- **Resume Assets**: Updated the Markdown Resume Engine fetch paths to execute securely from root directories using dynamic `.startsWith('/')` relative resolution.
- **Hero Banner Polishing**: Reduced navigational padding and fully integrated the `UrlHelper` into the interactive `CircleAvatar` badges for swift navigation.

### 📦 Build & Deployment
- Added the `dev:all` command that natively compiles Vite sub-apps as static assets and injects them directly into the Flutter `web/` folder, creating an instantaneous production-like build sandbox.
- Corrected `.gitignore` directives to dynamically ignore all sub-app build artifacts from the local staging area.

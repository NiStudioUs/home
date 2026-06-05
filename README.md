# Portfolio Monorepo

This repository is a unified monorepo containing the main Flutter-based portfolio application, along with several nested React-based micro-frontends (Learning Hub, Developer Profile) that are integrated and deployed together.

## Architecture

1.  **Flutter Portfolio (`apps/portfolio`)**: The primary application serving as the landing page and "Apps" showcase. It is built using Flutter Web and acts as the entry point (`/`).
2.  **Learning Hub (`apps/learning`)**: A React/Vite-based application showcasing various learning projects. It runs independently but is integrated into the final build.
3.  **Developer Profile (`apps/profile`)**: A React/Vite-based application detailing the developer's resume and timeline.

## Local Development Setup

To make local development seamless, a root `package.json` has been provided with helper scripts so you do not need to manually change directories.

From the root of the repository, you can run the following commands:

### 1. Unified Development Server (Recommended)
```bash
npm run dev:all
```
*(This automatically builds your React apps, injects them into the Flutter web root, and starts the Flutter dev server. All links across frameworks will work flawlessly!)*

### 2. Running the Flutter Portfolio
```bash
npm run dev:portfolio
```
*(This automatically runs `cd apps/portfolio && flutter run -d chrome`)*

### 2. Running the Learning Hub
```bash
npm run dev:learning
```
*(This automatically runs `cd apps/learning && npm run dev`)*

### 3. Running the Developer Profile
```bash
npm run dev:profile
```
*(This automatically runs `cd apps/profile && npm run dev`)*

## Data Synchronization

The Flutter application relies on data stored in `apps/portfolio/assets/data.json`. The Learning Hub has its own `apps/learning/src/data.json` source of truth.

If you make changes to the learning projects metadata inside `apps/learning/src/data.json`, you **must** sync those changes to the root Flutter app so they appear on the main landing page grid.

Run the sync script from the root directory using the helper command:
```bash
npm run sync-data
```

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`).

When code is pushed to the `main` branch:
1. The script automatically runs `sync_data.js`.
2. It builds the Flutter Web App.
3. It builds the Vite `learning` app and copies it into `build/web/learning/`.
4. It builds all internal learning projects (`chapter-1`, `chapter-2`, etc.) and copies them to `build/web/learning/apps/`.
5. It builds the Vite `profile` app and copies it into `build/web/profile/`.
6. Finally, the unified `build/web` (or `dist`) folder is deployed to GitHub Pages.

# Reference

**1. Why does `dev:all` build for production?**
To make the links (like `./profile/index.html`) seamlessly work *inside* your local Flutter Dev Server, we have to compile the React apps into static HTML/JS files and physically inject them into Flutter's `web/` folder. Vite's `build` command (which creates that static HTML/JS) is inherently a production build. It is the only way to get all three frameworks hosted under the exact same port locally!

**2. Where are the debug servers?**
We DO have the true, blazing-fast hot-reload debug servers! They are the scripts we added earlier:
- `npm run dev:learning` 
- `npm run dev:profile` 
- `npm run dev:portfolio` 

If you are actively coding in the React Developer Profile, you should use `npm run dev:profile` to get the instant Hot Module Replacement (HMR).

**3. Running ALL debug servers at once**
If you want to spin up all three debug servers simultaneously in a single terminal (so you can actively code in Flutter, Learning, and Profile at the same time), I just added a new script for you! 

You can run:
```bash
npm run dev:servers
```
*(This uses `npx concurrently` to boot up all three dev servers in parallel! Keep in mind, they will run on different local ports, so clicking cross-app links in the Flutter browser won't perfectly route to the React dev servers without manual port navigation.)*
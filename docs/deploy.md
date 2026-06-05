# Deployment Architecture

## Overview

The portfolio is a monorepo hosted on GitHub Pages. External Flutter apps (like IKY) deploy **independently** — they push their build artifacts directly to the `gh-pages` branch without ever touching the portfolio's `main` branch.

## Deployment Flow

```
IKY push to main (vskarthik9896/people-app-iky-v2)
    │
    └──► deploy-to-portfolio.yml
             │
             ├── Flutter Web build (obfuscated, DEMO_MODE=true)
             │      --no-source-maps --dart2js-optimization O4
             │
             └── peaceiris/actions-gh-pages
                    │
                    ├── external_repository: NiStudioUs/home
                    ├── publish_branch: gh-pages
                    ├── publish_dir: /tmp/iky-deploy   (contains iky/ subfolder)
                    └── keep_files: true  ← does NOT wipe other folders

Portfolio push to main (NiStudioUs/home)
    │
    └──► deploy.yml
             │
             ├── Sync learning data  (node scripts/sync_data.js)
             ├── Flutter build       (apps/portfolio)
             ├── Learning Hub build  (apps/learning)
             ├── Developer Profile   (apps/profile)
             │
             └── peaceiris/actions-gh-pages
                    │
                    ├── publish_dir: ./dist
                    └── keep_files: true  ← preserves iky/ pushed by IKY workflow
```

## Live URLs

| URL | Source |
|-----|--------|
| `https://nistudious.github.io/home/` | Flutter Portfolio (main app) |
| `https://nistudious.github.io/home/iky/` | IKY Flutter Web (pushed by IKY repo) |
| `https://nistudious.github.io/home/learning/` | Learning Hub (React/Vite) |
| `https://nistudious.github.io/home/profile/` | Developer Profile (React/Vite) |

## Token Setup

### `HOME_REPO_TOKEN` (saved as a secret in the IKY repo)

This PAT is what allows the IKY workflow to write to the **portfolio** repo's `gh-pages` branch.

| Setting | Value |
|---------|-------|
| **Token type** | Classic PAT or Fine-grained PAT |
| **Account** | `vskarthik9896` |
| **Where to save** | IKY repo → Settings → Secrets → `HOME_REPO_TOKEN` |

#### Required Permissions

**Classic PAT** (simplest):
- Scope: `repo` (full control of private repositories)
- This covers all branches including `gh-pages` — **no change needed** from what was previously set up.

**Fine-grained PAT** (if you switch to this later):
- Repository access: `NiStudioUs/home`
- Permission: `Contents` → **Read and Write**
- This must cover the `gh-pages` branch (fine-grained PATs apply to all branches by default)

> **No token change is required** from the previous setup. The `HOME_REPO_TOKEN` already has `repo` scope which covers writing to any branch — including `gh-pages`. The only change is *where* the workflow pushes (branch target changed from `main` to `gh-pages`).

## Adding a New Flutter App

To onboard a new app (e.g., Notes, SMS Stack) using the same pattern:

1. Create `.github/workflows/deploy-to-portfolio.yml` in the new app's repo.
2. Copy the IKY workflow and change:
   - `APP_SLUG: notes` (or `sms-stack`, etc.)
   - `APP_PATH:` path to the Flutter app source
   - `--base-href "/home/notes/"`
3. Add `HOME_REPO_TOKEN` secret to the new repo.
4. The app will be live at `https://nistudious.github.io/home/notes/` after the first push.

## Local Development Scripts

| Command | Description |
|---------|-------------|
| `cd apps/portfolio && ./scripts/migrate.sh` | Reads all `assets-ext/appN/` folders → updates `assets/data.json` |
| `npm run sync-data` | Syncs `apps/learning/src/data.json` → `learningProjects` in portfolio data |
| `npm run dev:servers` | Starts all dev servers (Flutter + React) with hot reload |

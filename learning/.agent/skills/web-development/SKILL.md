---
name: Web Development Guidelines
description: Repository-specific development conventions, tech stack rules, build pipeline, code quality standards, and integration patterns for the learning monorepo.
---

# Web Development Guidelines Skill

This skill encodes the development conventions for the **Learning Repository** monorepo. Every agent creating or modifying code in this repo MUST follow these guidelines.

---

## 1. Repository Architecture

```
learning/                     ← Root (Vite + React Hub App)
├── src/                      ← Hub App source
│   ├── App.jsx               ← Hub page — lists all chapter projects
│   ├── main.jsx              ← React entry — theme, CssBaseline
│   └── index.css             ← Global styles
├── apps/                     ← All chapter projects live here
│   ├── chapter-1/            ← Static HTML/CSS project
│   ├── chapter-2/            ← React + Vite + TypeScript SPA
│   └── chapter-n/            ← Future projects
├── index.html                ← Hub entry point
├── package.json              ← Hub dependencies & build script
├── vite.config.js            ← Hub Vite config (base: '/learning/')
├── instructions.md           ← System-level rules for agents
├── .agent/                   ← Agent skills & workflows
│   ├── skills/               ← Reusable skill definitions
│   └── workflows/            ← Slash-command workflows
└── .github/workflows/        ← CI/CD pipeline (deploy.yml)
```

### Key Concepts
- The **Hub App** is a React portfolio page that links to all chapter projects.
- Each **Chapter** is a self-contained project in `apps/chapter-n/`.
- Chapters can be either **static** (plain HTML/CSS/JS) or **React SPAs** (Vite + TypeScript).
- The CI/CD pipeline builds the Hub, then scans `apps/` and builds any chapter that has a `package.json`.

---

## 2. Tech Stack Rules

### Hub App (Root)
| Concern | Technology |
|:---|:---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | JSX (JavaScript) |
| UI Library | Material UI (MUI) v5 |
| Styling | Vanilla CSS + MUI styled components |
| Fonts | Google Fonts (Inter) + Material Symbols |

### Chapter Apps — Static (e.g., Chapter 1)
| Concern | Technology |
|:---|:---|
| Structure | Plain HTML5 |
| Styling | Vanilla CSS3 (CSS Variables, Flexbox, Grid) |
| Logic | Vanilla JavaScript (ES6+) |
| No Build Tool | Files are served as-is |

### Chapter Apps — React SPA (e.g., Chapter 2+)
| Concern | Technology |
|:---|:---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Language | TypeScript (strict) |
| UI Library | Material UI (MUI) v5 |
| Routing | `react-router-dom` v6 with **HashRouter** |
| State | React Hooks (`useState`, `useEffect`) + `localStorage` |

### Critical Configuration Rules

1. **Vite Base Path** — Every nested chapter Vite config MUST use `base: './'`:
   ```typescript
   // apps/chapter-n/vite.config.ts
   export default defineConfig({
     plugins: [react()],
     base: './'
   })
   ```
   This ensures assets resolve correctly when deployed under `/learning/apps/chapter-n/`.

2. **HashRouter** — All React chapter apps MUST use `HashRouter`, NOT `BrowserRouter`:
   ```tsx
   import { HashRouter } from 'react-router-dom';
   // GitHub Pages does not support client-side routing with BrowserRouter
   ```

3. **No TailwindCSS** — Unless the user explicitly requests it. Use Vanilla CSS or MUI's `sx` prop / `styled()` API.

---

## 3. Hub Integration Pattern

When a new chapter is created, it MUST be registered in the Hub by adding an entry to the `apps` array in `src/App.jsx`:

```jsx
const apps = [
  // ... existing entries
  {
    id: 'chapter-n',
    title: 'Chapter N: Project Name',
    description: 'Brief description of the project, its purpose, and key technologies used.',
    tags: ['React', 'TypeScript', 'Glassmorphism', ...],  // tech and design tags
    path: './apps/chapter-n/index.html',
  },
];
```

### Tag Conventions
- Technology tags: `HTML`, `CSS`, `React`, `TypeScript`, `Material 3`
- Design tags: `Glassmorphism`, `Neumorphism`, `Minimalist`, etc.
- Feature tags: `RBAC`, `Responsive`, `API`, `LocalStorage`, etc.

---

## 4. Build Pipeline

### Local Development
```bash
# Preview the full Hub + built chapters (Recommended for Integration Testing)
npm run build && npm run preview

# Develop Hub only (Note: Nested React chapters will render blank when navigated to via this server)
npm run dev

# Develop specific chapter independently (React chapters)
cd apps/chapter-n && npm run dev
```

### Production Build
The root `package.json` build script chains all sub-project builds:
```json
"build": "vite build && mkdir -p dist/apps && cp -r apps/chapter-1 dist/apps/ && npm --prefix apps/chapter-2 install && npm --prefix apps/chapter-2 run build && mkdir -p dist/apps/chapter-2 && cp -r apps/chapter-2/dist/* dist/apps/chapter-2/ || true"
```

**When adding a new React chapter**, this build script MUST be updated to include the new chapter's install/build/copy steps. Follow this pattern:
```
&& npm --prefix apps/chapter-N install && npm --prefix apps/chapter-N run build && mkdir -p dist/apps/chapter-N && cp -r apps/chapter-N/dist/* dist/apps/chapter-N/
```

**Static chapters** only need a copy step:
```
&& cp -r apps/chapter-N dist/apps/
```

### CI/CD (GitHub Actions)
The `.github/workflows/deploy.yml` handles deployment to GitHub Pages automatically on push to `main`.

---

## 5. Code Quality Rules

### From `instructions.md` (System-Level)

1. **Commit & Push Policy**: NEVER automatically run `git commit` or `git push` without first obtaining explicit approval from the USER.
2. **Compilation Verification**: Always run `npm run build` after development changes to proactively detect and fix TypeScript errors or unused variables.
3. **Amending Minor Fixes**: Use `git commit --amend` and `git push --force-with-lease` for lint fixes (with user permission).

### Additional Conventions

4. **TypeScript Strictness**: Use `strict: true` in `tsconfig.json` for all React chapters.
5. **No Unused Variables**: The build will fail on unused imports/variables in TypeScript projects.
6. **Component Organization**:
   - Static projects: `css/`, `js/`, `pages/` directories
   - React projects: All components in `src/`, one component per file
7. **README Required**: Every chapter MUST have a `README.md` with: Overview, Key Features, Tech Stack, How to Run, Demo Credentials (if applicable).

---

## 6. UI Design Requirements

> **CRITICAL**: Every chapter-n app MUST follow the **UI Design System** skill (`.agent/skills/ui-design-system/SKILL.md`). Read it before starting any UI work.

Key points:
- Use a **combination of design themes** (glassmorphism + neumorphism + flat, etc.) — not a single theme
- Google Fonts are mandatory (Inter, Outfit, or Roboto)
- Dark mode is the default
- Micro-animations on all interactive elements
- Mobile-first responsive design
- Curated color palettes only — no raw named colors

---

## 7. File Templates

### Static Chapter `index.html` Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter N: Project Name</title>
  <meta name="description" content="Brief project description for SEO">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Content -->
  <script src="js/app.js"></script>
</body>
</html>
```

### React Chapter Entry Point Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter N: Project Name</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## 8. Learned Patterns

*This section is auto-maintained by the Auto-Upskill skill. New patterns discovered during development sessions are appended here.*

<!-- LEARNED_PATTERNS_START -->
<!-- LEARNED_PATTERNS_END -->

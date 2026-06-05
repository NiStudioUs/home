---
name: Chapter Scaffolding
description: Step-by-step instructions for creating a new chapter-n app in the learning repository, including project setup, Hub integration, build pipeline updates, and README generation.
---

# Chapter Scaffolding Skill

This skill provides the complete procedure for adding a new `chapter-n` project to the learning repository.

---

## Prerequisites

Before creating a new chapter, you MUST have read:
1. **Web Development Guidelines** (`.agent/skills/web-development/SKILL.md`) — for repo conventions
2. **UI Design System** (`.agent/skills/ui-design-system/SKILL.md`) — for design standards

---

## Step 1: Determine Project Type

Ask the user which type of project to create:

| Type | When to Choose | Build Tool |
|:---|:---|:---|
| **Static** | Pure HTML/CSS/JS projects, no framework needed | None (files served as-is) |
| **React SPA** | Interactive apps requiring components, routing, state | Vite + TypeScript |

---

## Step 2: Determine Next Chapter Number

Check the `apps/` directory to find the highest existing chapter number and increment by 1:
```bash
ls -d apps/chapter-* 2>/dev/null | sort -V | tail -1
```

---

## Step 3: Scaffold the Project

### Option A: Static Project

```bash
# Create directory structure
mkdir -p apps/chapter-N/{css,js,pages}

# Create entry files
touch apps/chapter-N/index.html
touch apps/chapter-N/css/style.css
touch apps/chapter-N/js/app.js
touch apps/chapter-N/README.md
```

Create `apps/chapter-N/index.html` using the static template from the Web Development skill.

Create `apps/chapter-N/css/style.css` with the design system CSS variables and base styles:
```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* Design System Variables */
:root {
  --color-bg-primary: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-accent-1: #7C3AED;
  --color-accent-2: #F43F5E;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-border: rgba(255, 255, 255, 0.1);
  --font-primary: 'Inter', system-ui, sans-serif;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --transition-default: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: var(--font-primary);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* ... then add theme-specific classes as needed per the UI Design System skill */
```

### Option B: React SPA Project

```bash
# Navigate to apps directory
cd apps

# Create with Vite (React + TypeScript template)
npm create vite@latest chapter-N -- --template react-ts

# Install dependencies
cd chapter-N
npm install

# Install MUI and supporting libraries
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

Then configure:

1. **`vite.config.ts`** — Set `base: './'`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: './'
   })
   ```

2. **Routing** — Use `HashRouter` in `src/main.tsx`:
   ```tsx
   import { HashRouter } from 'react-router-dom';

   ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
       <HashRouter>
         <App />
       </HashRouter>
     </React.StrictMode>,
   )
   ```

3. **Theme** — Set up MUI dark theme with the repo's color palette in `src/main.tsx`.

---

## Step 4: Apply Design System

Follow the **UI Design System** skill to apply the hybrid theme approach:

1. Set up CSS custom properties for the design tokens.
2. Apply Glassmorphism for navigation and cards.
3. Add Aurora/Liquid Glass background blobs for visual energy.
4. Use Flat 2.0 for form elements and data displays.
5. Apply Neumorphism for buttons/toggles where appropriate.
6. Keep text areas with Minimalist styling.
7. Apply micro-animations on all interactive elements.
8. Ensure mobile-first responsive design.

---

## Step 5: Register in Hub

Add the new chapter to the `apps` array in `/src/App.jsx`:

```jsx
{
  id: 'chapter-N',
  title: 'Chapter N: Project Title',
  description: 'Description of what this project does and what it teaches.',
  tags: ['Tech1', 'Tech2', 'DesignStyle1'],
  path: './apps/chapter-N/index.html',
},
```

---

## Step 6: Update Build Script

Edit the root `package.json` build script to include the new chapter.

**For a React chapter**, append to the build script:
```
&& npm --prefix apps/chapter-N install && npm --prefix apps/chapter-N run build && mkdir -p dist/apps/chapter-N && cp -r apps/chapter-N/dist/* dist/apps/chapter-N/
```

**For a static chapter**, append:
```
&& cp -r apps/chapter-N dist/apps/
```

---

## Step 7: Create README

Create `apps/chapter-N/README.md` using this template:

```markdown
# Chapter N: Project Title

## Overview
Brief description of the project's purpose and learning objectives.

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Tech Stack
- **Framework**: React 18 / Static HTML
- **Build Tool**: Vite 5 / None
- **Styling**: Vanilla CSS + MUI
- **Language**: TypeScript / JavaScript

## Design Philosophy
Describe the design themes used (e.g., "Hybrid approach combining Glassmorphism cards,
Neumorphic buttons, and Minimalist typography with an Aurora background").

## How to Run Locally
1. From the repo root: `npm run dev`
2. Or navigate to `apps/chapter-N/` and run `npm run dev`

## Demo Credentials (if applicable)
- **Username**: `demo`
- **Password**: `demo`
```

---

## Step 8: Verify

1. **Build Check**: Run `npm run build` from the repo root
2. **Dev Server**: Run `npm run dev` and verify the Hub shows the new chapter card
3. **Navigation**: Click the new chapter card and verify it loads correctly
4. **Responsiveness**: Test at mobile (375px), tablet (768px), and desktop (1200px+) widths
5. **Design Quality**: Verify the UI meets the Design System mandatory rules

---

## Checklist

Use this checklist when creating a new chapter:

- [ ] Determined project type (static or React)
- [ ] Determined next chapter number
- [ ] Scaffolded project directory and files
- [ ] Applied design system (hybrid theme approach)
- [ ] Registered in Hub (`src/App.jsx`)
- [ ] Updated root build script (`package.json`)
- [ ] Created `README.md`
- [ ] Ran `npm run build` — passes
- [ ] Ran dev server — Hub shows new chapter
- [ ] Verified responsive design
- [ ] Verified design quality meets standards

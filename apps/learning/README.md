# Learning Repository

Welcome to my central Learning Hub! This repository contains various web development projects, experiments, and courses I am working through. It consists of a top-level React "Hub" portfolio and multiple individual projects nested inside the `apps` directory.

**GitHub Page (Live Hub)**: [https://nistudious.github.io/learning/](https://nistudious.github.io/learning/)

---

## 🏗️ Structure & Architecture

```text
learning-repo/
├── apps/                 # All individual projects and chapters
│   ├── chapter-1/        # Static HTML/CSS project ("KS Foodie")
│   ├── chapter-2/        # React HR Portal (Vite + TypeScript + Material 3)
│   ├── chapter-3/        # URide (Glassmorphism + Leaflet)
│   └── chapter-4/        # RecipeVerse (Warm Brutalism + Mock API)
├── src/                  # Source code for the top-level Hub Portfolio App
├── .agent/               # Agent skills, workflows, and design system
│   ├── skills/           # Reusable skill definitions
│   │   ├── ui-design-system/   # 6-theme design catalog & mandatory rules
│   │   ├── web-development/    # Repo conventions & tech stack rules
│   │   ├── chapter-scaffolding/ # How to create a new chapter-n app
│   │   └── auto-upskill/       # Self-learning from conversations
│   └── workflows/        # Slash-command workflows (/new-chapter, /build)
├── package.json          # Dependencies for the Hub App
├── index.html            # Entry point for the Hub App
└── .github/workflows/    # CI/CD instructions to auto-deploy everything to GitHub Pages
```

---

## 🚀 Setup & Installation (Linux)

To work on this project locally, you need [Node.js](https://nodejs.org/) installed on your system. 

**1. Install Node.js (Ubuntu/Debian)**
If you haven't installed Node.js yet, you can do so using the NodeSource repository:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Install Hub Dependencies**
Once Node.js is installed, clone the repo and install the dependencies for the main Hub app:
```bash
cd learning
npm install
```

---

## 🛠️ Running and Building the Hub

**To start the local development server for the Hub:**
```bash
npm run dev
```
*(This will open a local server, usually at `http://localhost:5173`, where you can view the Hub.)*

**To build the Hub for production:**
```bash
npm run build
```

**To preview the production build locally:**
```bash
npm run preview
```

---

## ➕ How to Create a New Project

The deployment script automatically handles both **Static Projects** and **React Projects**. Use the `/new-chapter` agent workflow to scaffold a new chapter with all design system integration and Hub registration done automatically.

### 📦 Available Projects

- **[Chapter 1: KS Foodie](./apps/chapter-1/README.md)**: A responsive front-end food ordering app with Glassmorphism effects, infinite scroll, and API integration.
- **[Chapter 2: HR Portal](./apps/chapter-2/README.md)**: A fully-fledged React 18 SPA utilizing Material UI for HR and Employee data management.
- **[Chapter 3: URide](./apps/chapter-3/README.md)**: A premium taxi booking application featuring interactive map integration with Leaflet and glassmorphism UI.
- **[Chapter 4: RecipeVerse](./apps/chapter-4/README.md)**: A full-featured recipe discovery app with 20 rich recipes, live search, and a bold Warm Brutalism design.

*For in-depth architectural breakdowns, check the walkthroughs in each chapter folder!*

### 🛠️ Creating New Projects

### 1. Static HTML Projects (e.g., `chapter-1`)
If your project is just basic HTML, CSS, and JS files, simply create a folder inside `apps/`:
```bash
mkdir -p apps/chapter-2
touch apps/chapter-2/index.html
```
*Note: Static projects don't need a `package.json`. The deployment action will just copy your files directly.*

### Option B: Creating a React Project (e.g., `chapter-3`)
If your project needs to be built with React and Vite, generate it directly into the `apps` folder using Vite's template generator.

**1. Create the project:**
```bash
cd apps
npm create vite@latest chapter-3 -- --template react
cd chapter-3
```

**2. Install its dependencies:**
```bash
npm install
```

**3. Run the nested project locally:**
```bash
npm run dev
```

*When creating a React project this way, Vite automatically generates the optimal `package.json` for you. A standard generated `package.json` will look like this:*
```json
{
  "name": "chapter-3",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.0"
  }
}
```

---

## 🎨 Design System

Every chapter-n app follows a rich, modern design system with **6 built-in themes** that can be mixed and matched:

| Theme | Vibe | Key Technique |
|:---|:---|:---|
| **Glassmorphism** | Futuristic / Clean | `backdrop-filter: blur()` + `rgba` |
| **Neumorphism** | Tactile / Soft | Dual `box-shadow` (light & dark) |
| **Liquid Glass** | Energetic / Luxury | Animated mesh gradients + deep blur |
| **Minimalism** | Sophisticated | Borders, typography, negative space |
| **Brutalism** | Bold / Edgy | Hard `box-shadow`, neon colors |
| **Flat 2.0** | Professional | Subtle shadows, solid color blocks |

**Default approach**: Each chapter naturally blends multiple themes — Glassmorphism for navigation, Flat 2.0 for forms, Neumorphism for buttons, Aurora backgrounds for visual energy, and Minimalist typography throughout.

Full design documentation: [`.agent/skills/ui-design-system/SKILL.md`](.agent/skills/ui-design-system/SKILL.md)

---

## 🤖 Agent Skills

This repository includes agent skills under `.agent/` that encode development conventions and design standards:

| Skill | Purpose |
|:---|:---|
| **UI Design System** | 6-theme catalog, mandatory design rules, CSS component recipes |
| **Web Development** | Repo architecture, tech stack, build pipeline, code quality |
| **Chapter Scaffolding** | Step-by-step guide to create a new chapter-n project |
| **Auto-Upskill** | Self-learning from user conversations to improve skills |

**Workflows** (slash commands):
- `/new-chapter` — Scaffold a new chapter project with full design and Hub integration
- `/build-and-preview` — Build and preview the entire repository locally

---

## 🌐 Automatic Deployment

You do not need to deploy manually! 

This repository is configured with a GitHub Actions workflow (`.github/workflows/deploy.yml`). 
Whenever you commit and push your code to the `main` branch, the workflow will automatically:
1. Build the root Hub application.
2. Scan the `apps/` directory.
3. Automatically run `npm install` and `npm run build` for any apps that have a `package.json` inside them.
4. Securely bundle static folders and generated build outputs together and host them on GitHub Pages.
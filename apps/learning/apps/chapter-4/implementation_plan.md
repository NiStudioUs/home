# Implementation Plan: Chapter 4 — RecipeVerse

## Overview

Build **Chapter 4: RecipeVerse**, a Recipe discovery app built with React, TypeScript, and Vite. The app will leverage a mock API (modeled on `apps/chapter-1/js/api.js`) that generates random, rich meal recipes locally — no network calls required. Unlike Chapter 2 (Minimalist HR Portal) and Chapter 3 (Glassmorphism/Aurora Taxi), this app uses a warm, earthy **Brutalist + Flat 2.0** hybrid theme making it bold and distinctly different.

---

## Design Theme: "Warm Brutalism" (Distinct from Ch.2 & Ch.3)

| Chapter | Theme | Palette |
|---|---|---|
| Ch.2 (HR Portal) | Minimalism + Flat 2.0 | Purple/Rose on deep navy |
| Ch.3 (URide) | Glassmorphism + Aurora | Yellow/Dark, animated blobs |
| **Ch.4 (RecipeVerse)** | **Neo-Brutalism + Flat 2.0** | **Warm amber/cream/terracotta on off-white + dark mode** |

### Theme Details
- **Primary Palette**: Warm amber (`#F59E0B`), terracotta (`#C2410C`), cream (`#FEF3C7`), charcoal (`#1C1917`)  
- **Font**: `Playfair Display` (headings — editorial serif) + `Inter` (body)
- **Background**: Solid `#FAFAF8` (light), `#1C1917` (dark mode)
- **Cards**: Hard shadows (`box-shadow: 6px 6px 0 #1C1917`), thick borders, slightly rotated tags
- **Buttons**: Brutalist — bold, offset box shadows, uppercase labels
- **Accent**: Splashes of lime green (`#84CC16`) for category badges  
- **Animations**: Slide-in card reveal instead of blur/fade

---

## Pages & Screens

### 1. `RecipeListPage` (`/`)
- **Hero Section**: Large header with animated text "Discover what to cook today."
- **Search Bar**: Flat 2.0 styled with live filtering (client-side, no debounce needed with mocked data)
- **Filter Chips**: Category (Breakfast, Lunch, Dinner, Dessert, etc.) + Cuisine (Indian, Italian, Japanese, Mexican, etc.) with Brutalist active states
- **Recipe Grid**: Responsive 3-col → 2-col → 1-col. Each card shows:
  - Recipe image (generated using a placeholder/illustration style)
  - Title, category chip, cuisine flag-like badge
  - Cook time, difficulty, rating chips
  - Brutalist-style bold "View Recipe" button

### 2. `RecipeDetailPage` (`/recipe/:id`)
- **Breadcrumb Nav**: Home > {category} > {title}
- **Hero Image** (full-width)
- **Recipe MetaBar**: Prep time, cook time, servings, difficulty — in a Brutalist card strip
- **Ingredients Section**: Neumorphic checklist cards (tick off as you go)
- **Instructions Section**: Step-by-step numbered Minimalist blocks with a sticky "Current Step" progress bar
- **Nutrition Card**: Glassmorphism mini card with calories, protein, carbs, fat
- **Tags / Similar Recipes**: Tag chips linking back to filtered list

### 3. `FavouritesPage` (`/favourites`)
- Same card grid, but filtered to `localStorage`-persisted favourites
- Empty state with a witty illustration/message

### 4. `Layout` (Common)
- **Navbar**: Glassmorphism bar — Logo (RecipeVerse), nav links (Explore, Favourites), search icon
- Dark/Light mode toggle persisted in `localStorage`

---

## Mock API: `apps/chapter-4/src/data/mockApi.ts`

Based on `chapter-1/js/api.js` structure but generates data locally:

```typescript
// Pattern: Same function signatures as chapter-1 api.js, all local/synchronous
export async function fetchRandomRecipes(count = 12): Promise<Recipe[]>
export async function fetchRecipeById(id: string): Promise<Recipe | null>
export async function searchRecipes(query: string): Promise<Recipe[]>
export async function filterRecipesByCategory(cat: string): Promise<Recipe[]>
export async function filterRecipesByCuisine(cuisine: string): Promise<Recipe[]>
```

Mock data will include **20 rich, fully detailed recipes** across categories (Breakfast, Lunch, Dinner, Dessert, Snack) and cuisines (Indian, Italian, Japanese, Mexican, Mediterranean, American), each with:
- Full ingredient list (8–14 ingredients with measurements)
- Step-by-step instructions (5–8 steps)
- Estimated nutrition info
- Cook time, prep time, difficulty, servings, rating

---

## File Structure

```
apps/chapter-4/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
├── implementation_plan.md        ← copied here
├── docs/
│   └── recipe-app.pdf            ← moved project doc
└── src/
    ├── main.tsx                  ← HashRouter, Theme provider
    ├── App.tsx                   ← Routes
    ├── index.css                 ← Brutalism CSS, design tokens
    ├── theme.ts                  ← MUI theme (warm Brutalism)
    ├── data/
    │   ├── mockApi.ts            ← All API functions (local)
    │   └── recipes.ts            ← 20 hardcoded recipe objects
    ├── types/
    │   └── recipe.ts             ← Recipe TypeScript interface
    ├── components/
    │   ├── Layout.tsx            ← Navbar + Footer
    │   ├── RecipeCard.tsx        ← Grid card component
    │   ├── SearchBar.tsx         ← Search input with icon
    │   ├── FilterChips.tsx       ← Category + Cuisine filter chips
    │   └── IngredientChecklist.tsx ← Interactive checklist
    └── pages/
        ├── RecipeListPage.tsx
        ├── RecipeDetailPage.tsx
        └── FavouritesPage.tsx
```

---

## Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11",
    "@emotion/styled": "^11",
    "@mui/material": "^5",
    "@mui/icons-material": "^5",
    "framer-motion": "^12",
    "react-router-dom": "^6"
  }
}
```

---

## Hub & Build Pipeline Updates

- **`src/App.jsx`**: Add Chapter 4 card:
  ```
  { id: 'chapter-4', title: 'Chapter 4: RecipeVerse', description: '...', tags: ['React', 'TypeScript', 'Neo-Brutalism', 'Mock API'], path: './apps/chapter-4/index.html' }
  ```
- **`package.json`**: Append `&& npm --prefix apps/chapter-4 install && npm --prefix apps/chapter-4 run build && mkdir -p dist/apps/chapter-4 && cp -r apps/chapter-4/dist/* dist/apps/chapter-4/`

---

## Documentation

- Move PDF `file:///home/karthik/Downloads/1753085427_02_developing_a_recipe_app_using_generative_aiassisted_code_generation.pdf` → `apps/chapter-4/docs/recipe-app.pdf`
- Copy this `implementation_plan.md` → `apps/chapter-4/implementation_plan.md`

---

## Verification Plan

1. Run `npm run build` from repo root — should build all 4 chapters cleanly
2. Run `npm run preview` — Hub should show 4 chapter cards
3. Navigate to Chapter 4; verify:
   - Recipe grid loads with all 20 recipes
   - Search filters recipes live
   - Category/Cuisine filter chips work
   - Clicking a card opens the detail page
   - Ingredients can be checked off
   - Favouriting a recipe persists across refresh
   - Dark/Light mode toggle works
4. Verify distinct Brutalism theme (no aurora blobs, hard borders, warm palette)

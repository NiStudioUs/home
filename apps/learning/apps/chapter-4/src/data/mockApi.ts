/**
 * RecipeVerse - Mock API
 * Mirrors the function signatures from apps/chapter-1/js/api.js
 * All data is served locally from the recipes.ts dataset — no network calls.
 */

import type { Recipe } from '../types/recipe';
import { RECIPES } from './recipes';

/** Simulates async API behaviour with a small delay */
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

/** Shuffle helper using Fisher-Yates algorithm */
function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Fetches a list of random recipes.
 * @param count Number of recipes to return (default 12)
 */
export async function fetchRandomRecipes(count = 12): Promise<Recipe[]> {
  await delay();
  return shuffled(RECIPES).slice(0, count);
}

/**
 * Fetches all recipes.
 */
export async function fetchAllRecipes(): Promise<Recipe[]> {
  await delay(100);
  return RECIPES;
}

/**
 * Fetches a single recipe by its ID.
 * @param id Recipe ID
 */
export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  await delay(150);
  return RECIPES.find(r => r.id === id) ?? null;
}

/**
 * Searches recipes by name, tags, cuisine, or category.
 * @param query Search query string
 */
export async function searchRecipes(query: string): Promise<Recipe[]> {
  if (!query.trim()) return RECIPES;
  await delay(120);
  const q = query.toLowerCase();
  return RECIPES.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.tags.some(t => t.toLowerCase().includes(q)) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q)
  );
}

/**
 * Filters recipes by category (e.g., "Dinner", "Breakfast")
 * @param category Category name — pass '' for all
 */
export async function filterRecipesByCategory(category: string): Promise<Recipe[]> {
  await delay(100);
  if (!category) return RECIPES;
  return RECIPES.filter(r => r.category === category);
}

/**
 * Filters recipes by cuisine (e.g., "Indian", "Italian")
 * @param cuisine Cuisine name — pass '' for all
 */
export async function filterRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  await delay(100);
  if (!cuisine) return RECIPES;
  return RECIPES.filter(r => r.cuisine === cuisine);
}

/**
 * Returns a single random recipe.
 */
export async function fetchRandomRecipe(): Promise<Recipe> {
  await delay();
  return RECIPES[Math.floor(Math.random() * RECIPES.length)];
}

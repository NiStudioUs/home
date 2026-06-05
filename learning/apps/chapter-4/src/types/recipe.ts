export interface Ingredient {
  name: string;
  amount: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  ratingCount: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: NutritionInfo;
}

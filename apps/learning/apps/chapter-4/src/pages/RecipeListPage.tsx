import { useState, useEffect, useMemo } from 'react';
import { Container, Grid, Box, Typography, CircularProgress, Divider } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import { fetchAllRecipes } from '../data/mockApi';
import type { Recipe } from '../types/recipe';

interface RecipeListPageProps {
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}

export default function RecipeListPage({ favourites, onToggleFavourite }: RecipeListPageProps) {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');

  useEffect(() => {
    fetchAllRecipes().then(data => {
      setAllRecipes(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let results = allRecipes;
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) results = results.filter(r => r.category === selectedCategory);
    if (selectedCuisine) results = results.filter(r => r.cuisine === selectedCuisine);
    return results;
  }, [allRecipes, search, selectedCategory, selectedCuisine]);

  return (
    <Box>
      {/* Hero */}
      <Box
        className="hero-accent"
        sx={{ bgcolor: 'background.paper', borderBottom: '2px solid', borderColor: 'text.primary', py: { xs: 6, md: 10 } }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 700 }}>
            <Typography
              variant="overline"
              fontWeight={800}
              letterSpacing={2}
              color="primary.main"
              sx={{ mb: 1, display: 'block' }}
            >
              20+ recipes · 8 cuisines
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: '2.4rem', md: '3.8rem' }, lineHeight: 1.1, mb: 2 }}
            >
              Discover what to{' '}
              <Box component="span" sx={{ color: 'primary.main', display: 'inline' }}>
                cook today.
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 400, maxWidth: 560, mb: 4 }}>
              Handpicked recipes from around the world — from quick weekday dinners to slow weekend indulgences.
            </Typography>

            <SearchBar value={search} onChange={setSearch} />
          </Box>
        </Container>
      </Box>

      {/* Filter & Results */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <FilterChips
          selectedCategory={selectedCategory}
          selectedCuisine={selectedCuisine}
          onCategoryChange={setSelectedCategory}
          onCuisineChange={setSelectedCuisine}
        />

        <Divider sx={{ my: 4, borderColor: 'text.primary', borderWidth: '1.5px' }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}>
              No recipes found 🍽️
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search or removing a filter.
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 3, letterSpacing: '0.04em' }}>
              {filtered.length} recipe{filtered.length !== 1 ? 's' : ''} found
            </Typography>
            <Grid container spacing={3}>
              {filtered.map((recipe, i) => (
                <Grid item xs={12} sm={6} md={4} key={recipe.id}
                  sx={{ animation: `slideInUp 0.5s ease-out ${i * 0.05}s both` }}
                >
                  <RecipeCard
                    recipe={recipe}
                    isFavourited={favourites.has(recipe.id)}
                    onToggleFavourite={onToggleFavourite}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}

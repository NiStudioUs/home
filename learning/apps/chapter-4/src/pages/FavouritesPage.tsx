import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { RECIPES } from '../data/recipes';
import type { Recipe } from '../types/recipe';

interface FavouritesPageProps {
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}

export default function FavouritesPage({ favourites, onToggleFavourite }: FavouritesPageProps) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipes(RECIPES.filter(r => favourites.has(r.id)));
  }, [favourites]);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
        <FavoriteIcon sx={{ fontSize: 40, color: 'error.main' }} />
        <Box>
          <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", serif', lineHeight: 1.1 }}>
            My Favourites
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mt: 0.5 }}>
            {recipes.length} saved recipe{recipes.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </Box>

      {recipes.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center', py: 12,
            border: '2px dashed', borderColor: 'text.secondary',
            borderRadius: '4px',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>🍽️</Typography>
          <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', mb: 1 }}>
            Nothing saved yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Tap the ♡ on any recipe to save it here for later.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>
            Explore Recipes
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {recipes.map((recipe, i) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}
              sx={{ animation: `slideInUp 0.5s ease-out ${i * 0.05}s both` }}
            >
              <RecipeCard
                recipe={recipe}
                isFavourited={true}
                onToggleFavourite={onToggleFavourite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

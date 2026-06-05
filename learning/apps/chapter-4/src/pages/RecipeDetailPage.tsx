import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Grid, Box, Typography, Chip, Divider, Button, Card, CardContent,
  CircularProgress, LinearProgress, IconButton, Tooltip, Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Rating } from '@mui/material';
import { fetchRecipeById } from '../data/mockApi';
import type { Recipe } from '../types/recipe';
import IngredientChecklist from '../components/IngredientChecklist';

interface RecipeDetailPageProps {
  favourites: Set<string>;
  onToggleFavourite: (id: string) => void;
}

export default function RecipeDetailPage({ favourites, onToggleFavourite }: RecipeDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchRecipeById(id).then(data => {
      setRecipe(data);
      setLoading(false);
      setCurrentStep(0);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 16 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}>Recipe not found</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Back to Explore</Button>
      </Container>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;
  const progress = ((currentStep + 1) / recipe.instructions.length) * 100;
  const isFav = favourites.has(recipe.id);

  return (
    <Box>
      {/* Breadcrumb */}
      <Box sx={{ borderBottom: '2px solid', borderColor: 'text.primary', bgcolor: 'background.paper', py: 1.5 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ fontWeight: 700, fontSize: '0.8rem', p: 0.5, minWidth: 0, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
            >
              Back
            </Button>
            <Typography variant="body2" color="text.secondary">/</Typography>
            <Typography variant="body2" color="text.secondary">{recipe.category}</Typography>
            <Typography variant="body2" color="text.secondary">/</Typography>
            <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 200 }}>{recipe.title}</Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero Image */}
      <Box sx={{ position: 'relative', height: { xs: 260, md: 420 }, overflow: 'hidden', borderBottom: '2px solid', borderColor: 'text.primary' }}>
        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(28,25,23,0.85) 0%, transparent 60%)',
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: { xs: 3, md: 6 }, pb: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
            <Chip label={recipe.category} color="primary" size="small" sx={{ fontWeight: 700 }} />
            <Chip label={recipe.cuisine} color="secondary" size="small" sx={{ fontWeight: 700 }} />
            <Chip
              label={recipe.difficulty}
              size="small"
              sx={{ fontWeight: 700, bgcolor: '#84CC16', color: '#1C1917' }}
            />
          </Box>
          <Typography
            variant="h2"
            sx={{ color: '#FAFAF9', fontFamily: '"Playfair Display", serif', fontSize: { xs: '1.8rem', md: '3rem' }, lineHeight: 1.15 }}
          >
            {recipe.title}
          </Typography>
        </Box>
        {/* Fav button */}
        <Tooltip title={isFav ? 'Remove from favourites' : 'Add to favourites'}>
          <IconButton
            onClick={() => onToggleFavourite(recipe.id)}
            sx={{
              position: 'absolute', top: 16, right: 16,
              bgcolor: isFav ? 'error.main' : 'rgba(250,250,248,0.9)',
              color: isFav ? '#FAFAF9' : 'text.primary',
              border: '2px solid',
              borderColor: 'text.primary',
              '&:hover': { bgcolor: isFav ? '#B91C1C' : 'rgba(250,250,248,1)' },
            }}
          >
            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Meta strip */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex', flexWrap: 'wrap', gap: 0,
            border: '2px solid', borderColor: 'text.primary',
            overflow: 'hidden', borderRadius: '4px', mb: 5,
          }}
        >
          {[
            { icon: <AccessTimeIcon fontSize="small" />, label: 'Prep', value: `${recipe.prepTime} min` },
            { icon: <AccessTimeIcon fontSize="small" />, label: 'Cook', value: `${recipe.cookTime} min` },
            { icon: <AccessTimeIcon fontSize="small" />, label: 'Total', value: `${totalTime} min` },
            { icon: <PeopleIcon fontSize="small" />, label: 'Serves', value: `${recipe.servings}` },
            { icon: <LocalFireDepartmentIcon fontSize="small" />, label: 'Calories', value: recipe.nutrition.calories.toString() },
          ].map((item, i) => (
            <Box
              key={i}
              sx={{
                flex: '1 1 100px',
                py: 2, px: 2.5,
                textAlign: 'center',
                borderRight: i < 4 ? '2px solid' : 'none',
                borderColor: 'text.primary',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
              }}
            >
              <Box sx={{ color: 'primary.main' }}>{item.icon}</Box>
              <Typography variant="caption" color="text.secondary" fontWeight={700} textTransform="uppercase" letterSpacing={1}>
                {item.label}
              </Typography>
              <Typography variant="body1" fontWeight={800}>{item.value}</Typography>
            </Box>
          ))}
        </Paper>

        <Grid container spacing={5}>
          {/* Left column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif', mb: 2 }}>
              Ingredients
            </Typography>
            <IngredientChecklist ingredients={recipe.ingredients} />

            {/* Nutrition card */}
            <Box sx={{ mt: 4, border: '2px solid', borderColor: 'text.primary', borderRadius: '4px', p: 2.5, boxShadow: '4px 4px 0 ', boxShadowColor: 'text.primary' }}>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Nutrition
              </Typography>
              {[
                { label: 'Protein', value: recipe.nutrition.protein },
                { label: 'Carbs', value: recipe.nutrition.carbs },
                { label: 'Fat', value: recipe.nutrition.fat },
                { label: 'Fiber', value: recipe.nutrition.fiber },
              ].map(n => (
                <Box key={n.label} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', py: 1 }}>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>{n.label}</Typography>
                  <Typography variant="body2" fontWeight={800}>{n.value}</Typography>
                </Box>
              ))}
            </Box>

            {/* Rating */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={recipe.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {recipe.rating} ({recipe.ratingCount.toLocaleString()} reviews)
              </Typography>
            </Box>

            {/* Tags */}
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {recipe.tags.map(tag => (
                <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }} />
              ))}
            </Box>
          </Grid>

          {/* Right column: Instructions */}
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ fontFamily: '"Playfair Display", serif' }}>
                Instructions
              </Typography>
              <Typography variant="body2" fontWeight={700} color="primary.main">
                Step {currentStep + 1} of {recipe.instructions.length}
              </Typography>
            </Box>

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                mb: 3,
                height: 8,
                borderRadius: 0,
                border: '1.5px solid',
                borderColor: 'text.primary',
                bgcolor: 'background.default',
                '& .MuiLinearProgress-bar': { borderRadius: 0, bgcolor: 'primary.main' },
              }}
            />

            {/* Steps */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recipe.instructions.map((step, i) => (
                <Card
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  sx={{
                    cursor: 'pointer',
                    opacity: i > currentStep ? 0.5 : 1,
                    border: i === currentStep ? '2px solid' : '2px solid',
                    borderColor: i === currentStep ? 'primary.main' : 'text.primary',
                    boxShadow: i === currentStep ? '4px 4px 0' : '2px 2px 0',
                    boxShadowColor: i === currentStep ? 'primary.main' : 'text.primary',
                    bgcolor: i === currentStep ? 'rgba(194, 65, 12, 0.06)' : 'background.paper',
                    transition: 'all 0.2s',
                  }}
                >
                  <CardContent sx={{ display: 'flex', gap: 2, py: '16px !important' }}>
                    <Box
                      sx={{
                        width: 32, height: 32, flexShrink: 0,
                        bgcolor: i <= currentStep ? 'primary.main' : 'background.default',
                        color: i <= currentStep ? '#FAFAF9' : 'text.secondary',
                        border: '2px solid', borderColor: 'text.primary',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: '0.8rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {i + 1}
                    </Box>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, fontWeight: i === currentStep ? 500 : 400 }}>
                      {step}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Navigation */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(s => s - 1)}
              >
                ← Previous
              </Button>
              <Button
                variant="contained"
                disabled={currentStep === recipe.instructions.length - 1}
                onClick={() => setCurrentStep(s => s + 1)}
              >
                Next Step →
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

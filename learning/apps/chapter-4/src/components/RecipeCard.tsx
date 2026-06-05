import {
  Card, CardMedia, CardContent, CardActions, Box, Typography, Chip, IconButton, Tooltip, Rating
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import type { Recipe } from '../types/recipe';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  isFavourited: boolean;
  onToggleFavourite: (id: string) => void;
}

const DIFFICULTY_COLOR: Record<string, 'success' | 'warning' | 'error'> = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'error',
};

export default function RecipeCard({ recipe, isFavourited, onToggleFavourite }: RecipeCardProps) {
  const navigate = useNavigate();
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <motion.div whileHover={{ y: -2 }} style={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'visible',
        }}
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        {/* Cuisine badge — brutalist offset tab */}
        <Box
          sx={{
            position: 'absolute',
            top: -2,
            right: 16,
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            px: 1.5,
            py: 0.25,
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            border: '1.5px solid',
            borderColor: 'text.primary',
            borderTop: 'none',
            zIndex: 2,
          }}
        >
          {recipe.cuisine}
        </Box>

        <CardMedia
          component="img"
          height="200"
          image={recipe.image}
          alt={recipe.title}
          sx={{ borderBottom: '2px solid', borderColor: 'text.primary', objectFit: 'cover' }}
        />

        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
            <Chip
              label={recipe.category}
              size="small"
              variant="outlined"
              color="primary"
              sx={{ fontSize: '0.68rem' }}
            />
            <Chip
              label={recipe.difficulty}
              size="small"
              color={DIFFICULTY_COLOR[recipe.difficulty]}
              sx={{ fontSize: '0.68rem' }}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, lineHeight: 1.25, mb: 1 }}
          >
            {recipe.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.55,
              mb: 2,
            }}
          >
            {recipe.description}
          </Typography>

          {/* Meta row */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {totalTime} min
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PeopleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {recipe.servings} servings
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={recipe.rating} precision={0.1} readOnly size="small" />
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              ({recipe.ratingCount.toLocaleString()})
            </Typography>
          </Box>
          <Tooltip title={isFavourited ? 'Remove from favourites' : 'Add to favourites'}>
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); onToggleFavourite(recipe.id); }}
              sx={{ color: isFavourited ? 'error.main' : 'text.secondary' }}
            >
              {isFavourited ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </motion.div>
  );
}

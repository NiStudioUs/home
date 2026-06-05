import { Box, Chip, Typography } from '@mui/material';
import { CATEGORIES, CUISINES } from '../data/recipes';

interface FilterChipsProps {
  selectedCategory: string;
  selectedCuisine: string;
  onCategoryChange: (c: string) => void;
  onCuisineChange: (c: string) => void;
}

export default function FilterChips({
  selectedCategory, selectedCuisine,
  onCategoryChange, onCuisineChange,
}: FilterChipsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <Typography variant="overline" fontWeight={700} letterSpacing={1.5} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Category
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['', ...CATEGORIES].map(cat => (
            <Chip
              key={cat || 'all'}
              label={cat || 'All'}
              clickable
              onClick={() => onCategoryChange(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                borderWidth: 2,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="overline" fontWeight={700} letterSpacing={1.5} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Cuisine
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {['', ...CUISINES].map(cuisine => (
            <Chip
              key={cuisine || 'all'}
              label={cuisine || 'All'}
              clickable
              onClick={() => onCuisineChange(cuisine)}
              color={selectedCuisine === cuisine ? 'secondary' : 'default'}
              variant={selectedCuisine === cuisine ? 'filled' : 'outlined'}
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                borderWidth: 2,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

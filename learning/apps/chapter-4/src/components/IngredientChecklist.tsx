import { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Typography, Box } from '@mui/material';
import type { Ingredient } from '../types/recipe';

interface IngredientChecklistProps {
  ingredients: Ingredient[];
}

export default function IngredientChecklist({ ingredients }: IngredientChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Box>
      <Typography variant="overline" fontWeight={700} letterSpacing={1.5} color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        {checked.size} of {ingredients.length} gathered
      </Typography>
      <List dense disablePadding>
        {ingredients.map((ing, i) => (
          <ListItem
            key={i}
            onClick={() => toggle(i)}
            sx={{
              px: 1,
              borderRadius: '4px',
              cursor: 'pointer',
              mb: 0.5,
              border: '1.5px solid',
              borderColor: checked.has(i) ? 'success.main' : 'transparent',
              bgcolor: checked.has(i) ? 'rgba(132, 204, 22, 0.08)' : 'transparent',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Checkbox
                edge="start"
                checked={checked.has(i)}
                tabIndex={-1}
                disableRipple
                size="small"
                sx={{ p: 0, color: 'text.secondary', '&.Mui-checked': { color: 'success.main' } }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ textDecoration: checked.has(i) ? 'line-through' : 'none', opacity: checked.has(i) ? 0.5 : 1 }}
                  >
                    {ing.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                    {ing.amount}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

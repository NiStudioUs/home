import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box sx={{ maxWidth: 600, width: '100%', mx: 'auto' }}>
      <TextField
        fullWidth
        placeholder="Search recipes, cuisines, ingredients..."
        value={value}
        onChange={e => onChange(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => onChange('')} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
          sx: {
            fontWeight: 600,
            '& fieldset': { borderWidth: 2, borderColor: 'text.primary', borderRadius: '4px' },
            '&:hover fieldset': { borderColor: 'primary.main !important' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main !important', borderWidth: 2 },
          },
        }}
        sx={{ '& .MuiInputBase-root': { bgcolor: 'background.paper' } }}
      />
    </Box>
  );
}

import { createTheme } from '@mui/material/styles';

// Warm Brutalism theme — distinct from Chapter 2 (Minimalism) and Chapter 3 (Aurora/Glass)
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#C2410C', contrastText: '#FFFFFF' },    // Terracotta
    secondary: { main: '#F59E0B', contrastText: '#1C1917' },   // Warm amber
    background: { default: '#FAFAF8', paper: '#FFFFFF' },
    text: { primary: '#1C1917', secondary: '#57534E' },
    success: { main: '#84CC16' },   // Lime for badges
    error: { main: '#DC2626' },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", system-ui, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900 },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800 },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Inter", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 4 },  // Slightly boxy for brutalism feel
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          borderRadius: 4,
          boxShadow: '3px 3px 0 #1C1917',
          transition: 'all 0.15s ease',
          '&:hover': {
            boxShadow: '5px 5px 0 #1C1917',
            transform: 'translate(-1px, -1px)',
          },
          '&:active': {
            boxShadow: '0px 0px 0 #1C1917',
            transform: 'translate(3px, 3px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#C2410C',
          border: '2px solid #1C1917',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#9A3412' },
        },
        containedSecondary: {
          backgroundColor: '#F59E0B',
          border: '2px solid #1C1917',
          color: '#1C1917',
          '&:hover': { backgroundColor: '#D97706' },
        },
        outlined: {
          border: '2px solid #1C1917',
          '&:hover': { border: '2px solid #1C1917' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #1C1917',
          boxShadow: '4px 4px 0 #1C1917',
          borderRadius: 4,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '7px 7px 0 #1C1917',
            transform: 'translate(-2px, -2px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          border: '1.5px solid currentColor',
          borderRadius: 4,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FB923C', contrastText: '#1C1917' },    // Light orange
    secondary: { main: '#F59E0B', contrastText: '#1C1917' },
    background: { default: '#1C1917', paper: '#292524' },
    text: { primary: '#FAFAF9', secondary: '#A8A29E' },
    success: { main: '#84CC16' },
    error: { main: '#F87171' },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", system-ui, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 900 },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800 },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h4: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h5: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600 },
    h6: { fontFamily: '"Inter", sans-serif', fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          borderRadius: 4,
          boxShadow: '3px 3px 0 rgba(250,244,217,0.5)',
          transition: 'all 0.15s ease',
          '&:hover': {
            boxShadow: '5px 5px 0 rgba(250,244,217,0.5)',
            transform: 'translate(-1px, -1px)',
          },
          '&:active': {
            boxShadow: '0px 0px 0px rgba(250,244,217,0.5)',
            transform: 'translate(3px, 3px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#FB923C',
          border: '2px solid rgba(250,250,249,0.4)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid rgba(250,244,217,0.15)',
          boxShadow: '4px 4px 0 rgba(250,244,217,0.1)',
          borderRadius: 4,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '7px 7px 0 rgba(250,244,217,0.15)',
            transform: 'translate(-2px, -2px)',
            borderColor: 'rgba(250,244,217,0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          borderRadius: 4,
        },
      },
    },
  },
});

import { useState, useMemo } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Tooltip,
  Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, Container
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  onThemeToggle: () => void;
  isDark: boolean;
}

const NAV_LINKS = [
  { label: 'Explore', path: '/' },
  { label: 'Favourites', path: '/favourites' },
];

export default function Layout({ onThemeToggle, isDark }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLight = !isDark;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: isLight ? 'rgba(250,250,248,0.90)' : 'rgba(28,25,23,0.90)',
          backdropFilter: 'blur(16px)',
          borderBottom: `2px solid ${isLight ? '#1C1917' : 'rgba(250,244,217,0.15)'}`,
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1 }}>
          {/* Logo */}
          <Box
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 900,
                color: 'primary.main',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Recipe<Box component="span" sx={{ color: 'secondary.main' }}>Verse</Box>
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mr: 2 }}>
              {NAV_LINKS.map(link => (
                <Box
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  sx={{
                    px: 2, py: 1,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderBottom: pathname === link.path ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                    color: pathname === link.path ? 'primary.main' : 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {link.label === 'Favourites' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FavoriteIcon sx={{ fontSize: 14 }} />
                      {link.label}
                    </Box>
                  ) : link.label}
                </Box>
              ))}
            </Box>
          )}

          {/* Theme toggle */}
          <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={onThemeToggle} sx={{ color: 'text.primary' }}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.primary', ml: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, mb: 2, color: 'primary.main' }}>
            Menu
          </Typography>
          <List>
            {NAV_LINKS.map(link => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  onClick={() => { navigate(link.path); setDrawerOpen(false); }}
                  sx={{ fontWeight: 700 }}
                >
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.9rem' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: `2px solid ${isLight ? '#1C1917' : 'rgba(250,244,217,0.15)'}`,
          py: 3,
          mt: 'auto',
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.04em' }}>
            © 2025 RecipeVerse — Chapter 4 · Learning Repository
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

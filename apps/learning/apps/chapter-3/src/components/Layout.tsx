import { Outlet, Link, useLocation } from 'react-router-dom';
import { Box, Container, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useState } from 'react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  { label: 'My Bookings', path: '/bookings' },
  { label: 'Book Ride', path: '/booking' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          background: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} component={Link} to="/">
              <LocalTaxiIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
              <Typography variant="h5" noWrap sx={{ fontWeight: 800, letterSpacing: '-0.05em' }}>
                URide
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    variant={item.path === '/booking' ? 'contained' : 'text'}
                    color={item.path === '/booking' ? 'primary' : 'inherit'}
                    sx={{
                      opacity: isActive && item.path !== '/booking' ? 1 : 0.8,
                      fontWeight: isActive ? 700 : 500,
                      '&:hover': { opacity: 1 }
                    }}
                  >
                    {item.label}
                  </Button>
                )
              })}
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, background: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(20px)' },
          }}
        >
          <List sx={{ pt: 4 }}>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding onClick={handleDrawerToggle}>
                <Button component={Link} to={item.path} fullWidth sx={{ justifyContent: 'flex-start', px: 3, py: 1.5, color: '#F8FAFC' }}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Box>

      <Box component="footer" sx={{ py: 6, px: 2, mt: 'auto', background: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} URide. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

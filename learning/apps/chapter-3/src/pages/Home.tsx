import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 15 }, pb: 8 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '3rem', md: '5rem' },
            background: 'linear-gradient(45deg, #F8FAFC, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            mb: 4
          }}
        >
          Go anywhere with Book_A_Taxi
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ mb: 6, fontWeight: 400, lineHeight: 1.6 }}
        >
          Request a ride, hop in, and go. Premium service, comfortable rides, and transparent pricing in minutes.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
          <Button 
            component={Link} 
            to="/booking" 
            variant="contained" 
            color="primary" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ py: 2, px: 4, fontSize: '1.1rem' }}
          >
            Book a Ride Now
          </Button>
          <Button 
            component={Link} 
            to="/services" 
            variant="outlined" 
            color="inherit" 
            size="large"
            sx={{ py: 2, px: 4, fontSize: '1.1rem', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Explore Services
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

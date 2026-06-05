import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          About Us
        </Typography>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="primary.main">
              Reimagining Urban Mobility
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Book_A_Taxi started with a simple idea: making transportation reliable, affordable, and accessible to everyone. Today, we're building the future of movement in our cities.
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Whether you're heading to work, the airport, or a night out, we connect you with professional drivers in minutes. Our platform ensures every ride is safe, comfortable, and seamlessly managed through our application.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="glass-panel" sx={{ p: 2 }}>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography variant="h3" color="primary.main" gutterBottom>10k+</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Daily Rides</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" color="primary.main" gutterBottom>50+</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Cities Covered</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" color="primary.main" gutterBottom>5k+</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Active Drivers</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" color="primary.main" gutterBottom>4.9</Typography>
                    <Typography variant="subtitle1" color="text.secondary">Average Rating</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

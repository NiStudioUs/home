import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'standard',
    title: 'Standard',
    description: 'Affordable, everyday rides. Ideal for quick trips across town and daily commuting.',
    icon: <LocalTaxiIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />,
    price: '$$'
  },
  {
    id: 'comfort',
    title: 'Comfort',
    description: 'Newer cars with extra legroom. Perfect for business meetings or when you want to relax.',
    icon: <DirectionsCarIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />,
    price: '$$$'
  },
  {
    id: 'green',
    title: 'Green',
    description: '100% electric or hybrid rides. The most sustainable way to move around the city.',
    icon: <ElectricCarIcon sx={{ fontSize: 48, color: '#06B6D4', mb: 2 }} />,
    price: '$$'
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleBook = (vehicleType: string) => {
    navigate('/booking', { state: { vehicle: vehicleType } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
        Our Services
      </Typography>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={service.id}>
            <Box 
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glass-panel" sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {service.icon}
                  <Typography variant="h4" gutterBottom>{service.title}</Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 'auto' }}>
                    {service.description}
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ mt: 3, mb: 3, opacity: 0.8 }}>
                    Price factor: {service.price}
                  </Typography>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={() => handleBook(service.id)}
                    sx={{ mt: 'auto' }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

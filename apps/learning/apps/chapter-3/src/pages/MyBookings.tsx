import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  date: string;
  time: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  bookedAt: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('taxi_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      // Mock data if no local storage
      setBookings([
        {
          id: 'mock-1',
          name: 'John Doe',
          phone: '1234567890',
          vehicle: 'comfort',
          date: '2025-05-15',
          time: '14:30',
          pickupLat: 28.6139,
          pickupLng: 77.2090,
          dropoffLat: 28.5355,
          dropoffLng: 77.2410,
          bookedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          My Bookings
        </Typography>

        {bookings.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="h5" color="text.secondary">
              You have no ride history yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {bookings.map((booking, index) => {
              const isPast = new Date(`${booking.date}T${booking.time}`) < new Date();
              
              return (
                <Grid item xs={12} md={6} key={booking.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-panel">
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                          <Chip 
                            label={isPast ? "Completed" : "Scheduled"} 
                            color={isPast ? "default" : "primary"}
                            variant={isPast ? "outlined" : "filled"}
                            size="small"
                          />
                          <Typography variant="caption" color="text.secondary">
                            Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DirectionsCarIcon color="primary" />
                          {booking.vehicle.charAt(0).toUpperCase() + booking.vehicle.slice(1)} Ride
                        </Typography>
                        
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <AccessTimeIcon fontSize="small" color="secondary" />
                          <Typography variant="body1">
                            {booking.date} at {booking.time}
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                          <LocationOnIcon fontSize="small" sx={{ color: '#22c55e' }} />
                          <Typography variant="body2" color="text.secondary">
                            Pickup: [{booking.pickupLat?.toFixed(4) || 'N/A'}, {booking.pickupLng?.toFixed(4) || 'N/A'}]
                          </Typography>
                        </Box>
                        
                        <Box display="flex" alignItems="center" gap={1}>
                          <LocationOnIcon fontSize="small" sx={{ color: '#ef4444' }} />
                          <Typography variant="body2" color="text.secondary">
                            Dropoff: [{booking.dropoffLat?.toFixed(4) || 'N/A'}, {booking.dropoffLng?.toFixed(4) || 'N/A'}]
                          </Typography>
                        </Box>

                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, MenuItem, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';

// Create custom colored pins for Leaflet
const createCustomIcon = (color: string) => {
  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="36px" height="36px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  return L.divIcon({
    className: 'custom-div-icon',
    html: svgIcon,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const pickupIcon = createCustomIcon('#22c55e'); // Green
const dropoffIcon = createCustomIcon('#ef4444'); // Red

// Component to handle map clicks
function LocationSelector({ setPickup, setDropoff, selectionMode }: { setPickup: any, setDropoff: any, selectionMode: 'pickup' | 'dropoff' }) {
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      if (selectionMode === 'pickup') setPickup([e.latlng.lat, e.latlng.lng]);
      else setDropoff([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const vehicleTypes = [
  { value: 'standard', label: 'Standard - $$' },
  { value: 'comfort', label: 'Comfort - $$$' },
  { value: 'green', label: 'Green (EV) - $$' },
];

export default function Booking() {
  const location = useLocation();
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [dropoff, setDropoff] = useState<[number, number] | null>(null);
  const [selectionMode, setSelectionMode] = useState<'pickup' | 'dropoff'>('pickup');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: location.state?.vehicle || 'standard',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [isBooked, setIsBooked] = useState(false);

  // Sync state if navigation happens while component is mounted
  useEffect(() => {
    if (location.state?.vehicle) {
      setFormData(prev => ({ ...prev, vehicle: location.state.vehicle }));
    }
  }, [location.state]);

  // Default to Delhi per user request
  const defaultCenter: [number, number] = [28.6139, 77.2090]; 
  const todayStr = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    
    // Date and time validation
    if (!formData.date) {
      newErrors.date = 'Pickup date is required';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Cannot select a past date';
    }

    if (!formData.time) {
      newErrors.time = 'Pickup time is required';
    } else if (formData.date === todayStr) {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const timeStr = `${currentHours}:${currentMinutes}`;
      if (formData.time < timeStr) {
        newErrors.time = 'Cannot select a past time';
      }
    }

    if (!pickup) newErrors.map = 'Please select a pickup location on the map';
    if (!dropoff) newErrors.map = 'Please select a dropoff location on the map';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Create booking record
      const bookingRecord = {
        id: crypto.randomUUID(),
        ...formData,
        pickupLat: pickup?.[0],
        pickupLng: pickup?.[1],
        dropoffLat: dropoff?.[0],
        dropoffLng: dropoff?.[1],
        bookedAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('taxi_bookings') || '[]');
      localStorage.setItem('taxi_bookings', JSON.stringify([bookingRecord, ...existing]));
      
      // Simulate API call delay
      setTimeout(() => setIsBooked(true), 800);
    }
  };

  const handleReset = () => {
    setIsBooked(false);
    setPickup(null);
    setDropoff(null);
    setFormData({ name: '', phone: '', vehicle: 'standard', date: '', time: '' });
  };

  if (isBooked) {
    return (
      <Container maxWidth="sm" sx={{ py: 12 }}>
        <Box 
          component={motion.div} 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          sx={{ textAlign: 'center' }}
        >
          <CheckCircleIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
          <Typography variant="h3" gutterBottom>Ride Confirmed!</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your {formData.vehicle} ride has been successfully booked for {formData.date} at {formData.time}. 
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Your driver will contact you at {formData.phone} upon arrival.
          </Typography>
          <Button variant="outlined" onClick={handleReset}>Book Another Ride</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: { xs: 4, md: 6 } }}>
          Book Your Ride
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Paper className="glass-panel" sx={{ p: 4, height: '100%', position: 'relative', zIndex: 2 }}>
              <Typography variant="h5" gutterBottom color="primary.main">
                Trip Details
              </Typography>
              
              {errors.map && (
                <Typography color="error" variant="body2" sx={{ mb: 2 }}>* {errors.map}</Typography>
              )}

              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <Button 
                  variant={selectionMode === 'pickup' ? 'contained' : 'outlined'} 
                  onClick={() => setSelectionMode('pickup')}
                  fullWidth
                  sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Set Pickup
                </Button>
                <Button 
                  variant={selectionMode === 'dropoff' ? 'contained' : 'outlined'} 
                  onClick={() => setSelectionMode('dropoff')}
                  fullWidth
                  sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Set Dropoff
                </Button>
              </Box>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField 
                  label="Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth 
                />
                <TextField 
                  label="Phone Number" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth 
                />
                <TextField
                  select
                  label="Vehicle Type"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  fullWidth
                >
                  {vehicleTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField 
                      label="Date" 
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      error={!!errors.date}
                      helperText={errors.date}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: todayStr }}
                      fullWidth 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField 
                      label="Time" 
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      error={!!errors.time}
                      helperText={errors.time}
                      InputLabelProps={{ shrink: true }}
                      fullWidth 
                    />
                  </Grid>
                </Grid>

                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ mt: 2, py: 1.5 }}
                >
                  Confirm Booking
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Box sx={{ height: { xs: 400, lg: '100%' }, minHeight: 600, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <LocationSelector setPickup={setPickup} setDropoff={setDropoff} selectionMode={selectionMode} />
                
                {pickup && (
                  <Marker position={pickup} icon={pickupIcon}>
                    <Popup>Pickup Location</Popup>
                  </Marker>
                )}
                {dropoff && (
                  <Marker position={dropoff} icon={dropoffIcon}>
                    <Popup>Dropoff Location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

import { Container, Typography, Box, Grid, TextField, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

export default function Contact() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Contact Us
        </Typography>

        <Card className="glass-panel" sx={{ p: { xs: 2, md: 4 } }}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom color="primary.main">
                  Get in Touch
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Have questions about our service? Want to partner with us? Reach out and our team will get back to you shortly.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>support@bookataxi.com</Typography>
                  
                  <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>+1 (555) 123-4567</Typography>
                  
                  <Typography variant="subtitle1" fontWeight="bold">Headquarters</Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 Innovation Drive<br />
                    Tech District, City 90210
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField 
                    label="Name" 
                    variant="outlined" 
                    fullWidth 
                  />
                  <TextField 
                    label="Email" 
                    variant="outlined" 
                    type="email"
                    fullWidth 
                  />
                  <TextField 
                    label="Message" 
                    variant="outlined" 
                    multiline
                    rows={4}
                    fullWidth 
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

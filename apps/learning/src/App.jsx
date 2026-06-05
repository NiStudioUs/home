import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 24px -10px ${theme.palette.primary.main}40`,
    background: 'rgba(255, 255, 255, 0.05)',
  },
}));

import appData from './data.json';

function App() {
  const apps = appData.apps;

  return (
    <Box sx={{ minHeight: '100vh', py: 8, position: 'relative', overflow: 'hidden' }}>
      {/* Background Decorators */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(244,63,94,0.1) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="overline" color="primary" sx={{ letterSpacing: 2, fontWeight: 600 }}>
            Karthik's Repository
          </Typography>
          <GradientText variant="h2" component="h1" gutterBottom sx={{ mt: 1, mb: 3 }}>
            Learning Hub
          </GradientText>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', margin: '0 auto', fontWeight: 400 }}>
            A centralized portfolio of my development projects, experiments, and learning milestones.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {apps.map((app) => (
            <Grid item xs={12} sm={6} md={4} key={app.id}>
              <ProjectCard>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {app.tags.map(tag => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                    ))}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="600">
                    {app.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {app.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    href={app.path}
                    sx={{
                      background: 'linear-gradient(45deg, #7C3AED, #4F46E5)',
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #6D28D9, #4338CA)',
                      }
                    }}
                  >
                    View Project
                  </Button>
                </CardActions>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel,
  FormControl, 
  Paper,
  Link,
  Alert,
  AlertTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    const submittedUser = username.trim().toLowerCase();
    
    // Strict Mock Authentication (Only applied during Login)
    if (isLogin) {
      if (role === 'Hr') {
        if (submittedUser !== 'hr_admin' || password !== 'password123') {
          setAuthError('Invalid HR credentials');
          return;
        }
      } else {
        if (submittedUser !== 'john_doe' || password !== 'password123') {
          setAuthError('Invalid Employee credentials');
          return;
        }
      }
    }

    localStorage.setItem('auth_role', role);
    localStorage.setItem('auth_user', username);

    if (role === 'Hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/employee-dashboard');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={0} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl sx={{ mt: 2, width: '100%', alignItems: 'center' }}>
            <RadioGroup
              row
              name="role-group"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="Employee" control={<Radio size="small" />} label="Employee" />
              <FormControlLabel value="Hr" control={<Radio size="small" />} label="Hr" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link 
              component="button" 
              type="button"
              variant="body2" 
              onClick={() => {
                setIsLogin(!isLogin);
                setAuthError('');
              }}
              sx={{ textDecoration: 'none', fontWeight: 500 }}
            >
              {isLogin ? 'Sign Up' : 'Already have an account? Login'}
            </Link>
          </Box>
          
          {authError && (
            <Alert severity="error" sx={{ mt: 2, textAlign: 'left', borderRadius: 2 }}>
              {authError}
            </Alert>
          )}

          {isLogin ? (
            <Alert severity="info" sx={{ mt: 4, textAlign: 'left', borderRadius: 2 }}>
              <AlertTitle><strong>Demo Credentials</strong></AlertTitle>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>HR Portal:</strong> Select 'Hr' role. <br/>
                Username: <code>hr_admin</code><br/>
                Password: <code>password123</code>
              </Typography>
              <Typography variant="body2">
                <strong>Employee Portal:</strong> Select 'Employee' role.<br/>
                Username: <code>john_doe</code><br/>
                Password: <code>password123</code>
              </Typography>
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mt: 4, textAlign: 'left', borderRadius: 2 }}>
              <AlertTitle><strong>Open Registration</strong></AlertTitle>
              <Typography variant="body2">
                Because you are in Sign Up mode, you can use <strong>any custom username and password</strong> you want. Just select your role and create an account!
              </Typography>
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;

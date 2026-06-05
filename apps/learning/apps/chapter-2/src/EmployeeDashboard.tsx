import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button,
  AppBar, Toolbar, Tabs, Tab, TextField, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState('Employee');
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  
  // New Leave Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveError, setLeaveError] = useState('');

  useEffect(() => {
    // Check Auth
    if (localStorage.getItem('auth_role') !== 'Employee') {
      navigate('/login');
    }
    const user = localStorage.getItem('auth_user');
    if (user) setUsername(user);
    
    // Load existing leaves for this user (mocked globally for this exercise)
    const stored = localStorage.getItem('leaves_' + user);
    if (stored) {
      setLeaves(JSON.parse(stored));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveError('');
    if (!startDate || !endDate || !reason) return;
    
    if (new Date(startDate) > new Date(endDate)) {
      setLeaveError('Start Date cannot be after End Date.');
      return;
    }
    
    const newReq: LeaveRequest = {
      id: Date.now().toString(),
      startDate,
      endDate,
      reason,
      status: 'Pending'
    };
    
    const updated = [...leaves, newReq];
    setLeaves(updated);
    localStorage.setItem('leaves_' + username, JSON.stringify(updated));
    
    setStartDate('');
    setEndDate('');
    setReason('');
    setLeaveError('');
    setTabIndex(1); // switch to history tab
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #E2E8F0' }}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Employee Portal
          </Typography>
          <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mr: 4 }}>
            <Tab label="Profile" />
            <Tab label="Leave History" />
            <Tab label="Apply for Leave" />
          </Tabs>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        {tabIndex === 0 && (
          <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="600" gutterBottom>Welcome, {username}!</Typography>
            <Typography color="text.secondary">
              This is your secure employee profile. Use the navigation tabs to manage your leaves.
            </Typography>
          </Paper>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>Your Leave History</Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell sx={{ 
                        color: leave.status === 'Pending' ? 'warning.main' : 
                               leave.status === 'Approved' ? 'success.main' : 'error.main',
                        fontWeight: 600
                      }}>
                        {leave.status}
                      </TableCell>
                    </TableRow>
                  ))}
                  {leaves.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        You have no past leave requests.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box component="form" onSubmit={handleApplyLeave} maxWidth="sm" mx="auto">
            <Typography variant="h5" fontWeight="600" mb={3}>Apply for Leave</Typography>
            <Paper elevation={0} sx={{ p: 4 }}>
              {leaveError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {leaveError}
                </Alert>
              )}
              <TextField 
                type="date" fullWidth required margin="normal" label="Start Date" 
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: endDate || undefined }}
                value={startDate} onChange={e => setStartDate(e.target.value)} 
              />
              <TextField 
                type="date" fullWidth required margin="normal" label="End Date" 
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: startDate || undefined }}
                value={endDate} onChange={e => setEndDate(e.target.value)} 
              />
              <TextField 
                fullWidth required margin="normal" label="Reason" multiline rows={4}
                value={reason} onChange={e => setReason(e.target.value)} 
              />
              <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }}>
                Submit Request
              </Button>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default EmployeeDashboard;

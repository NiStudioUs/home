import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Modal, TextField,
  AppBar, Toolbar, Tabs, Tab
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  department: string;
  email: string;
}

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  employeeName: string;
}

const HRDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', department: '', email: '' });
  const [showErrors, setShowErrors] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [allLeaves, setAllLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    // Check Auth
    if (localStorage.getItem('auth_role') !== 'Hr') {
      navigate('/login');
    }
    // Load existing employees
    const stored = localStorage.getItem('employees');
    if (stored) {
      setEmployees(JSON.parse(stored));
    }

    // Load all leaves globally
    const leavesList: LeaveRequest[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('leaves_')) {
        const employeeUsername = key.replace('leaves_', '');
        const userLeaves = JSON.parse(localStorage.getItem(key) || '[]');
        userLeaves.forEach((l: any) => leavesList.push({ ...l, employeeName: employeeUsername }));
      }
    }
    setAllLeaves(leavesList);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  const handleSave = () => {
    if (!newEmp.name || !newEmp.department || !newEmp.email) {
      setShowErrors(true);
      return;
    }
    const emp: Employee = { id: Date.now().toString(), ...newEmp };
    const updated = [...employees, emp];
    setEmployees(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setOpenModal(false);
    setNewEmp({ name: '', department: '', email: '' });
    setShowErrors(false);
  };

  const handleUpdateStatus = (employeeName: string, leaveId: string, newStatus: 'Approved' | 'Rejected') => {
    const key = 'leaves_' + employeeName;
    const userLeaves = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedUserLeaves = userLeaves.map((l: any) => l.id === leaveId ? { ...l, status: newStatus } : l);
    localStorage.setItem(key, JSON.stringify(updatedUserLeaves));
    
    setAllLeaves(allLeaves.map(l => (l.id === leaveId && l.employeeName === employeeName) ? { ...l, status: newStatus } : l));
  };

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #E2E8F0' }}>
        <Toolbar>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, fontWeight: 700 }}>
            HR Portal
          </Typography>
          <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} sx={{ mr: 4 }}>
            <Tab label="Directory" />
            <Tab label="Leave Requests" />
          </Tabs>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        {tabIndex === 0 && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="600">Employee Directory</Typography>
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                Add New Employee
              </Button>
            </Box>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id} hover>
                      <TableCell>{emp.name}</TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.email}</TableCell>
                    </TableRow>
                  ))}
                  {employees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No employees found. Add one above.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" fontWeight="600" mb={3}>Leave Requests</Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                  <TableRow>
                     <TableCell sx={{ fontWeight: 600 }}>Employee User</TableCell>
                     <TableCell sx={{ fontWeight: 600 }}>Dates</TableCell>
                     <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                     <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                     <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.employeeName}</TableCell>
                      <TableCell>{leave.startDate} to {leave.endDate}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell sx={{ 
                        color: leave.status === 'Pending' ? 'warning.main' : 
                               leave.status === 'Approved' ? 'success.main' : 'error.main',
                        fontWeight: 600
                      }}>
                        {leave.status}
                      </TableCell>
                      <TableCell>
                        {leave.status === 'Pending' ? (
                          <Box display="flex" gap={1}>
                            <Button size="small" variant="outlined" color="success" onClick={() => handleUpdateStatus(leave.employeeName, leave.id, 'Approved')}>Approve</Button>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleUpdateStatus(leave.employeeName, leave.id, 'Rejected')}>Reject</Button>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">Reviewed</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {allLeaves.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                        No leave requests exist across the organization.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Container>

      {/* Add Employee Modal */}
      <Modal open={openModal} onClose={() => { setOpenModal(false); setShowErrors(false); }}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', borderRadius: 2, p: 4, boxShadow: 24
        }}>
          <Typography variant="h6" fontWeight="600" mb={3}>Add New Employee</Typography>
          <TextField
            required
            fullWidth label="Name" margin="normal" size="small"
            value={newEmp.name} onChange={e => setNewEmp({...newEmp, name: e.target.value})}
            error={showErrors && !newEmp.name}
            helperText={showErrors && !newEmp.name ? "Name is required" : ""}
          />
          <TextField
            required
            fullWidth label="Department" margin="normal" size="small"
            value={newEmp.department} onChange={e => setNewEmp({...newEmp, department: e.target.value})}
            error={showErrors && !newEmp.department}
            helperText={showErrors && !newEmp.department ? "Department is required" : ""}
          />
          <TextField
            required
            fullWidth label="Email" margin="normal" size="small"
            value={newEmp.email} onChange={e => setNewEmp({...newEmp, email: e.target.value})}
            error={showErrors && !newEmp.email}
            helperText={showErrors && !newEmp.email ? "Email is required" : ""}
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button variant="outlined" color="inherit" onClick={() => { setOpenModal(false); setShowErrors(false); }}>Close</Button>
            <Button variant="contained" onClick={handleSave}>Save Employee</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HRDashboard;

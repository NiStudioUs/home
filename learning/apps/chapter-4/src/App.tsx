import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import ProtectedRoute from './components/shared/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Approvals from './pages/Approvals';
import Management from './pages/Management';
import Analytics from './pages/Analytics';
import AuditLogs from './pages/AuditLogs';

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const { themeMode } = useAuth();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: { main: '#7c3aed' },
          secondary: { main: '#22d3ee' },
          background: {
            default: themeMode === 'dark' ? '#0f172a' : '#f1f5f9',
            paper: themeMode === 'dark' ? '#1e293b' : '#ffffff',
          },
          text: {
            primary: themeMode === 'dark' ? '#f8fafc' : '#0f172a',
            secondary: themeMode === 'dark' ? '#94a3b8' : '#475569',
          },
        },
        typography: { fontFamily: '"Inter", "Outfit", system-ui, sans-serif' },
        shape: { borderRadius: 12 },
        components: { MuiDialog: { styleOverrides: { paper: { backgroundImage: 'none' } } } },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <InventoryProvider>
                  <AppLayout />
                </InventoryProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="audit"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR']}>
                  <AuditLogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="approvals"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR']}>
                  <Approvals />
                </ProtectedRoute>
              }
            />
            <Route
              path="management"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Management />
                </ProtectedRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR']}>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;

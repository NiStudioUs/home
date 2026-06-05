import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useInventory } from '../../context/InventoryContext';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/approvals': 'Approvals Queue',
  '/management': 'Item Management',
  '/analytics': 'Analytics & Reports',
  '/audit': 'Audit Logs',
};

const Topbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser, themeMode, toggleTheme } = useAuth();
  const { state } = useInventory();

  const pendingCount = state?.transactions.filter((t) => t.status === 'PENDING').length ?? 0;
  const canSeeApprovals = currentUser?.role === 'ADMIN' || currentUser?.role === 'SUPERVISOR';

  return (
    <header className="topbar">
      <h1 className="topbar-title">{pageTitles[pathname] ?? 'Inventory OS'}</h1>
      <div className="topbar-actions">
        <IconButton onClick={toggleTheme} color="inherit">
          {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        {canSeeApprovals && pendingCount > 0 && (
          <Badge badgeContent={pendingCount} color="error">
            <div
              className="topbar-icon-btn"
              onClick={() => navigate('/approvals')}
              style={{ cursor: 'pointer' }}
              title={`${pendingCount} pending approval${pendingCount !== 1 ? 's' : ''}`}
            >
              <NotificationsIcon />
            </div>
          </Badge>
        )}
        <div className="topbar-greeting">
          Welcome, <strong>{currentUser?.name.split(' ')[0]}</strong>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

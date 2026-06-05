import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import PublicIcon from '@mui/icons-material/Public';

const Sidebar = () => {
  const { currentUser, logout, region, setRegion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: <DashboardIcon />, label: 'Dashboard', roles: ['ADMIN', 'SUPERVISOR', 'WORKER'] },
    { to: '/approvals', icon: <CheckCircleIcon />, label: 'Approvals', roles: ['ADMIN', 'SUPERVISOR'] },
    { to: '/management', icon: <InventoryIcon />, label: 'Management', roles: ['ADMIN'] },
    { to: '/audit', icon: <InventoryIcon />, label: 'Audit Logs', roles: ['ADMIN', 'SUPERVISOR'] },
    { to: '/analytics', icon: <BarChartIcon />, label: 'Analytics', roles: ['ADMIN', 'SUPERVISOR'] },
  ];

  const visibleItems = navItems.filter(
    (item) => currentUser && item.roles.includes(currentUser.role)
  );

  const roleBadgeColor: Record<string, string> = {
    ADMIN: '#0891b2', // Teal matching new accent
    SUPERVISOR: '#f59e0b',
    WORKER: '#22d3ee',
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <ManageAccountsIcon sx={{ fontSize: 28 }} />
          <span>StockOS</span>
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{currentUser?.name.charAt(0)}</div>
        <div>
          <div className="sidebar-user-name">{currentUser?.name}</div>
          <div
            className="sidebar-role-badge"
            style={{ background: currentUser ? roleBadgeColor[currentUser.role] : '#7c3aed' }}
          >
            {currentUser?.role}
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="region-toggle">
          <PublicIcon sx={{ fontSize: 16 }} />
          <button
            className={`region-btn ${region === 'IN' ? 'active' : ''}`}
            onClick={() => setRegion('IN')}
          >
            IN
          </button>
          <button
            className={`region-btn ${region === 'US' ? 'active' : ''}`}
            onClick={() => setRegion('US')}
          >
            US
          </button>
          <button
            className={`region-btn ${region === 'UK' ? 'active' : ''}`}
            onClick={() => setRegion('UK')}
          >
            UK
          </button>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 18 }} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

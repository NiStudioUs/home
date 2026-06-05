import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockData } from '../utils/mockData';
import { saveDB, getDB } from '../utils/storage';
import warehouseImg from '../assets/warehouse.png';
import GlassCard from '../components/shared/GlassCard';
import InventoryIcon from '@mui/icons-material/Inventory2';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const DEMO_CREDS = [
  { role: 'Admin',      color: '#0891b2', username: 'admin',      password: 'admin123'  },
  { role: 'Supervisor', color: '#f59e0b', username: 'supervisor', password: 'super123'  },
  { role: 'Worker',     color: '#22c55e', username: 'worker',     password: 'work123'   },
];

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [resetMsg, setResetMsg] = useState('');
  const [isBootstrapped, setIsBootstrapped] = useState(!!getDB());
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const success = login(username, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password. Try the demo credentials below.');
    }
  };

  const handleLoadMockData = () => {
    saveDB(mockData);
    setIsBootstrapped(true);
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  const handleResetMockData = () => {
    saveDB(mockData);
    setResetMsg('✓ Data reset! Fresh demo data loaded.');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handlePickCred = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="login-page">
      <div className="aurora-bg">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* Left panel – warehouse image */}
      <div className="login-image-panel">
        <img src={warehouseImg} alt="Warehouse" className="login-bg-img" />
        <div className="login-image-overlay">
          <div className="login-brand">
            <InventoryIcon sx={{ fontSize: 56 }} />
            <h2>StockOS</h2>
            <p>Enterprise Inventory Management</p>
          </div>
          <div className="login-stats">
            <div className="login-stat">
              <span className="login-stat-num">3</span>
              <span className="login-stat-label">Roles</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-num">10+</span>
              <span className="login-stat-label">SKUs</span>
            </div>
            <div className="login-stat">
              <span className="login-stat-num">∞</span>
              <span className="login-stat-label">Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="login-form-panel">
        <GlassCard className="login-card">
          <div className="login-card-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your inventory console</p>
          </div>

          {/* ── Demo credentials panel ── */}
          <div className="login-demo-credentials">
            <div className="cred-header">
              <span className="cred-title">Demo Credentials</span>
              <div className="cred-actions">
                {!isBootstrapped && (
                  <button className="btn-demo-action" onClick={handleLoadMockData}>
                    <RocketLaunchIcon sx={{ fontSize: 14 }} />
                    Load Data
                  </button>
                )}
                {isBootstrapped && (
                  <button className="btn-demo-action btn-demo-action--reset" onClick={handleResetMockData}>
                    <RefreshIcon sx={{ fontSize: 14 }} />
                    Reset Data
                  </button>
                )}
              </div>
            </div>

            {resetMsg && <p className="cred-reset-msg">{resetMsg}</p>}

            <div className="cred-list">
              {DEMO_CREDS.map(({ role, color, username: u, password: p }) => (
                <button
                  key={role}
                  className="cred-row"
                  onClick={() => handlePickCred(u, p)}
                  title={`Sign in as ${role}`}
                >
                  <span className="cred-role-pill" style={{ background: color + '22', color }}>
                    {role}
                  </span>
                  <span className="cred-user">{u}</span>
                  <span className="cred-sep">/</span>
                  <span className="cred-pass">{p}</span>
                  <span className="cred-hint">↑ click to fill</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Sign-in form ── */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">
                <PersonOutlineIcon sx={{ fontSize: 15, verticalAlign: 'middle', mr: 0.5 }} />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="form-input"
                autoComplete="username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <LockOutlinedIcon sx={{ fontSize: 15, verticalAlign: 'middle', mr: 0.5 }} />
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                autoComplete="current-password"
                required
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Sign In →'}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;

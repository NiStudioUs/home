import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Briefcase, BookOpen, Code, Layers } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const clickCountRef = React.useRef(0);
  const clickTimerRef = React.useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandSecretClick = () => {
    handleNavClick();
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      navigate('/training');
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };

  // Secret keyboard sequence: typing 'certa' or Ctrl+Shift+K
  React.useEffect(() => {
    let buffer = '';
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate('/training');
      }
      if (e.key.length === 1) {
        buffer += e.key.toLowerCase();
        if (buffer.length > 10) buffer = buffer.slice(-10);
        if (buffer.includes('certa')) {
          navigate('/training');
          buffer = '';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-brand" onClick={handleBrandSecretClick} title="Karthik Subramanian">
          Karthik Subramanian
        </NavLink>
        
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <NavLink to="/timeline" className="navbar-item" onClick={handleNavClick}><Briefcase size={18} /> Experience</NavLink>
          <NavLink to="/story" className="navbar-item" onClick={handleNavClick}><BookOpen size={18} /> Story</NavLink>
          <NavLink to="/projects" className="navbar-item" onClick={handleNavClick}><Code size={18} /> Projects</NavLink>
          <NavLink to="/stack" className="navbar-item" onClick={handleNavClick}><Layers size={18} /> Tech Stack</NavLink>

          {/* Note: The /resume and /dev routes are intentionally hidden from the public Navbar */}          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}



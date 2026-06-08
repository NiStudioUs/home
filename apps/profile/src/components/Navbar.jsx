import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Briefcase, BookOpen, Code, Layers, FileText } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-brand" onClick={handleNavClick}>
          Karthik Subramanian
        </NavLink>
        
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <NavLink to="/timeline" className="navbar-item" onClick={handleNavClick}><Briefcase size={18} /> Experience</NavLink>
          <NavLink to="/story" className="navbar-item" onClick={handleNavClick}><BookOpen size={18} /> Story</NavLink>
          <NavLink to="/projects" className="navbar-item" onClick={handleNavClick}><Code size={18} /> Projects</NavLink>
          <NavLink to="/stack" className="navbar-item" onClick={handleNavClick}><Layers size={18} /> Tech Stack</NavLink>

          
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

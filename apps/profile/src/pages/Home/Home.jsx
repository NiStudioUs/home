import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Smartphone, Globe, MonitorPlay } from 'lucide-react';
import profileData from '../../content/profile.json';
import './Home.css';

export default function Home() {
  return (
    <div className="home container">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{profileData.name}</h1>
          <h2 className="hero-subtitle">{profileData.title}</h2>
          <p className="hero-description">{profileData.summary}</p>
          
          <div className="hero-actions">
            <Link to="/timeline" className="btn btn-primary">View Experience</Link>
            <Link to="/projects" className="btn btn-outline">Explore Projects</Link>
          </div>
          
          <div className="social-links">
            {profileData.socials.map((social, idx) => {
              const getIcon = (platform) => {
                switch (platform) {
                  case 'LinkedIn': return <UserCircle size={18} />;
                  case 'Play Store': return <Smartphone size={18} />;
                  case 'Portfolio': return <Globe size={18} />;
                  case 'Learning Demo': return <MonitorPlay size={18} />;
                  default: return null;
                }
              };
              
              return (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                  {getIcon(social.platform)}
                  <span>{social.platform}</span>
                </a>
              );
            })}
          </div>
        </div>
      </header>

      <section className="highlights">
        <h3 className="section-title">Professional Highlights</h3>
        <div className="highlights-grid">
          {profileData.highlights.map((highlight, idx) => (
            <div key={idx} className="card highlight-card">
              <p>{highlight}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

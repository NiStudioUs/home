import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Smartphone, Globe, MonitorPlay, ArrowRight } from 'lucide-react';
import profileData from '../../content/profile.json';
import projectsData from '../../content/projects_summary.json';
import skillsData from '../../content/skills.json';
import experienceData from '../../content/experience.json';

import ProjectDialog from '../../components/ProjectDialog';

import './Home.css';
import '../Projects/Projects.css';
import '../Stack/Stack.css';
import '../Timeline/Timeline.css';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const topSkillsCategory = skillsData.categories[0];
  const featuredProjects = projectsData.slice(0, 3);
  const recentExperience = experienceData.slice(0, 2);

  return (
    <div className="home container">
      <header className="hero">
        <div className="hero-layout">
          <div className="hero-image-container">
            <div className="hero-avatar-fallback" style={{ display: 'flex' }}>KS</div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="terminal-prompt">&gt;</span> {profileData.name}<span className="terminal-cursor">_</span>
            </h1>
            <h2 className="hero-subtitle">{profileData.title}</h2>
            <p className="hero-description">{profileData.summary}</p>
            
            <div className="hero-actions">
              <Link to="/timeline" className="btn btn-primary">View Experience</Link>
              <Link to="/projects" className="btn btn-outline">Explore Projects</Link>
            </div>
            
            <div className="social-links">
              {profileData.socials.map((social, idx) => {
                const IconComponent = {
                  UserCircle, Smartphone, Globe, MonitorPlay
                }[social.icon];
                
                return (
                  <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                    {IconComponent && <IconComponent size={18} />}
                    <span>{social.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="home-stats-section">
        <div className="stats-grid">
          <div className="card stat-card bento-card">
            <h3 className="stat-value">9+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="card stat-card bento-card">
            <h3 className="stat-value">{new Set(experienceData.map(e => e.company)).size}</h3>
            <p className="stat-label">Companies</p>
          </div>
          <div className="card stat-card bento-card">
            <h3 className="stat-value">{projectsData.length}</h3>
            <p className="stat-label">Apps Built</p>
          </div>
          <div className="card stat-card bento-card">
            <h3 className="stat-value">{projectsData.filter(p => p.status.includes('Live')).length}</h3>
            <p className="stat-label">Apps Live</p>
          </div>
        </div>
      </section>

      {/* Core Tech Stack Section */}
      <section className="home-section">
        <div className="section-header">
          <h3 className="section-title">Core Tech Stack</h3>
        </div>
        <div className="skills-table-container card">
          <table className="skills-table" style={{ margin: 0 }}>
            <tbody>
              {skillsData.categories.slice(0, 4).map((category, idx) => (
                <tr key={idx}>
                  <td className="skill-category-name" style={{ width: '200px' }}>{category.name}</td>
                  <td className="skill-category-items">{category.skills.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="view-more-container">
          <Link to="/stack" className="view-more-btn">
            View Full Stack <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="home-section">
        <div className="section-header">
          <h3 className="section-title">Featured Projects</h3>
        </div>
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="card project-card" onClick={() => setSelectedProject(project)}>
              <div className="project-header">
                <h2 className="project-title">{project.name}</h2>
                <span className={`status-badge status-${project.status.split(' ')[0].toLowerCase()}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="project-description">
                {project.description || 'A comprehensive application showcasing software engineering principles.'}
              </p>
              
              <div className="project-meta">
                <div className="meta-item">
                  <span className="meta-label">Version:</span>
                  <span className="meta-value">{project.version}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Packages:</span>
                  <span className="meta-value">{project.packages?.length || 0}</span>
                </div>
              </div>

              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <Link to="/projects" className="view-more-btn">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Recent Experience Section */}
      <section className="home-section">
        <div className="section-header">
          <h3 className="section-title">Recent Experience</h3>
        </div>
        <div className="timeline-static">
          {recentExperience.map((exp, idx) => (
            <div key={idx} className="timeline-item is-reached">
              <div className="timeline-content card bento-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.title}</h3>
                    <h4 className="timeline-company">{exp.company} {exp.client && `| Client: ${exp.client}`}</h4>
                  </div>
                  <div className="timeline-date">
                    <span className="badge">{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <Link to="/timeline" className="view-more-btn">
            Read Full History <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {selectedProject && (
        <ProjectDialog 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

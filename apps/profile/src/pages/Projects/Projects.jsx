import React, { useState } from 'react';
import projectsData from '../../content/projects.json';
import ProjectDialog from '../../components/ProjectDialog';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="projects-page container">
      <h1 className="page-title">Project Showcase</h1>
      <p className="projects-intro text-center">
        Extracted directly from local project repositories (package.json / pubspec.yaml).
      </p>

      <div className="projects-grid">
        {projectsData.map((project) => (
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
                <span className="meta-value">{project.packages?.length || 0} discovered</span>
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

      {selectedProject && (
        <ProjectDialog 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

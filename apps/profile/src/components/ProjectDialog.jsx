import React from 'react';
import { X, ExternalLink, Code, Globe } from 'lucide-react';
import { CONTACT } from '../config/constants';

export default function ProjectDialog({ project, onClose }) {
  if (!project) return null;

  const details = project || {};

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content card" onClick={e => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className="project-title" style={{ marginBottom: '0.5rem' }}>{project.name}</h2>
        <span className={`status-badge status-${project.status.split(' ')[0].toLowerCase().replace('-', '')}`}>
          {project.status}
        </span>

        <div className="dialog-body">
          <p>{details.fullDescription || project.description}</p>
          
          {details.features && (
            <>
              <h3>Key Features</h3>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                {details.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          <div className="dialog-actions">
            {details.storeUrl && (
              <a href={details.storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View on Play Store <ExternalLink size={16} />
              </a>
            )}
            {details.webUrl && (
              <a href={details.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Launch Website <ExternalLink size={16} />
              </a>
            )}
            {details.githubUrl && (
              <a href={details.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Source Code <Code size={16} />
              </a>
            )}
            {details.liveUrl && (
              <a href={details.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Demo <Globe size={16} />
              </a>
            )}
          </div>
          
          <div style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
            <p style={{ margin: 0 }}><strong>Developer:</strong> Ni Studios / Karthik Subramanian</p>
            {CONTACT.EMAIL && <p style={{ margin: 0 }}><strong>Contact:</strong> {CONTACT.EMAIL}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

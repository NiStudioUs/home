import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { CONTACT } from '../config/constants';

export default function ProjectDialog({ project, onClose }) {
  if (!project) return null;

  // Static content mapping based on project ID for extended details
  const extendedDetails = {
    'scribble': {
      storeUrl: 'https://play.google.com/store/apps/details?id=com.ni.studio.scribble_notes',
      fullDescription: `Scribble is a privacy-focused notes application. Keep your thoughts, daily diary, and tasks in one secure place. Features local persistence, BLoC architecture for reliable state management, and seamless offline-first experience.`,
      features: ['Local Database (SQLite)', 'Offline-first design', 'Task Reminders', 'Secure Storage']
    },
    'sms-stack': {
      storeUrl: 'https://play.google.com/store/apps/details?id=com.ni.studio.sms_stack_manager',
      fullDescription: `SMS Stack Manager helps categorize SMS, set reminders, and extract financial insights automatically. Built with privacy in mind, all processing happens locally using Drift/SQLite. Features a dual-flavor Android release pipeline.`,
      features: ['Financial Insight Extraction', 'Offline Processing', 'Remote Config', 'Biometric Auth']
    },
    'iky': {
      fullDescription: `People App IKY v2 is a comprehensive multi-platform product architecture. Features a robust backend with PostgreSQL, MongoDB, Redis, and MinIO, deployed via Docker Compose with Traefik routing.`,
      features: ['Client-Server Architecture', 'Docker Orchestration', 'PostgreSQL / MongoDB', 'CI/CD Pipelines']
    },
    'dev-home': {
      webUrl: 'https://nistudious.github.io/home/',
      fullDescription: `A hosted Flutter Web experience acting as a central hub for product showcases and applications.`,
      features: ['Flutter Web', 'Static Hosting', 'Responsive Design']
    },
    'learning-gen-ai': {
      webUrl: 'https://nistudious.github.io/home/',
      fullDescription: `An experimental platform for exploring AI-assisted frontend development and React Native patterns.`,
      features: ['React Native', 'AI Integration', 'Web Deployment']
    }
  };

  const details = extendedDetails[project.id] || {};

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

import React from 'react';
import skillsData from '../content/skills.json';
import { Smartphone, Terminal, Server, Globe, Database, Settings } from 'lucide-react';

const categoryIcons = {
  'Mobile': <Smartphone size={24} className="category-icon" />,
  'Automation': <Terminal size={24} className="category-icon" />,
  'Release & DevOps': <Settings size={24} className="category-icon" />,
  'Domain': <Globe size={24} className="category-icon" />
};

export default function TechStack() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Tech Stack Map</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        The tools, frameworks, and domains I work with on a daily basis.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
              {categoryIcons[category] || <Database size={24} />}
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>{category}</h2>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {skills.map(skill => (
                <span key={skill} className="tag" style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor: 'var(--bg-primary)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

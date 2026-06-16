import React from 'react';
import skillsData from '../../content/skills.json';
import './Stack.css';
import { TestTube2, Smartphone, GitBranch, Package, Database, Building2, LayoutGrid, Code2 } from 'lucide-react';

const categoryIcons = {
  'SDET / QE / Automation': <TestTube2 size={20} />,
  'Mobile Development': <Smartphone size={20} />,
  'CI/CD / DevOps / Tooling': <GitBranch size={20} />,
  'Android Release Management': <Package size={20} />,
  'Data / Backend / Platform': <Database size={20} />,
  'Domain Expertise': <Building2 size={20} />,
  'Applications & Systems Supported': <LayoutGrid size={20} />
};

export default function Stack() {
  return (
    <div className="stack-page container">
      <h1 className="page-title">Tech Stack</h1>
      <p className="stack-intro text-center">
        A comprehensive map of technologies and frameworks I use across mobile, backend, and quality engineering.
      </p>
      
      <div className="stack-grid">
        {skillsData.categories.map((category, idx) => (
          <div key={idx} className="card stack-card">
            <h2 className="stack-category-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {categoryIcons[category.name] || <Code2 size={20} />}
              {category.name}
            </h2>
            <ul className="stack-items-list">
              {category.skills.map((skill, i) => (
                <li key={i}>{skill.replace(/<br>/g, '')}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

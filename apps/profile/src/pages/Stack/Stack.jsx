import React from 'react';
import skillsData from '../../content/skills.json';
import './Stack.css';

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
            <h2 className="stack-category-title">{category.name}</h2>
            <div className="stack-items">
              {category.skills.map((skill, i) => (
                <span key={i} className="badge stack-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

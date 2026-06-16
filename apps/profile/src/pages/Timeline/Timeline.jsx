import React, { useEffect, useState, useRef } from 'react';
import experienceData from '../../content/experience.json';
import './Timeline.css';

import { useScrollProgress } from '../../hooks/useScrollProgress';

function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const endStr = endDate.toLowerCase() === 'present' ? new Date().toISOString() : endDate;
  const end = new Date(endStr);
  
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;

  if (years === 0) return `${months} mos`;
  if (months === 0) return `${years} yrs`;
  return `${years} yrs ${months} mo`;
}

export default function Timeline() {
  const { scrollProgress, reachedIndices, lineStyles, containerRef } = useScrollProgress('.timeline-item');

  // Calculate summary stats
  const totalMonths = experienceData.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const endStr = exp.endDate.toLowerCase() === 'present' ? new Date().toISOString() : exp.endDate;
    const end = new Date(endStr);
    return acc + ((end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
  }, 0);
  const totalYears = Math.floor(totalMonths / 12);
  const uniqueCompanies = new Set(experienceData.map(e => e.company)).size;

  return (
    <div className="timeline-page container">
      <h1 className="page-title">Experience</h1>
      
      <p className="text-center" style={{ marginBottom: '3rem', color: 'var(--text-secondary)' }}>
        {totalYears}+ years experience across {uniqueCompanies} companies
      </p>

      <div className="timeline" ref={containerRef}>
        <div className="timeline-line-bg" style={{ top: `${lineStyles.top}px`, height: `${lineStyles.height}px` }}></div>
        <div className="timeline-line-progress" style={{ top: `${lineStyles.top}px`, height: `${(scrollProgress / 100) * lineStyles.height}px` }}></div>
        
        {experienceData.map((exp, idx) => {
          const isReached = reachedIndices.includes(idx);
          const isActive = reachedIndices.length > 0 && Math.max(...reachedIndices) === idx;
          return (
            <div key={idx} className={`timeline-item ${isReached ? 'is-reached' : ''} ${isActive ? 'is-active' : ''}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content card bento-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.title}</h3>
                    <h4 className="timeline-company">{exp.company} {exp.client && `| Client: ${exp.client}`}</h4>
                  </div>
                  <div className="timeline-date" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge">{exp.startDate} - {exp.endDate}</span>
                    <span className="timeline-duration" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {calculateDuration(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                </div>
                <ul className="timeline-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                {exp.tags && exp.tags.length > 0 && (
                  <div className="timeline-tags" style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--bg-primary)' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

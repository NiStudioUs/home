import React, { useEffect, useState, useRef } from 'react';
import './Narrative.css';

import milestones from '../../content/narrative.json';

import { useScrollProgress } from '../../hooks/useScrollProgress';

export default function Narrative() {
  const { scrollProgress, reachedIndices, lineStyles, containerRef } = useScrollProgress('.story-row');

  return (
    <div className="narrative-page">
      <div className="narrative-header container">
        <h1 className="page-title">My Journey</h1>
        <p className="narrative-intro text-center">
          Scroll down to walk through my professional timeline and domain knowledge acquisition.
        </p>
      </div>

      <div className="story-container" ref={containerRef}>
        <div className="story-line-bg" style={{ top: `${lineStyles.top}px`, height: `${lineStyles.height}px` }}></div>
        <div className="story-line-progress" style={{ top: `${lineStyles.top}px`, height: `${(scrollProgress / 100) * lineStyles.height}px` }}></div>
        
        {milestones.map((milestone, idx) => {
          const isEven = idx % 2 === 0;
          const isReached = reachedIndices.includes(idx);
          const isActive = reachedIndices.length > 0 && Math.max(...reachedIndices) === idx;
          return (
            <div key={idx} className={`story-row ${isEven ? 'row-left' : 'row-right'} ${isReached ? 'is-reached' : ''} ${isActive ? 'is-active' : ''}`}>
              <div className="story-dot"></div>
              <div className="card story-card bento-card">
                <div className="story-meta">
                  <span className="story-year">{milestone.year}</span>
                  <span className="story-company">{milestone.company}</span>
                </div>
                <h3 className="story-project">{milestone.project}</h3>
                <p className="story-desc">{milestone.description}</p>
                <div className="story-tags">
                  {milestone.tags.map((tag, i) => (
                    <span key={i} className="story-badge">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

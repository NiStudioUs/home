import React, { useEffect, useState, useRef } from 'react';
import './Narrative.css';

import milestones from '../../content/narrative.json';

export default function Narrative() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedIndices, setReachedIndices] = useState([]);
  const [lineStyles, setLineStyles] = useState({ top: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      const cards = document.querySelectorAll('.story-row');
      if (cards.length === 0) return;
      
      // Calculate positions of the first and last cards
      const firstCard = cards[0].getBoundingClientRect();
      const lastCard = cards[cards.length - 1].getBoundingClientRect();
      
      const firstCardCenterY = firstCard.top + scrollY + (firstCard.height / 2);
      const lastCardCenterY = lastCard.top + scrollY + (lastCard.height / 2);
      
      const containerTop = containerRef.current.getBoundingClientRect().top + scrollY;
      const topOffset = firstCardCenterY - containerTop;
      const totalLineHeight = lastCardCenterY - firstCardCenterY;
      
      setLineStyles({ top: topOffset, height: totalLineHeight });

      // The tip of the progress line is at the center of the viewport
      const lineTipY = scrollY + (windowHeight / 2);
      
      let progress = 0;
      if (lineTipY >= firstCardCenterY) {
        progress = ((lineTipY - firstCardCenterY) / totalLineHeight) * 100;
      }
      
      // If we've scrolled to the absolute bottom of the page, ensure the line reaches 100%
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      if (scrollY >= maxScroll - 5) {
        progress = 100;
      }
      
      setScrollProgress(Math.max(0, Math.min(progress, 100)));
      
      // Determine reached cards based on whether the line tip has passed their center
      const newReached = [];
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterY = rect.top + scrollY + (rect.height / 2);
        if (lineTipY >= cardCenterY || (scrollY >= maxScroll - 5)) {
          newReached.push(index);
        }
      });
      setReachedIndices(newReached);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initialize on mount
    
    // Add slight delay for layout stabilization (images/fonts loading)
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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

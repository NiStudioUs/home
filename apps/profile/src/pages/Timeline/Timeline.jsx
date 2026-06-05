import React, { useEffect, useState, useRef } from 'react';
import experienceData from '../../content/experience.json';
import './Timeline.css';

export default function Timeline() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedIndices, setReachedIndices] = useState([]);
  const [lineStyles, setLineStyles] = useState({ top: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      const cards = document.querySelectorAll('.timeline-item');
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
    
    // Add slight delay for layout stabilization
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="timeline-page container">
      <h1 className="page-title">Experience</h1>
      
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
          );
        })}
      </div>
    </div>
  );
}

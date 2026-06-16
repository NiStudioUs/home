import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(itemSelector) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reachedIndices, setReachedIndices] = useState([]);
  const [lineStyles, setLineStyles] = useState({ top: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      const cards = document.querySelectorAll(itemSelector);
      if (cards.length === 0) return;
      
      const firstCard = cards[0].getBoundingClientRect();
      const lastCard = cards[cards.length - 1].getBoundingClientRect();
      
      const firstCardCenterY = firstCard.top + scrollY + (firstCard.height / 2);
      const lastCardCenterY = lastCard.top + scrollY + (lastCard.height / 2);
      
      const containerTop = containerRef.current.getBoundingClientRect().top + scrollY;
      const topOffset = firstCardCenterY - containerTop;
      const totalLineHeight = lastCardCenterY - firstCardCenterY;
      
      setLineStyles({ top: topOffset, height: totalLineHeight });

      const lineTipY = scrollY + (windowHeight / 2);
      
      let progress = 0;
      if (lineTipY >= firstCardCenterY) {
        progress = ((lineTipY - firstCardCenterY) / totalLineHeight) * 100;
      }
      
      const maxScroll = document.documentElement.scrollHeight - windowHeight;
      if (scrollY >= maxScroll - 5) {
        progress = 100;
      }
      
      setScrollProgress(Math.max(0, Math.min(progress, 100)));
      
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
    const t = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(t);
    };
  }, [itemSelector]);

  return { scrollProgress, reachedIndices, lineStyles, containerRef };
}

import { useState, useEffect, useCallback } from 'react';

export function useSlideNavigation(totalSlides) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((index) => {
    setCurrentSlide((prev) => {
      if (index < 0 || index >= totalSlides || index === prev) return prev;
      setDirection(index > prev ? 1 : -1);
      return index;
    });
  }, [totalSlides]);

  const next = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= totalSlides - 1) return prev;
      setDirection(1);
      return prev + 1;
    });
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 0) return prev;
      setDirection(-1);
      return prev - 1;
    });
  }, []);

  const goToFirst = useCallback(() => goTo(0), [goTo]);
  const goToLast = useCallback(() => goTo(totalSlides - 1), [goTo, totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          e.preventDefault();
          goToFirst();
          break;
        case 'End':
          e.preventDefault();
          goToLast();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, goToFirst, goToLast]);

  return { currentSlide, direction, goTo, next, prev, totalSlides };
}

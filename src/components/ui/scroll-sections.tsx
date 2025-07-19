"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSectionsProps {
  children: React.ReactNode[];
  className?: string;
}

export function ScrollSections({ children, className = "" }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTransitioning = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isTransitioning) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      // Check bounds
      if (nextSection < 0 || nextSection >= children.length) return;

      // Set transitioning state
      isTransitioning = true;
      setIsScrolling(true);
      setCurrentSection(nextSection);

      // Reset transitioning state after animation
      setTimeout(() => {
        isTransitioning = false;
        setIsScrolling(false);
      }, 800);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;

      let nextSection = currentSection;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextSection = Math.min(currentSection + 1, children.length - 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          nextSection = Math.max(currentSection - 1, 0);
          break;
        case 'Home':
          e.preventDefault();
          nextSection = 0;
          break;
        case 'End':
          e.preventDefault();
          nextSection = children.length - 1;
          break;
        default:
          return;
      }

      if (nextSection !== currentSection) {
        isTransitioning = true;
        setIsScrolling(true);
        setCurrentSection(nextSection);

        setTimeout(() => {
          isTransitioning = false;
          setIsScrolling(false);
        }, 800);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, children.length]);

  // Handle touch events for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let isTransitioning = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const threshold = 50; // Minimum swipe distance

      if (Math.abs(diff) < threshold) return;

      const direction = diff > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection < 0 || nextSection >= children.length) return;

      isTransitioning = true;
      setIsScrolling(true);
      setCurrentSection(nextSection);

      setTimeout(() => {
        isTransitioning = false;
        setIsScrolling(false);
      }, 800);
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, children.length]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden scroll-container ${className}`}
      style={{ height: '100vh' }}
    >
      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setIsScrolling(true);
                setCurrentSection(index);
                setTimeout(() => setIsScrolling(false), 800);
              }
            }}
            className={`nav-dot w-3 h-3 rounded-full transition-all duration-300 border-2 ${
              currentSection === index
                ? 'bg-white border-white scale-125 shadow-lg shadow-white/30'
                : 'bg-transparent border-white/50 hover:border-white/80 hover:scale-110'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Sections Container */}
      <div 
        className="flex flex-col scroll-section"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          height: `${children.length * 100}vh`,
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full ${
              Math.abs(currentSection - index) <= 1 ? 'animate-scale-in' : ''
            }`}
            style={{ height: '100vh' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        {currentSection < children.length - 1 && (
          <div className="text-white/70 text-center animate-bounce">
            <div className="text-sm mb-2 font-medium">Scroll para baixo</div>
            <div className="w-0.5 h-8 bg-gradient-to-b from-white/70 to-transparent mx-auto rounded-full"></div>
          </div>
        )}
      </div>

      {/* Section Counter */}
      <div className="fixed top-6 right-6 z-50 text-white/70 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
        {currentSection + 1} / {children.length}
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-white/70 to-white transition-all duration-700 ease-out"
          style={{ width: `${((currentSection + 1) / children.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

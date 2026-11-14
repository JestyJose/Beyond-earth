import React, { useMemo } from 'react';

/**
 * CosmicBackground component
 * Renders a deep midnight violet galaxy atmosphere (#080512)
 * with soft violet nebula clouds and twinkling stars.
 */
export default function CosmicBackground() {
  // Generate deterministic subtle twinkling stars
  const stars = useMemo(() => {
    const starList = [];
    const seed = [
      { top: 8, left: 12, size: 2, delay: 0, duration: 4 },
      { top: 14, left: 78, size: 1.5, delay: 1.2, duration: 5 },
      { top: 22, left: 35, size: 2.5, delay: 2.4, duration: 4.5 },
      { top: 31, left: 88, size: 1, delay: 0.8, duration: 3.5 },
      { top: 42, left: 18, size: 2, delay: 1.6, duration: 6 },
      { top: 48, left: 62, size: 1.5, delay: 2.8, duration: 4 },
      { top: 57, left: 82, size: 2.5, delay: 0.4, duration: 5.5 },
      { top: 65, left: 28, size: 1, delay: 1.9, duration: 4 },
      { top: 74, left: 92, size: 2, delay: 2.2, duration: 5 },
      { top: 81, left: 45, size: 1.5, delay: 0.6, duration: 4.2 },
      { top: 89, left: 15, size: 2.5, delay: 1.4, duration: 6 },
      { top: 93, left: 72, size: 1.2, delay: 2.6, duration: 4.8 },
      { top: 5, left: 52, size: 2, delay: 3.1, duration: 5.2 },
      { top: 26, left: 95, size: 1.5, delay: 1.1, duration: 4.6 },
      { top: 38, left: 4, size: 2.2, delay: 2.0, duration: 5.8 },
      { top: 53, left: 42, size: 1.2, delay: 0.7, duration: 3.8 },
      { top: 69, left: 68, size: 2, delay: 1.8, duration: 4.4 },
      { top: 84, left: 85, size: 1.6, delay: 2.5, duration: 5.0 },
      { top: 18, left: 60, size: 2.8, delay: 0.9, duration: 6.2 },
      { top: 76, left: 8, size: 1.8, delay: 1.7, duration: 4.7 }
    ];
    return seed;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080512]" aria-hidden="true">
      {/* 1. Soft Violet Nebula Gradients */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-purple-700/15 via-violet-600/10 to-transparent blur-[120px] animate-nebula" 
      />
      <div 
        className="absolute top-[25%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-violet-600/12 via-purple-800/10 to-transparent blur-[130px] animate-nebula" 
        style={{ animationDelay: '-7s' }}
      />
      <div 
        className="absolute -bottom-[20%] left-[25%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-t from-purple-900/14 via-violet-800/8 to-transparent blur-[140px] animate-nebula" 
        style={{ animationDelay: '-14s' }}
      />

      {/* 2. Twinkling Glowing Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(196, 181, 253, 0.9)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
}

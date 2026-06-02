import React, { useMemo, useState, useEffect, useRef } from 'react';

const seededRand = (min, max, seed) => {
  const x = Math.sin(seed + 1) * 10000;
  const r = x - Math.floor(x);
  return min + r * (max - min);
};

const BASE_COUNT = 100;
const MAX_COUNT = 400;

export default function FloatingBubbles({ progress = 0, keypressFlip = 0 }) {
  const clampedProgress = Math.min(5, Math.max(0, progress));
  const count = Math.round(BASE_COUNT + (clampedProgress / 100) * (MAX_COUNT - BASE_COUNT));

  // Track previous flip count to detect new keypress
  const prevFlip = useRef(keypressFlip);
  const [offsets, setOffsets] = useState(() =>
    Array.from({ length: MAX_COUNT }, () => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    if (keypressFlip === prevFlip.current) return;
    prevFlip.current = keypressFlip;

    // On each keypress, give every bubble a drastic jump to its opposite side
    setOffsets(prev => prev.map((_, i) => {
      const currentLeft = seededRand(0, 100, i * 7.3);
      const currentTop  = seededRand(0, 100, i * 11.7);
      // Flip: if bubble is in left half, jump right and vice versa; same for top/bottom
      const flipX = currentLeft < 50
        ? (50 + Math.random() * 45)   // jump to right side
        : -(50 + Math.random() * 45); // jump to left side
      const flipY = currentTop < 50
        ? (50 + Math.random() * 45)
        : -(50 + Math.random() * 45);
      return {
        x: flipX * (window.innerWidth / 100),
        y: flipY * (window.innerHeight / 100),
      };
    }));

    // After 600ms, ease back to near-original position with slight drift
    const t = setTimeout(() => {
      setOffsets(prev => prev.map(() => ({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
      })));
    }, 600);

    return () => clearTimeout(t);
  }, [keypressFlip]);

  const pool = useMemo(() => Array.from({ length: MAX_COUNT }, (_, i) => {
    const growAndVanish = i % 5 === 0;
    return {
      id: i,
      size: seededRand(10, 160, i * 3.1),
      left: seededRand(0, 100, i * 7.3),
      top:  seededRand(0, 100, i * 11.7),
      opacity: seededRand(0.04, 0.20, i * 5.9),
      duration: `${seededRand(4, 14, i * 2.3).toFixed(1)}s`,
      delay: `-${seededRand(0, 12, i * 4.7).toFixed(1)}s`,
      growAndVanish,
      color: growAndVanish ? 'rgba(56,239,125,0.9)' : 'rgba(20,163,117,0.9)',
    };
  }), []);

  const visible = pool.slice(0, count);

  return (
    <>
      <style>{`
        @keyframes floatBubble {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(14px, -18px) scale(1.05); }
          50%  { transform: translate(-10px, -8px) scale(0.96); }
          75%  { transform: translate(8px, 10px) scale(1.03); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes growVanish {
          0%   { transform: scale(0.4); opacity: 0; }
          30%  { transform: scale(1.8); opacity: 0.22; }
          65%  { transform: scale(3);   opacity: 0.10; }
          100% { transform: scale(4);   opacity: 0; }
        }
      `}</style>
      {visible.map((b, idx) => {
        const off = offsets[idx] || { x: 0, y: 0 };
        return (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              borderRadius: '50%',
              backgroundColor: b.color,
              left: `${b.left}%`,
              top:  `${b.top}%`,
              opacity: b.opacity,
              transform: `translate(${off.x}px, ${off.y}px)`,
              transition: keypressFlip !== prevFlip.current
                ? 'transform 0.15s cubic-bezier(0.2, 0, 0.8, 1)'
                : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              animation: b.growAndVanish
                ? `growVanish ${b.duration} ease-in-out ${b.delay} infinite`
                : `floatBubble ${b.duration} ease-in-out ${b.delay} infinite`,
              pointerEvents: 'none',
              zIndex: 0,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </>
  );
}

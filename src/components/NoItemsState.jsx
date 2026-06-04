import React from 'react';

const NoItemsState = () => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-auto">
        <defs>
          {/* Embedded Native Animations */}
          <style>{`
            /* 1. Pulsing Ambient Background Glow */
            @keyframes pulseGlow {
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.15); opacity: 0.9; }
            }
            .anim-glow {
              animation: pulseGlow 4s ease-in-out infinite;
              transform-origin: 200px 180px;
            }

            /* 2. Hovering/Scanning Magnifying Glass */
            @keyframes scanSearch {
              0%, 100% { transform: translate(0px, -10px) rotate(0deg); }
              25% { transform: translate(15px, -18px) rotate(4deg); }
              75% { transform: translate(-10px, -2px) rotate(-4deg); }
            }
            .anim-glass {
              animation: scanSearch 6s ease-in-out infinite;
              transform-origin: 195px 165px;
            }

            /* 3. Eye Blinking Sequence */
            @keyframes blinkEyes {
              0%, 45%, 55%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.1); }
            }
            .anim-eyes {
              animation: blinkEyes 4s ease-in-out infinite;
              transform-origin: 195px 165px;
            }

            /* 4. Floating Crumbs / Sparks */
            @keyframes floatParticle {
              0%, 100% { transform: translateY(0px); opacity: 0.3; }
              50% { transform: translateY(-10px); opacity: 0.7; }
            }
            .crumb-1 { animation: floatParticle 3s ease-in-out infinite; }
            .crumb-2 { animation: floatParticle 3s ease-in-out infinite 0.4s; }
            .crumb-3 { animation: floatParticle 3s ease-in-out infinite 0.8s; }
            .crumb-4 { animation: floatParticle 3s ease-in-out infinite 1.2s; }

            /* 5. Rotating Crosshair Targets */
            @keyframes rotateClockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes rotateCounter {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }
            .target-cw {
              animation: rotateClockwise 8s linear infinite;
              transform-origin: 310px 120px;
            }
            .target-ccw {
              animation: rotateCounter 10s linear infinite;
              transform-origin: 90px 140px;
            }
          `}</style>

          {/* Soft background glow behind the plate */}
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FF6B35" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#FF6B35" stop-opacity="0"/>
          </radialGradient>
          
          {/* Plate depth gradient */}
          <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#374151"/>
            <stop offset="100%" stop-color="#1F2937"/>
          </linearGradient>

          {/* Metallic cutlery gradient */}
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#9CA3AF"/>
            <stop offset="50%" stop-color="#E5E7EB"/>
            <stop offset="100%" stop-color="#6B7280"/>
          </linearGradient>
        </defs>

        {/* Pulsing Ambient background glow */}
        <circle cx="200" cy="180" r="160" fill="url(#ambientGlow)" className="anim-glow"/>

        {/* ================= THE EMPTY PLATE ================= */}
        <g id="plate-group">
          {/* Plate Rim Shadow */}
          <ellipse cx="200" cy="195" rx="125" ry="85" fill="#111827" opacity="0.6"/>
          {/* Outer Rim */}
          <ellipse cx="200" cy="190" rx="125" ry="85" fill="url(#plateGradient)" stroke="#4B5563" stroke-width="3"/>
          {/* Inner Base */}
          <ellipse cx="200" cy="193" rx="95" ry="60" fill="#111827" stroke="#374151" stroke-width="1.5"/>
          {/* Subtle plate reflection accent */}
          <path d="M 120,180 Q 200,145 280,180" stroke="#9CA3AF" stroke-width="1" fill="none" opacity="0.15"/>
        </g>

        {/* ================= LONESOME FORK ================= */}
        <g transform="rotate(-25, 75, 190)">
          <path d="M 75,280 L 75,170" stroke="url(#metalGradient)" stroke-width="7" stroke-linecap="round"/>
          <path d="M 63,170 L 87,170 Q 87,140 75,140 Q 63,140 63,170 Z" fill="url(#metalGradient)"/>
          <path d="M 69,140 L 69,165" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
          <path d="M 75,138 L 75,165" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
          <path d="M 81,140 L 81,165" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
        </g>

        {/* ================= THE ANIMATED SEARCHING GLASS ================= */}
        <g className="anim-glass">
          {/* Magnifying Glass Handle */}
          <path d="M 235,215 L 285,265" stroke="url(#metalGradient)" stroke-width="14" stroke-linecap="round"/>
          <path d="M 255,235 L 280,260" stroke="#4B5563" stroke-width="6" stroke-linecap="round"/>

          {/* Magnifying Glass Rim */}
          <circle cx="195" cy="165" r="55" fill="#1F2937" fill-opacity="0.2" stroke="url(#metalGradient)" stroke-width="10"/>
          <circle cx="195" cy="165" r="55" fill="none" stroke="#111827" stroke-width="1" opacity="0.5"/>

          {/* Lens Glare Reflection */}
          <path d="M 155,150 A 48,48 0 0,1 215,122" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.3"/>
          
          {/* Eyes Group with blinking class */}
          <g className="anim-eyes">
            <path d="M 165,165 Q 177,155 185,165" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" fill="none"/>
            <path d="M 205,165 Q 213,155 225,165" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" fill="none"/>
          </g>
          
          {/* Down-turned Sad Mouth */}
          <path d="M 183,190 Q 195,180 207,190" stroke="#FF6B35" stroke-width="4" stroke-linecap="round" fill="none"/>
        </g>

        {/* ================= FLOATING HUNGER ELEMENTS ================= */}
        <g className="crumb-1"><circle cx="90" cy="110" r="4" fill="#FFB703" /></g>
        <g className="crumb-2"><circle cx="310" cy="130" r="5" fill="#E65F2B" /></g>
        <g className="crumb-3"><circle cx="290" cy="90" r="3" fill="#FFB703" /></g>
        <g className="crumb-4"><circle cx="110" cy="280" r="4" fill="#6B7280" /></g>

        {/* Rotating Radar Targets */}
        <path d="M 305,120 L 315,120 M 310,115 L 310,125" stroke="#FFB703" stroke-width="1.5" className="target-cw" opacity="0.4" />
        <path d="M 85,140 L 95,140 M 90,135 L 90,145" stroke="#E65F2B" stroke-width="1.5" className="target-ccw" opacity="0.3" />

        {/* ================= TYPOGRAPHY ================= */}
        <text x="50%" y="335" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
          Your Plate is Empty!
        </text>
        <text x="50%" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#9CA3AF" text-anchor="middle" letter-spacing="0.5">
          We couldn't find any items matching your criteria.
        </text>
      </svg>
    </div>
  );
};

export default NoItemsState;
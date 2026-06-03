import React from 'react';

export default function TopWaves() {
    return (
        <>
            <style>{`
                @keyframes slowWave {
                    0% {
                        transform: translateX(0) translateZ(0) scaleY(1);
                    }
                    50% {
                        transform: translateX(-25%) translateZ(0) scaleY(0.85);
                    }
                    100% {
                        transform: translateX(-50%) translateZ(0) scaleY(1);
                    }
                }
                
                .wave-svg-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 20px; /* HARD-CAPPED HEIGHT: Exactly 20px deep from top to bottom */
                    overflow: hidden;
                    pointer-events: none; /* Prevents waves from blocking clicks on elements below */
                    z-index: 1; 
                }

                /* Flips the SVG layout upside down and forces paths to stick to the top edge */
                .flipped-wave-container {
                    width: 200%; 
                    height: 100%;
                    transform: scaleY(-1);
                    transform-origin: top;
                }

                .wave-parallax > use {
                    animation: slowWave 12s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
                }

                /* Layer 1: Slow deepest dark layer */
                .wave-parallax > use:nth-child(1) {
                    animation-delay: -2s;
                    animation-duration: 9s;
                }

                /* Layer 2: Mid-tone shifting layer */
                .wave-parallax > use:nth-child(2) {
                    animation-delay: -4s;
                    animation-duration: 14s;
                }

                /* Layer 3: Subtle front highlights */
                .wave-parallax > use:nth-child(3) {
                    animation-delay: -5s;
                    animation-duration: 18s;
                }
            `}</style>

            <div className="wave-svg-wrapper">
                <svg 
                    viewBox="0 24 150 28" 
                    preserveAspectRatio="none" 
                    shapeRendering="auto"
                    className="flipped-wave-container"
                >
                    <defs>
                        <path 
                            id="gentle-wave" 
                            d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" 
                        />
                    </defs>
                    <g className="wave-parallax">
                        {/* Wave 1: Darkest tint matching the forest theme background */}
                        <use href="#gentle-wave" x="48" y="0" fill="rgba(8, 38, 26, 0.6)" />
                        
                        {/* Wave 2: Slightly lighter forest shade for variance */}
                        <use href="#gentle-wave" x="48" y="3" fill="rgba(18, 80, 58, 0.4)" />
                        
                        {/* Wave 3: Deep low-light layer providing subtle ambient movement */}
                        <use href="#gentle-wave" x="48" y="6" fill="rgba(6, 28, 19, 0.65)" />
                    </g>
                </svg>
            </div>
        </>
    );
}
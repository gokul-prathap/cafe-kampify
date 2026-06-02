import React, { useState, useEffect, useRef } from 'react';

// --- PARTICLE BURST ENGINE ---
function DynamicEmojiConfetti({ triggerType, activeKey }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!triggerType) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set viewport bounds entirely over the app screen layout
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const animationDuration = 1000; // Force run strictly for 1 second
    const startTime = Date.now();

    // Determine target assets based on selected filter mode
    const chickenPool = ['🍗', '🍖'];
    const vegPool = ['🥦', '🥑', '🥬', '🥕', '🫑', '🍅'];
    const confettiColors = ['#FFC107', '#4CAF50', '#00BCD4', '#E91E63', '#9C27B0', '#FF5722'];

    // Spawn Particles configuration
    const spawnCount = triggerType === 'nonveg' ? 45 : 80; // More count for mixed confetti combo

    for (let i = 0; i < spawnCount; i++) {
      // Explode outwards from lower-middle section or scatter across bottom horizontally
      const isVeg = triggerType === 'veg';
      particles.push({
        x: canvas.width * (0.2 + Math.random() * 0.6), // Random horizontal start spread
        y: canvas.height * 0.85,                       // Launch upwards from toggle button altitude zone
        size: Math.random() * 14 + 16,                 // Clean typography emoji scale sizing
        speedX: (Math.random() - 0.5) * 12,            // Arc outwards left/right
        speedY: -(Math.random() * 14 + 8),             // Power push velocity upward
        gravity: 0.45,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        opacity: 1,
        // Particle identity assignment
        type: isVeg ? (Math.random() > 0.4 ? 'confetti' : 'emoji') : 'emoji',
        char: isVeg ? vegPool[Math.floor(Math.random() * vegPool.length)] : chickenPool[Math.floor(Math.random() * chickenPool.length)],
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        shape: Math.random() > 0.5 ? 'circle' : 'rect'
      });
    }

    let animationFrameId;

    const renderLoop = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= animationDuration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return; // Break frame cycle precisely at 1000ms
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate fade-out track smoothly down to terminal edge
      const lifeRatio = elapsed / animationDuration;
      const currentOpacity = lifeRatio > 0.6 ? 1 - (lifeRatio - 0.6) / 0.4 : 1;

      particles.forEach((p) => {
        // Physics update velocity modifications
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity; // Gravity pulling weights downward gracefully
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'emoji') {
          // Render High Definition Text Emoji Layer
          ctx.font = `${p.size}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, 0, 0);
        } else {
          // Render Festive Confetti Geometry shapes
          ctx.fillStyle = p.color;
          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 3, -p.size / 6, p.size * 0.6, p.size * 0.3);
          }
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [triggerType, activeKey]);

  if (!triggerType) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,      // Ensures animation renders on top of cards, images, and footers
        pointerEvents: 'none' // Click-through enabled so users don't face interaction lag
      }}
    />
  );
}
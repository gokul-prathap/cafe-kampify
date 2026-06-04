import React, { useState, useEffect, useRef } from 'react';

// ================= AMBIENT NO-ITEMS ANIMATED COMPONENT =================
function NoItemsState() {
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '40px auto', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
        <defs>
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

          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B35" stop-opacity="0.15" />
            <stop offset="100%" stopColor="#FF6B35" stop-opacity="0" />
          </radialGradient>

          <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>

          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="50%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#6B7280" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="180" r="160" fill="url(#ambientGlow)" className="anim-glow" />

        {/* THE EMPTY PLATE */}
        <g id="plate-group">
          <ellipse cx="200" cy="195" rx="125" ry="85" fill="#111827" opacity="0.6" />
          <ellipse cx="200" cy="190" rx="125" ry="85" fill="url(#plateGradient)" stroke="#4B5563" stroke-width="3" />
          <ellipse cx="200" cy="193" rx="95" ry="60" fill="#111827" stroke="#374151" stroke-width="1.5" />
          <path d="M 120,180 Q 200,145 280,180" stroke="#9CA3AF" stroke-width="1" fill="none" opacity="0.15" />
        </g>

        {/* LONESOME FORK */}
        <g transform="rotate(-25, 75, 190)">
          <path d="M 75,280 L 75,170" stroke="url(#metalGradient)" stroke-width="7" stroke-linecap="round" />
          <path d="M 63,170 L 87,170 Q 87,140 75,140 Q 63,140 63,170 Z" fill="url(#metalGradient)" />
          <path d="M 69,140 L 69,165" stroke="#111827" stroke-width="3" stroke-linecap="round" />
          <path d="M 75,138 L 75,165" stroke="#111827" stroke-width="3" stroke-linecap="round" />
          <path d="M 81,140 L 81,165" stroke="#111827" stroke-width="3" stroke-linecap="round" />
        </g>

        {/* THE ANIMATED SEARCHING GLASS */}
        <g className="anim-glass">
          <path d="M 235,215 L 285,265" stroke="url(#metalGradient)" stroke-width="14" stroke-linecap="round" />
          <path d="M 255,235 L 280,260" stroke="#4B5563" stroke-width="6" stroke-linecap="round" />
          <circle cx="195" cy="165" r="55" fill="#1F2937" fill-opacity="0.2" stroke="url(#metalGradient)" stroke-width="10" />
          <circle cx="195" cy="165" r="55" fill="none" stroke="#111827" stroke-width="1" opacity="0.5" />
          <path d="M 155,150 A 48,48 0 0,1 215,122" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.3" />
          <g className="anim-eyes">
            <path d="M 165,165 Q 177,155 185,165" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M 205,165 Q 213,155 225,165" stroke="#9CA3AF" stroke-width="4" stroke-linecap="round" fill="none" />
          </g>
          <path d="M 183,190 Q 195,180 207,190" stroke="#FF6B35" stroke-width="4" stroke-linecap="round" fill="none" />
        </g>

        {/* FLOATING HUNGER ELEMENTS */}
        <g className="crumb-1"><circle cx="90" cy="110" r="4" fill="#FFB703" /></g>
        <g className="crumb-2"><circle cx="310" cy="130" r="5" fill="#E65F2B" /></g>
        <g className="crumb-3"><circle cx="290" cy="90" r="3" fill="#FFB703" /></g>
        <g className="crumb-4"><circle cx="110" cy="280" r="4" fill="#6B7280" /></g>
        <path d="M 305,120 L 315,120 M 310,115 L 310,125" stroke="#FFB703" stroke-width="1.5" className="target-cw" opacity="0.4" />
        <path d="M 85,140 L 95,140 M 90,135 L 90,145" stroke="#E65F2B" stroke-width="1.5" className="target-ccw" opacity="0.3" />

        {/* TYPOGRAPHY */}
        <text x="50%" y="335" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#334155" text-anchor="middle" letter-spacing="0.5">
          Your Plate is Empty!
        </text>
        <text x="50%" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#64748b" text-anchor="middle" letter-spacing="0.2">
          We couldn't find items matching your filters.
        </text>
      </svg>
    </div>
  );
}

// ================= DISH CARD VIEW COMPONENT =================
function ParallaxCard({ dish, itemQuantity, updateCart, handleRateItem }) {
  const cardRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      const viewCenter = windowHeight / 2;
      const percentageFromCenter = (cardCenter - viewCenter) / (windowHeight / 2);
      const boundedShift = Math.max(-1, Math.min(1, percentageFromCenter));
      setOffsetY(boundedShift * 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOptionSelect = (option) => {
    const sugarOptions = ["No Sugar", "Less Sugar"];
    const isSugarOption = sugarOptions.includes(option);
    setSelectedOptions((prev) => {
      if (prev.includes(option)) return prev.filter((opt) => opt !== option);
      if (isSugarOption) return [...prev.filter((opt) => !sugarOptions.includes(opt)), option];
      return [...prev, option];
    });
  };

  return (
    <div ref={cardRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', border: '1px solid #e2e8f0', borderRadius: '15px', padding: '16px', marginBottom: '16px', opacity: dish.available ? 1 : 0.55, position: 'relative', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '20px', minHeight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', width: '20px', height: '20px', marginRight: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className={dish.isVeg ? "animate-veg-seq" : "animate-nonveg-seq"} style={{ position: 'absolute', zIndex: 5, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
              <div className="final-indicator-badge final-indicator-badge-active" style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${dish.isVeg ? '#2e7d32' : '#c62828'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', transformOrigin: 'center center' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: dish.isVeg ? '#2e7d32' : '#c62828' }} />
              </div>
            </div>
            {(() => {
              // Setup local category indexing state dynamically per card instance
              const [currentCatIndex, setCurrentCatIndex] = useState(0);
              const cats = dish.categories || [];

              useEffect(() => {
                if (cats.length <= 1) return;
                const interval = setInterval(() => {
                  setCurrentCatIndex((prev) => (prev + 1) % cats.length);
                }, 2500); // Cycles to the next category entry every 2.5 seconds
                return () => clearInterval(interval);
              }, [cats]);

              return (
                <div style={{ display: 'inline-block', overflow: 'hidden', height: '18px',marginBottom:'10px' }}>
                  <style>{`
        @keyframes slideFadeCategory {
          0% { transform: translateY(12px); opacity: 0; filter: blur(2px); }
          20%, 80% { transform: translateY(0); opacity: 1; filter: blur(0px); }
          100% { transform: translateY(-12px); opacity: 0; filter: blur(2px); }
        }
        .animate-category-slide {
          display: inline-block;
          animation: slideFadeCategory 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
                  <span
                    key={currentCatIndex}
                    className="animate-category-slide"
                    style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', transition: 'all 0.7s ease' }}
                  >
                    {cats[currentCatIndex] || 'Food'}
                  </span>
                </div>
              );
            })()}
          </div>
          {!dish.available && <span style={{ color: '#c62828', fontSize: '12px', fontWeight: '700' }}>Sold Out</span>}
        </div>

        <div style={{ overflow: 'hidden', position: 'relative', borderRadius: '12px', height: '160px', width: '100%', marginTop: '8px', transform: 'none' }}>
          <div className="time-bubble-glass">🕒 {dish.time}</div>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '140%', objectFit: 'cover', position: 'absolute', left: 0, top: '-20%', transform: `translateY(${dish.tag ? 0 : offsetY}px) scale(1.05)`, transition: 'transform 0.05s ease-out', willChange: 'transform' }} />
        </div>

        <h4 style={{ fontSize: '16px', margin: '8px 0 8px', fontWeight: '800', color: '#1e293b' }}>{dish.name}</h4>

        {dish.optionalRequests && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', justifyContent: 'center' }}>
            {dish.optionalRequests.map((option, index) => (
              <button key={index} onClick={() => handleOptionSelect(option)} style={{ padding: '6px 10px', border: '1px solid #e2e8f0', borderRadius: '10px', backgroundColor: selectedOptions.includes(option) ? '#f59e0b' : '#fff', color: selectedOptions.includes(option) ? '#fff' : '#000', fontSize: '10px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', width: '100%', gap: '6px', overflow: 'hidden' }}>
        <span style={{ fontSize: 'clamp(15px, 4vw, 20px)', color: '#1e293b', fontWeight: '900', whiteSpace: 'nowrap', flexShrink: 0 }}>
          ₹{dish.price}
        </span>

        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '0', flexShrink: 0 }}>
          {!dish.available ? (
            <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>Unavailable</span>
          ) : itemQuantity === 0 ? (
            <button onClick={() => updateCart(dish.id, 1, selectedOptions)} style={{ backgroundColor: '#e2f2ed', color: '#10805c', border: 'none', padding: '6px 12px', borderRadius: '10px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}>
              ADD +
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <button onClick={() => updateCart(dish.id, -1, selectedOptions)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '12px', color: '#1e293b' }}>−</button>
              <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '14px', textAlign: 'center', color: '#1e293b' }}>{itemQuantity}</span>
              <button onClick={() => updateCart(dish.id, 1, selectedOptions)} style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '12px', color: '#1e293b' }}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= MAIN FOOD GRID CONTAINER INTERFACE =================
export default function FoodGrid({ processedDishes, cart, updateCart, handleRateItem }) {
  // If query returns nothing, swap layout rendering block with custom inline layout
  if (processedDishes.length === 0) {
    return <NoItemsState />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
      {processedDishes.map((dish) => {
        const itemQuantity = Object.values(cart).reduce((total, entry) => {
          if (entry && typeof entry === 'object' && entry.baseId === dish.id) {
            return total + (entry.qty || 0);
          }
          return total;
        }, 0);

        return (
          <ParallaxCard key={dish.id} dish={dish} itemQuantity={itemQuantity} updateCart={updateCart} handleRateItem={handleRateItem} />
        );
      })}
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: `2px solid ${dish.isVeg ? '#2e7d32' : '#c62828'}`, marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dish.isVeg ? '#2e7d32' : '#c62828' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{dish.category}</span>
          </div>
          {!dish.available && <span style={{ color: '#c62828', fontSize: '12px', fontWeight: '700' }}>Sold Out</span>}
        </div>

        {/* STATIC IMAGE WRAPPER CONTAINER - LOCKED IN PLACE */}
        <div style={{ overflow: 'hidden', position: 'relative', borderRadius: '12px', height: '160px', width: '100%', marginTop: '8px', transform: 'none' }}>
          
          {/* Glassmorphic Time Widget with Smooth Loop Fade Transitions */}
          <div className="time-bubble-glass">
            🕒 {dish.time}
          </div>

          {/* DYNAMIC MOVING IMAGE ELEMENT */}
          <img 
            src={dish.image} 
            alt={dish.name} 
            style={{ width: '100%', height: '140%', objectFit: 'cover', position: 'absolute', left: 0, top: '-20%', transform: `translateY(${dish.tag ? 0 : offsetY}px) scale(1.05)`, transition: 'transform 0.05s ease-out', willChange: 'transform' }} 
          />
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

     {/* PERFECTLY BOUNDED AND LOCKED ACTION FOOTER ROW */}
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', width: '100%', gap: '6px', overflow: 'hidden' }}>
        <span style={{ fontSize: 'clamp(15px, 4vw, 20px)', color: '#1e293b', fontWeight: '900', whiteSpace: 'nowrap', flexShrink: 0, paddingBottom: '0px' }}>
          ₹{dish.price}
        </span>

        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: '0', flexShrink: 0 }}>
          {!dish.available ? (
            <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>Unavailable</span>
          ) : itemQuantity === 0 ? (
            <button 
              onClick={() => updateCart(dish.id, 1, selectedOptions)} 
              style={{ backgroundColor: '#e2f2ed', color: '#10805c', border: 'none', padding: '6px 12px', borderRadius: '10px', fontWeight: '800', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
            >
              ADD +
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f1f5f9', padding: '3px 6px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <button 
                onClick={() => updateCart(dish.id, -1, selectedOptions)} 
                style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '12px', color: '#1e293b' }}
              >
                −
              </button>
              <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '14px', textAlign: 'center', color: '#1e293b' }}>
                {itemQuantity}
              </span>
              <button 
                onClick={() => updateCart(dish.id, 1, selectedOptions)} 
                style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '800', fontSize: '12px', color: '#1e293b' }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FoodGrid({ processedDishes, cart, updateCart, handleRateItem }) {
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
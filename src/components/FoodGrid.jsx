import React, { useState, useEffect, useRef } from 'react';

function ParallaxCard({ dish, itemQuantity, updateCart, handleRateItem }) {
  const cardRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]); // State to track selected options

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
      if (prev.includes(option)) {
        return prev.filter((opt) => opt !== option);
      } else if (isSugarOption) {
        const filtered = prev.filter((opt) => !sugarOptions.includes(opt));
        return [...filtered, option];
      } else {
        return [...prev, option];
      }
    });
  };

  return (
    <div
      ref={cardRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        border: '1px solid #e2e8f0',
        borderRadius: '15px',
        padding: '16px',
        marginBottom: '16px',
        opacity: dish.available ? 1 : 0.55,
        position: 'relative',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: `2px solid ${dish.isVeg ? '#2e7d32' : '#c62828'}`,
                marginRight: '8px',
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: dish.isVeg ? '#2e7d32' : '#c62828',
                  margin: 'auto',
                }}
              />
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{dish.category}</span>
          </div>
          {!dish.available && <span style={{ color: '#c62828', fontSize: '12px' }}>Sold Out</span>}
        </div>

        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            borderRadius: '12px',
            height: '160px',
            marginTop: '8px',
          }}
        >
          <img
            src={dish.image}
            alt={dish.name}
            style={{
              width: '100%',
              height: '130%',
              objectFit: 'cover',
              position: 'absolute',
              top: '-15%',
              left: 0,
              transform: `translateY(${offsetY}px) scale(1.1)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        <h4 style={{ fontSize: '16px', margin: '0px 0 8px' }}>{dish.name}</h4>

            <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '3px' }}>🕒 {dish.time}</div>

            {/* <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => dish.available && handleRateItem(dish.id, star)}
            style={{
              cursor: 'pointer',
              color: star <= Math.round(dish.initialRating) ? '#f59e0b' : '#cbd5e1',
            }}
          >
            ★
          </span>
        ))}
      </div> */}

        {/* Optional Requests Section */}
        {dish.optionalRequests && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '4px', justifyContent: 'center', }}>
            {dish.optionalRequests.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{
                  padding: '8px 8px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  backgroundColor: selectedOptions.includes(option) ? '#f59e0b' : '#fff',
                  color: selectedOptions.includes(option) ? '#fff' : '#000',
                  fontSize: '10px',
                  cursor: 'pointer',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0px' }}>
        <span style={{ fontSize: '30px', color: '#474747', fontWeight: 'bold' }}>₹{dish.price}</span>

        {!dish.available ? (
          <span style={{ color: '#c62828', fontSize: '12px' }}>Unavailable</span>
        ) : itemQuantity === 0 ? (
          <button
            onClick={() => updateCart(dish.id, 1)}
                        style={{ backgroundColor: '#e2f2ed', color: '#10805c', border: 'none', padding: '6px 14px', borderRadius: '10px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}
          >
            ADD +
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => updateCart(dish.id, -1)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e2e8f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              −
            </button>
            <span style={{ fontSize: '14px' }}>{itemQuantity}</span>
            <button
              onClick={() => updateCart(dish.id, 1)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e2e8f0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FoodGrid({ processedDishes, cart, updateCart, handleRateItem }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
      {processedDishes.map((dish) => {
        const itemQuantity = cart[dish.id] || 0;
        return (
          <ParallaxCard
            key={dish.id}
            dish={dish}
            itemQuantity={itemQuantity}
            updateCart={updateCart}
            handleRateItem={handleRateItem}
          />
        );
      })}
    </div>
  );
}
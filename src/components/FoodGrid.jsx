import React, { useState, useEffect, useRef } from 'react';

// Isolated Individual Parallax Card Item to optimize React rendering performance
function ParallaxCard({ dish, itemQuantity, updateCart, handleRateItem, styles }) {
  const cardRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      
      // Calculate where the food card sits relative to the screen viewport
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Get a progress factor between -1 and 1 based on screen position
      const cardCenter = rect.top + rect.height / 2;
      const viewCenter = windowHeight / 2;
      const percentageFromCenter = (cardCenter - viewCenter) / (windowHeight / 2);
      
      // Clamp values and set maximum shift radius to 24px
      const boundedShift = Math.max(-1, Math.min(1, percentageFromCenter));
      setOffsetY(boundedShift * 24); // Positive maps directly to reverse scroll parallax
    };

    // Attach event listeners to both the primary document window and any local layout wrapper
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to position the image perfectly right away
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ ...styles.foodCard, opacity: dish.available ? 1 : 0.55 }}
    >
      <div style={styles.cardHeaderArea}>
        <div style={{ ...styles.vegSquareIndicator, borderColor: dish.isVeg ? '#2e7d32' : '#c62828' }}>
          <div style={{ ...styles.vegCircleDot, backgroundColor: dish.isVeg ? '#2e7d32' : '#c62828' }} />
        </div>
        {!dish.available && <span style={styles.soldOutBadge}>Sold Out</span>}
      </div>

      {/* Parallax Viewport Window Box */}
      <div 
        style={{ 
          ...styles.cardImageWrapper,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '12px',
          height: '160px' // Ensure a consistent structural bounding box height
        }}
      >
        <img 
          src={dish.image} 
          alt={dish.name} 
          style={{
            width: '100%',
            height: '130%', // Tall scale factor so edges never show when shifting
            objectFit: 'cover',
            position: 'absolute',
            top: '-15%', // Base centering correction offset
            left: 0,
            /* Hardware-accelerated dynamic transformation matrix shift */
            transform: `translateY(${offsetY}px) scale(1.1)`,
            transition: 'transform 0.1s ease-out' // Micro-smoothing layer
          }}
        />
      </div>

      <h4 style={{ ...styles.cardFoodTitle, fontSize: '16px' }}>{dish.name}</h4>
      
      <div style={styles.cardDetailsRow}>
        <span style={{ fontSize: '11px', color: '#64748b' }}>🕒 {dish.time}</span>
        <span style={styles.cardRating}>⭐ {dish.initialRating}</span>
      </div>

      <div style={styles.interactiveStarsBar}>
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star} 
            onClick={() => dish.available && handleRateItem(dish.id, star)}
            style={{ ...styles.clickStar, color: star <= Math.round(dish.initialRating) ? '#f59e0b' : '#cbd5e1' }}
          >
            ★
          </span>
        ))}
      </div>

      <div style={styles.cardActionFooter}>
        <span style={styles.cardPrice}>₹{dish.price}</span>
        
        {!dish.available ? (
          <span style={styles.disabledText}>Unavailable</span>
        ) : itemQuantity === 0 ? (
          <button onClick={() => updateCart(dish.id, 1)} style={styles.initialAddBtn}>ADD +</button>
        ) : (
          <div style={styles.mathQuantityController}>
            <button onClick={() => updateCart(dish.id, -1)} style={styles.qtyMathActionBtn}>−</button>
            <span style={styles.qtyNumericDisplay}>{itemQuantity}</span>
            <button onClick={() => updateCart(dish.id, 1)} style={styles.qtyMathActionBtn}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FoodGrid({ processedDishes, cart, updateCart, handleRateItem, styles }) {
  return (
    <div style={styles.cardMatrixGrid}>
      {processedDishes.map(dish => {
        const itemQuantity = cart[dish.id] || 0;
        return (
          <ParallaxCard
            key={dish.id}
            dish={dish}
            itemQuantity={itemQuantity}
            updateCart={updateCart}
            handleRateItem={handleRateItem}
            styles={styles}
          />
        );
      })}
    </div>
  );
}
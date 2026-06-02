import React, { useState, useEffect } from 'react';

// Unified Menu dataset extracted from PDF and User Overrides
const INITIAL_MENU = [
  // STEWS
  { id: 's1', name: 'Veg Stew', price: 100, category: 'STEWS', isVeg: true, time: '45 min', initialRating: 4.5, available: true },
  { id: 's2', name: 'Chicken Stew', price: 150, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.7, available: true },
  { id: 's3', name: 'Beef Stew', price: 150, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.6, available: true },
  { id: 's4', name: 'Prawns Stew', price: 200, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.8, available: true },
  { id: 's5', name: 'Fish Stew', price: 300, category: 'STEWS', isVeg: false, time: '45 min', initialRating: 4.9, available: true },

  // APPETIZERS
  { id: 'a1', name: 'Chicken Nuggets', price: 120, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.4, available: true },
  { id: 'a2', name: 'Crab Claw', price: 200, category: 'APPETIZERS', isVeg: false, time: '25 min', initialRating: 4.6, available: true },
  { id: 'a3', name: 'Fish Finger', price: 150, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.5, available: true },
  { id: 'a4', name: 'Fish Fries', price: 200, category: 'APPETIZERS', isVeg: false, time: '20 min', initialRating: 4.7, available: true },
  { id: 'a5', name: 'French Fries', price: 100, category: 'APPETIZERS', isVeg: true, time: '15 min', initialRating: 4.3, available: true },
  { id: 'a6', name: 'Prawns Lollipop', price: 200, category: 'APPETIZERS', isVeg: false, time: '25 min', initialRating: 4.8, available: true },
  { id: 'a7', name: 'Veg Nuggets', price: 100, category: 'APPETIZERS', isVeg: true, time: '15 min', initialRating: 4.1, available: true },
  { id: 'a8', name: 'Crispy Happy Potato', price: 100, category: 'APPETIZERS', isVeg: true, time: '20 min', initialRating: 4.5, available: true },

  // MAGGIE
  { id: 'm1', name: 'Maggie Noodles', price: 70, category: 'MAGGIE', isVeg: true, time: '10 min', initialRating: 4.2, available: true },
  { id: 'm2', name: 'Egg Maggie', price: 100, category: 'MAGGIE', isVeg: false, time: '12 min', initialRating: 4.4, available: true },
  { id: 'm3', name: 'Veg Maggie', price: 80, category: 'MAGGIE', isVeg: true, time: '12 min', initialRating: 4.3, available: true },
  { id: 'm4', name: 'Chicken Maggie', price: 120, category: 'MAGGIE', isVeg: false, time: '15 min', initialRating: 4.6, available: false },

  // KERALA BREADS
  { id: 'b1', name: 'Chapathi', price: 15, category: 'KERALA BREADS', isVeg: true, time: '10 min', initialRating: 4.3, available: true },
  { id: 'b2', name: 'Soft Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.5, available: true },
  { id: 'b3', name: 'Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.4, available: true },
  { id: 'b4', name: 'Idiyappam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.6, available: true },
  { id: 'b5', name: 'Porotta', price: 25, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.9, available: true },
  { id: 'b6', name: 'Appam', price: 15, category: 'KERALA BREADS', isVeg: true, time: '12 min', initialRating: 4.5, available: true },
  { id: 'b7', name: 'Healthy Wheat Puttu', price: 20, category: 'KERALA BREADS', isVeg: true, time: '15 min', initialRating: 4.2, available: false },

  // MEALS
  { id: 'ml1', name: 'Veg Meals', price: 80, category: 'MEALS', isVeg: true, time: '20 min', initialRating: 4.5, available: true },
  { id: 'ml2', name: 'Fish Meals', price: 100, category: 'MEALS', isVeg: false, time: '20 min', initialRating: 4.8, available: true },

  // SAMPLE OTHER ITEMS FROM PDF SET TO UNAVAILABLE
  { id: 'pdf1', name: 'Chicken Fried Rice', price: 220, category: 'RICE BOWLS', isVeg: false, time: '25 min', initialRating: 4.6, available: false },
  { id: 'pdf2', name: 'Beef Dry Fry', price: 300, category: 'BEEF DELIGHTS', isVeg: false, time: '30 min', initialRating: 4.9, available: false },
  { id: 'pdf4', name: 'Fresh Lime', price: 40, category: 'REFRESHERS', isVeg: true, time: '5 min', initialRating: 4.4, available: true }
];

const CATEGORIES = ['ALL', 'STEWS', 'APPETIZERS', 'MAGGIE', 'KERALA BREADS', 'MEALS'];

export default function App() {
  const [view, setView] = useState('login'); 
  const [username, setUsername] = useState('');
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [cart, setCart] = useState({}); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [vegOnly, setVegOnly] = useState(false);
  const [showListedOnly, setShowListedOnly] = useState(false); 
  const [sortBy, setSortBy] = useState('default'); 

  useEffect(() => {
    const savedUser = localStorage.getItem('kampify_user');
    if (savedUser) {
      setUsername(savedUser);
      setView('home');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('kampify_user', username.trim());
      setView('home');
    }
  };

  const updateCart = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = currentQty + delta;
      const updated = { ...prev };
      if (newQty <= 0) {
        delete updated[id];
      } else {
        updated[id] = newQty;
      }
      return updated;
    });
  };

  const handleRateItem = (id, newRating) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, initialRating: parseFloat(newRating.toFixed(1)) };
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = menuItems.find(m => m.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  };

  const handleProceedOrder = () => {
    if (getCartCount() === 0) return;
    
    let message = `*Cafe Kampify Order*\n`;
    message += `*Customer Name:* ${username}\n`;
    message += `-------------------------\n`;
    
    Object.entries(cart).forEach(([id, qty]) => {
      const item = menuItems.find(m => m.id === id);
      if (item) {
        message += `• ${item.name} x ${qty} = ₹${item.price * qty}\n`;
      }
    });
    
    message += `-------------------------\n`;
    message += `*Total Amount:* ₹${getCartTotal()}\n\n`;
    message += `_Please arrange preparation. Order placed via web client._`;

    const whatsappUrl = `https://wa.me/919901299899?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesVeg = !vegOnly || item.isVeg;
    const matchesAvailability = !showListedOnly || item.available;
    return matchesSearch && matchesCategory && matchesVeg && matchesAvailability;
  }).sort((a, b) => {
    if (sortBy === 'priceLow') return a.price - b.price;
    if (sortBy === 'priceHigh') return b.price - a.price;
    if (sortBy === 'rating') return b.initialRating - a.initialRating;
    return 0; 
  });

  return (
    <div style={styles.appContainer}>
      {/* Dynamic Global Engine Injection targeting responsive layout crops */}
      <style>{`
        * {
          box-sizing: border-box !important;
          margin: 0;
          padding: 0;
        }
        body {
          background-color: #a4d4cd;
          margin: 0;
          padding: 0;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {view === 'login' ? (
        <div style={styles.loginScreen}>
          <div style={styles.loginHeaderVisual}>
            <div style={styles.saladArt}>🥗</div>
          </div>
          <h1 style={styles.loginTitle}>Hey!<br />Foodie</h1>
          <p style={styles.loginSubtitle}>Let's find your favorite food.</p>
          
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input 
              type="text" 
              placeholder="Enter your name..." 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={styles.loginInput}
              required
            />
            <button type="submit" style={styles.loginButton}>
              GET STARTED <span style={{ marginLeft: 8 }}>➔</span>
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.mainScreen}>
          <header style={styles.header}>
            <div>
              <p style={styles.welcomeGreeting}>Hello, {username}!</p>
              <h2 style={styles.brandTitle}>Cafe Kampify</h2>
            </div>
            <div style={styles.cartIconBadge} onClick={handleProceedOrder}>
              🛍️
              {getCartCount() > 0 && <span style={styles.badgeCount}>{getCartCount()}</span>}
            </div>
          </header>

          {/* Horizontal Flyer */}
          <div style={styles.flyerContainer}>
            <div className="hide-scroll" style={styles.flyerTrack}>
              <div style={styles.flyerCard}>
                ✨ <b>Today's Special:</b> Authentic Kerala Flavors prepared fresh on-order!
              </div>
              <div style={styles.flyerCard}>
                ⏳ <b>Patience is Rewarded:</b> Every dish is prepared fresh. Please allow 45 mins. [cite: 3, 5]
              </div>
              <div style={styles.flyerCard}>
                🍲 <b>Signature Stews:</b> Try our house-special Veg & Prawn Stews today.
              </div>
            </div>
          </div>

          <div style={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="🔍 Search exquisite food dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Controls Panel */}
          <div style={styles.controlsPanel}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <button 
                onClick={() => setVegOnly(!vegOnly)} 
                style={{ ...styles.toggleButton, backgroundColor: vegOnly ? '#0d6e6b' : '#fff', color: vegOnly ? '#fff' : '#333' }}
              >
                🌱 Veg Only
              </button>
              <button 
                onClick={() => setShowListedOnly(!showListedOnly)} 
                style={{ ...styles.toggleButton, backgroundColor: showListedOnly ? '#0d6e6b' : '#fff', color: showListedOnly ? '#fff' : '#333' }}
              >
                📦 Active Stock Only
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#666' }}>Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.selectDropdown}>
                <option value="default">Menu Order</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Horizontal Categories Grid Navigation */}
          <div className="hide-scroll" style={styles.categoryScroller}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.categoryTab,
                  backgroundColor: selectedCategory === cat ? '#0d6e6b' : '#eef6f5',
                  color: selectedCategory === cat ? '#fff' : '#555',
                  fontWeight: selectedCategory === cat ? '600' : '400'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Food Cards Grid */}
          <div style={styles.productGrid}>
            {filteredItems.map(item => {
              const qty = cart[item.id] || 0;
              return (
                <div 
                  key={item.id} 
                  style={{
                    ...styles.foodCard,
                    opacity: item.available ? 1 : 0.6,
                  }}
                >
                  <div style={styles.cardHeaderRow}>
                    <div style={{
                      ...styles.vegIndicatorBox, 
                      borderColor: item.isVeg ? '#2e7d32' : '#c62828'
                    }}>
                      <div style={{
                        ...styles.vegIndicatorDot, 
                        backgroundColor: item.isVeg ? '#2e7d32' : '#c62828'
                      }} />
                    </div>
                    {!item.available && <span style={styles.unavailBadge}>Unavailable</span>}
                  </div>

                  <div style={styles.foodImagePlaceholder}>
                    {item.isVeg ? '🥗' : '🍗'}
                  </div>

                  <div style={styles.cardMetaBody}>
                    <h4 style={styles.foodItemTitle}>{item.name}</h4>
                    
                    <div style={styles.timeRatingRow}>
                      <span style={styles.timeTag}>🕒 {item.time}</span>
                      <span style={styles.ratingText}>⭐ {item.initialRating}</span>
                    </div>

                    {/* Interactive User Stars Interface */}
                    <div style={styles.ratingSelectRow}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span 
                          key={star} 
                          onClick={() => item.available && handleRateItem(item.id, star)}
                          style={{
                            ...styles.rateStarItem,
                            color: star <= Math.round(item.initialRating) ? '#f59e0b' : '#cbd5e1'
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <div style={styles.cardPricingActionRow}>
                      <span style={styles.priceValue}>₹{item.price}</span>
                      
                      {!item.available ? (
                        <span style={styles.soldOutText}>Sold Out</span>
                      ) : qty === 0 ? (
                        <button 
                          onClick={() => updateCart(item.id, 1)}
                          style={styles.addCartBtn}
                        >
                          ADD +
                        </button>
                      ) : (
                        <div style={styles.counterControlWrapper}>
                          <button onClick={() => updateCart(item.id, -1)} style={styles.counterMathBtn}>−</button>
                          <span style={styles.counterNumericText}>{qty}</span>
                          <button onClick={() => updateCart(item.id, 1)} style={styles.counterMathBtn}>+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Checkout Bar */}
          {getCartCount() > 0 && (
            <div style={styles.stickyCheckoutBar}>
              <div style={styles.checkoutMetaSummary}>
                <span style={styles.checkoutCountText}>{getCartCount()} items selected</span>
                <span style={styles.checkoutTotalPrice}>₹{getCartTotal()}</span>
              </div>
              <button onClick={handleProceedOrder} style={styles.whatsappSubmitBtn}>
                Order via WhatsApp ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Fixed Responsive UI Styling Properties
const styles = {
  appContainer: {
    width: '100%',
    maxWidth: '480px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#d2e7e4',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#2d3748',
    boxShadow: '0 4px 25px rgba(0,0,0,0.1)',
    position: 'relative',
    overflowX: 'hidden',
  },
  loginScreen: {
    backgroundColor: '#0d6e6b',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '24px',
    color: '#fff',
  },
  loginHeaderVisual: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  saladArt: {
    fontSize: '76px',
    background: 'rgba(255,255,255,0.12)',
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: '44px',
    fontWeight: '800',
    lineHeight: '1.1',
    margin: '0 0 8px 0',
  },
  loginSubtitle: {
    fontSize: '16px',
    color: '#b2dfdb',
    margin: '0 0 32px 0',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  loginInput: {
    padding: '16px 20px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333',
  },
  loginButton: {
    padding: '16px',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#0d6e6b',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  mainScreen: {
    padding: '16px 14px 110px 14px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  welcomeGreeting: {
    fontSize: '13px',
    color: '#555',
    margin: 0,
  },
  brandTitle: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0d6e6b',
    margin: 0,
  },
  cartIconBadge: {
    fontSize: '24px',
    cursor: 'pointer',
    position: 'relative',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '50%',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  badgeCount: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#e53e3e',
    color: '#fff',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },
  flyerContainer: {
    backgroundColor: '#0d6e6b',
    borderRadius: '14px',
    padding: '12px',
    color: '#fff',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  flyerTrack: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    gap: '12px',
  },
  flyerCard: {
    flex: '0 0 100%',
    scrollSnapAlign: 'start',
    fontSize: '13px',
    lineHeight: '1.4',
  },
  searchWrapper: {
    marginBottom: '14px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '25px',
    border: '1px solid #cce2df',
    backgroundColor: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  controlsPanel: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '12px',
    marginBottom: '16px',
  },
  toggleButton: {
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid #cce2df',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  selectDropdown: {
    padding: '4px 8px',
    borderRadius: '8px',
    border: '1px solid #cce2df',
    backgroundColor: '#fff',
    fontSize: '12px',
    outline: 'none',
  },
  categoryScroller: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    marginBottom: '16px',
    paddingBottom: '2px',
    WebkitOverflowScrolling: 'touch',
  },
  categoryTab: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: 'none',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  vegIndicatorBox: {
    width: '14px',
    height: '14px',
    border: '1.5px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px',
  },
  vegIndicatorDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  unavailBadge: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    fontSize: '9px',
    padding: '1px 5px',
    borderRadius: '8px',
    fontWeight: '600',
  },
  foodImagePlaceholder: {
    height: '80px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    marginBottom: '8px',
  },
  cardMetaBody: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  foodItemTitle: {
    fontSize: '14px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#1a202c',
    lineHeight: '1.2',
  },
  timeRatingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  timeTag: {
    fontSize: '10px',
    color: '#718096',
  },
  ratingText: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#d97706',
  },
  ratingSelectRow: {
    display: 'flex',
    gap: '2px',
    marginBottom: '10px',
  },
  rateStarItem: {
    cursor: 'pointer',
    fontSize: '14px',
    userSelect: 'none',
  },
  cardPricingActionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  priceValue: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0d6e6b',
  },
  addCartBtn: {
    backgroundColor: '#eef6f5',
    color: '#0d6e6b',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '11px',
    cursor: 'pointer',
  },
  counterControlWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#0d6e6b',
    borderRadius: '12px',
    padding: '2px 4px',
  },
  counterMathBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    width: '20px',
    height: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '700',
  },
  counterNumericText: {
    color: '#fff',
    padding: '0 4px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '14px',
    textAlign: 'center',
  },
  soldOutText: {
    fontSize: '11px',
    color: '#a0aec0',
    fontWeight: '600',
  },
  stickyCheckoutBar: {
    position: 'fixed',
    bottom: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 24px)',
    maxWidth: '456px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
  checkoutMetaSummary: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkoutCountText: {
    fontSize: '11px',
    color: '#718096',
  },
  checkoutTotalPrice: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0d6e6b',
  },
  whatsappSubmitBtn: {
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
  }
};
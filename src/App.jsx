import React, { useState, useEffect } from 'react';
import { INITIAL_MENU } from './data/menuData';
import PromoBanners from './components/PromoBanners';
import CategoryTabs from './components/CategoryTabs';
import AIChatBot from './components/AIChatBot';
import CartPage from './components/CartPage';

export default function App() {
  const [view, setView] = useState('login'); // login | home | cart
  const [username, setUsername] = useState('');
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [cart, setCart] = useState({});
  

  // Dynamic Query Filter Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [vegOnly, setVegOnly] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const cachedUser = localStorage.getItem('kampify_user');
    if (cachedUser) { setUsername(cachedUser); setView('home'); }
    const savedOrdered = localStorage.getItem('kampify_ordered') === 'true';
    const savedSeconds = parseInt(localStorage.getItem('kampify_seconds') || '0');
    const savedAt = parseInt(localStorage.getItem('kampify_ordered_at') || '0');
    if (savedOrdered && savedSeconds > 0 && savedAt > 0) {
      const elapsed = Math.floor((Date.now() - savedAt) / 1000);
      const remaining = savedSeconds - elapsed;
      if (remaining > 0) { setOrdered(true); setSecondsLeft(remaining); }
    }
  }, []);

  useEffect(() => {
    if (!ordered) return;
    const interval = setInterval(() => {
      setSecondsLeft(s => {
        const next = s <= 1 ? 0 : s - 1;
        localStorage.setItem('kampify_seconds', String(next));
        if (next === 0) clearInterval(interval);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [ordered]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('kampify_user', username.trim());
      setView('home');
    }
  };

  const updateCart = (id, change) => {
    setCart(prev => {
      const updated = { ...prev };
      const currentQty = updated[id] || 0;
      const calculatedQty = currentQty + change;
      if (calculatedQty <= 0) delete updated[id];
      else updated[id] = calculatedQty;
      return updated;
    });
  };

  const handleRateItem = (id, rating) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, initialRating: rating } : item));
  };

  const getCartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);

  const processedDishes = menuItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchVeg = !vegOnly || item.isVeg;
    const matchAvail = !showActiveOnly || item.available;
    return matchSearch && matchCat && matchVeg && matchAvail;
  });

  if (view === 'cart') {
    return (
      <CartPage 
        cart={cart} 
        menuItems={menuItems} 
        updateCart={updateCart} 
        username={username}
        onBack={() => setView('home')}
        ordered={ordered}
        setOrdered={setOrdered}
        setSecondsLeft={setSecondsLeft}
        secondsLeft={secondsLeft}
      />
    );
  }

  return (
    <div style={{ ...styles.appWrapper, fontSize: `${16}px` }}>
      {/* Absolute Master Reset Injection Overrides */}
      <style>{`
        * { box-sizing: border-box !important; margin: 0; padding: 0; }
        body { background-color: #022319; font-family: system-ui, -apple-system, sans-serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }

      `}</style>

      {view === 'login' ? (
        <div style={styles.loginContainer}>
          <div style={styles.loginArt}>🥗</div>
          <h1 style={styles.loginHeading}>Hey!<br />Foodie</h1>
          <p style={styles.loginBody}>Let's find your favorite food.</p>
          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input 
              type="text" 
              placeholder="Enter your name..." 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              style={styles.loginInput} 
              required 
            />
            <button type="submit" style={styles.loginSubmit}>GET STARTED ➔</button>
          </form>
        </div>
      ) : (
        <div style={styles.mainFeed}>
          {/* Swiggy Image 3 Style Top Header Integration Block */}
          <div style={styles.topGreenSection}>
            <header style={styles.brandHeader}>
              <div>
                <p style={styles.welcomeText}>Hello, {username}!</p>
                <h2 style={styles.brandName}>Cafe Kampify</h2>
              </div>
              
              {/* Accessibility Font Switcher Layout */}
              <div style={styles.accessibilityGroup}>
                <div onClick={() => setView('cart')} style={styles.cartFABIcon}>
                  🛒{getCartCount() > 0 && <span style={styles.cartCountBadge}>{getCartCount()}</span>}
                </div>
              </div>
            </header>

            {/* Custom Interactive Search Panel Wrapper */}
            <div style={styles.searchRowContainer}>
              <div style={styles.searchBarWrapper}>
                <span style={styles.searchIcon}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Search for 'Pizza' or Stews..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={styles.searchInputField}
                />
                <span style={styles.micIcon}>🎙️</span>
              </div>
              
              {/* Image 3 Native Box Style Veg Switch */}
              <div 
                onClick={() => setVegOnly(!vegOnly)} 
                style={{ ...styles.vegToggleSquare, backgroundColor: vegOnly ? '#10805c' : '#fff' }}
              >
                <span style={{ fontSize: '10px', fontWeight: '800', color: vegOnly ? '#fff' : '#444' }}>VEG</span>
                <div style={{ ...styles.vegDotBox, borderColor: vegOnly ? '#fff' : '#2e7d32' }}>
                  <div style={{ ...styles.vegInnerDot, backgroundColor: '#2e7d32' }} />
                </div>
              </div>
            </div>

            {/* Promo Banner Rows Carousel Element */}
            <PromoBanners ordered={ordered} secondsLeft={secondsLeft} />
          </div>

          <div style={styles.bottomWhiteSection}>
            {/* Image 2 Swiggy Style Interactive Category Tabs */}
            <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* Global Auxiliary Filters Menu Row */}
            <div style={styles.filterMenuRow}>
              <button 
                onClick={() => setShowActiveOnly(!showActiveOnly)} 
                style={{ ...styles.auxFilterBtn, backgroundColor: showActiveOnly ? '#04432f' : '#f1f5f9', color: showActiveOnly ? '#fff' : '#333' }}
              >
                📦 Active Stock Only
              </button>
              <span style={{ fontSize: '12px', color: '#666' }}>Dishes listed: {processedDishes.length}</span>
            </div>

            {/* High Fidelity Food Cards Responsive Matrix Grid */}
            <div style={styles.cardMatrixGrid}>
              {processedDishes.map(dish => {
                const itemQuantity = cart[dish.id] || 0;
                return (
                  <div 
                    key={dish.id} 
                    style={{ ...styles.foodCard, opacity: dish.available ? 1 : 0.55 }}
                  >
                    <div style={styles.cardHeaderArea}>
                      <div style={{ ...styles.vegSquareIndicator, borderColor: dish.isVeg ? '#2e7d32' : '#c62828' }}>
                        <div style={{ ...styles.vegCircleDot, backgroundColor: dish.isVeg ? '#2e7d32' : '#c62828' }} />
                      </div>
                      {!dish.available && <span style={styles.soldOutBadge}>Sold Out</span>}
                    </div>

                    <div style={styles.cardImageWrapper}>
                      <img src={dish.image} alt={dish.name} style={styles.cardVisualAsset} />
                    </div>

                    <h4 style={{ ...styles.cardFoodTitle, fontSize: `${16}px` }}>{dish.name}</h4>
                    
                    <div style={styles.cardDetailsRow}>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>🕒 {dish.time}</span>
                      <span style={styles.cardRating}>⭐ {dish.initialRating}</span>
                    </div>

                    {/* Quality Star Rating Feedback Handler Block */}
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
              })}
            </div>
          </div>

          {/* Integrated AI Support Engine Float Layer */}
          <AIChatBot menuItems={menuItems} updateCart={updateCart} />

          {/* Sticky Order Now Bar */}
          {getCartCount() > 0 && (
            <div style={styles.stickyOrderBar}>
              <div style={styles.stickyOrderInfo}>
                <span style={styles.stickyCount}>{getCartCount()} item{getCartCount() > 1 ? 's' : ''}</span>
                <span style={styles.stickyLabel}>in your basket</span>
              </div>
              <button onClick={() => setView('cart')} style={styles.stickyOrderBtn}>
                View Order ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Fluid Responsive Styling Configuration
const styles = {
  appWrapper: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '10%',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: '#04432f',
    position: 'relative',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },
  loginContainer: {
    backgroundColor: '#04432f',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '32px',
    color: '#fff'
  },
  loginArt: { fontSize: '80px', textAlign: 'center', marginBottom: '16px' },
  loginHeading: { fontSize: '46px', fontWeight: '900', lineHeight: '1.1', marginBottom: '8px' },
  loginBody: { fontSize: '16px', color: '#a3b8b0', marginBottom: '40px' },
  loginForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  loginInput: { padding: '18px 24px', borderRadius: '30px', border: 'none', fontSize: '16px', outline: 'none' },
  loginSubmit: { padding: '18px', borderRadius: '30px', border: 'none', backgroundColor: '#14a375', color: '#white', fontWeight: '800', cursor: 'pointer', fontSize: '16px', color: '#fff' },
  
  mainFeed: { display: 'flex', flexDirection: 'column', width: '100%' },
  topGreenSection: { backgroundColor: '#04432f', padding: '16px 16px 8px 16px' },
  brandHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', marginBottom: '16px' },
  welcomeText: { fontSize: '12px', color: '#a3b8b0' },
  brandName: { fontSize: '24px', fontWeight: '900' },
  accessibilityGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  fontBtn: { backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  cartFABIcon: { fontSize: '22px', cursor: 'pointer', position: 'relative', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '50%' },
  cartCountBadge: { position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  
  searchRowContainer: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', width: '100%' },
  searchBarWrapper: { flex: 1, backgroundColor: '#fff', borderRadius: '30px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
  searchIcon: { color: '#888', fontSize: '16px' },
  searchInputField: { flex: 1, border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent' },
  micIcon: { fontSize: '16px', color: '#10805c' },
  vegToggleSquare: { width: '48px', height: '44px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  vegDotBox: { width: '12px', height: '12px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' },
  vegInnerDot: { width: '6px', height: '6px', borderRadius: '50%' },
  
  bottomWhiteSection: { backgroundColor: '#f8fafc', borderRadius: '24px 24px 0 0', padding: '20px 14px 100px 14px', flex: 1 },
  filterMenuRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  auxFilterBtn: { border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  
  cardMatrixGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', width: '100%' },
  foodCard: { backgroundColor: '#fff', borderRadius: '20px', padding: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  cardHeaderArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  vegSquareIndicator: { width: '14px', height: '14px', border: '1.5px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' },
  vegCircleDot: { width: '6px', height: '6px', borderRadius: '50%' },
  soldOutBadge: { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '6px' },
  cardImageWrapper: { width: '100%', height: '100px', borderRadius: '14px', overflow: 'hidden', marginBottom: '8px' },
  cardVisualAsset: { width: '100%', height: '100px', objectFit: 'cover' },
  cardFoodTitle: { fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px 0', lineHeight: '1.2' },
  cardDetailsRow: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '6px' },
  interactiveStarsBar: { display: 'flex', gap: '2px', marginBottom: '12px' },
  clickStar: { cursor: 'pointer', fontSize: '13px' },
  cardActionFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  cardPrice: { fontSize: '16px', fontWeight: '900', color: '#04432f' },
  initialAddBtn: { backgroundColor: '#e2f2ed', color: '#10805c', border: 'none', padding: '6px 14px', borderRadius: '10px', fontWeight: '800', fontSize: '11px', cursor: 'pointer' },
  mathQuantityController: { display: 'flex', alignItems: 'center', backgroundColor: '#10805c', borderRadius: '10px', padding: '2px 4px' },
  qtyMathActionBtn: { background: 'none', border: 'none', color: '#fff', width: '20px', height: '20px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' },
  qtyNumericDisplay: { color: '#fff', fontSize: '12px', padding: '0 4px', minWidth: '14px', textAlign: 'center', fontWeight: '700' },
  disabledText: { fontSize: '11px', color: '#cbd5e1', fontWeight: '600' },
  stickyOrderBar: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', backgroundColor: '#04432f', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 998, boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' },
  stickyOrderInfo: { display: 'flex', flexDirection: 'column' },
  stickyCount: { color: '#fff', fontWeight: '800', fontSize: '15px' },
  stickyLabel: { color: '#a3b8b0', fontSize: '11px' },
  stickyOrderBtn: { backgroundColor: '#14a375', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer' },
};
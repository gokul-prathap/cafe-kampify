import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_MENU } from './data/menuData';
import PromoBanners from './components/PromoBanners';
import CategoryTabs from './components/CategoryTabs';
import AIChatBot from './components/AIChatBot';
import CartPage from './components/CartPage';
import FloatingBubbles from './components/FloatingBubbles';
import Footer from './components/Footer';
import FoodGrid from './components/FoodGrid';
import TopWaves from './components/TopWaves';

export default function App() {
  const [view, setView] = useState('login'); // login | home | cart
  const [username, setUsername] = useState('');
  const [countryCode, setCountryCode] = useState(() => localStorage.getItem('kampify_cc') || '+91');
  const [phone, setPhone] = useState(() => localStorage.getItem('kampify_phone') || '');
  const [ccSearch, setCcSearch] = useState('');
  const [ccOpen, setCcOpen] = useState(false);
  const [dialCode, setDialCode] = useState('+91');

  const COUNTRY_CODES = [
    { code: '+91', flag: '🇮🇳', name: 'India', maxLen: 10 },
    { code: '+1', flag: '🇺🇸', name: 'United States', maxLen: 10 },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom', maxLen: 10 },
    { code: '+61', flag: '🇦🇺', name: 'Australia', maxLen: 9 },
    { code: '+971', flag: '🇦🇪', name: 'UAE', maxLen: 9 },
    { code: '+65', flag: '🇸🇬', name: 'Singapore', maxLen: 8 },
    { code: '+60', flag: '🇲🇾', name: 'Malaysia', maxLen: 10 },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia', maxLen: 9 },
    { code: '+974', flag: '🇶🇦', name: 'Qatar', maxLen: 8 },
    { code: '+968', flag: '🇴🇲', name: 'Oman', maxLen: 8 },
    { code: '+49', flag: '🇩🇪', name: 'Germany', maxLen: 11 },
    { code: '+33', flag: '🇫🇷', name: 'France', maxLen: 9 },
    { code: '+81', flag: '🇯🇵', name: 'Japan', maxLen: 10 },
    { code: '+86', flag: '🇨🇳', name: 'China', maxLen: 11 },
    { code: '+880', flag: '🇧🇩', name: 'Bangladesh', maxLen: 10 },
    { code: '+94', flag: '🇱🇰', name: 'Sri Lanka', maxLen: 9 },
    { code: '+977', flag: '🇳🇵', name: 'Nepal', maxLen: 10 },
  ];
  const filteredCC = COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(ccSearch.toLowerCase()) || c.code.includes(ccSearch)
  );
  const selectedCC = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];

  const nameProgress = Math.min(1, username.trim().length / 10);
  const phoneProgress = Math.min(1, phone.trim().length / 10);
  const loginProgress = Math.round((nameProgress + phoneProgress) / 2 * 100);

  const [nameFlip, setNameFlip] = useState(0);
  const [phoneFlip, setPhoneFlip] = useState(0);
  const keypressFlip = nameFlip + phoneFlip;
  const [iconSize, setIconSize] = useState(200);
  const [iconJumping, setIconJumping] = useState(false);
  const iconSizeRef = useRef(200);
  const jumpTimerRef = useRef(null);

  const handleNameKey = () => setNameFlip(f => f + 1);

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    const maxLen = selectedCC?.maxLen || 10;
    if (digitsOnly.length <= maxLen) setPhone(digitsOnly);
  };

  const handlePhoneKey = (e) => {
    setPhoneFlip(f => f + 1);
    const maxLen = selectedCC?.maxLen || 10;
    const vh = window.innerHeight;
    const minSize = 200;
    const stepSize = (vh - minSize) / maxLen;
    if (e.key === 'Backspace') {
      iconSizeRef.current = Math.max(minSize, iconSizeRef.current - stepSize);
      setIconSize(iconSizeRef.current);
    } else if (/^[0-9]$/.test(e.key)) {
      iconSizeRef.current = Math.min(vh, iconSizeRef.current + stepSize);
      setIconSize(iconSizeRef.current);
      setIconJumping(false);
      clearTimeout(jumpTimerRef.current);
      requestAnimationFrame(() => {
        setIconJumping(true);
        jumpTimerRef.current = setTimeout(() => setIconJumping(false), 500);
      });
    }
  };
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [cart, setCart] = useState({});


  // Dynamic Query Filter Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const cachedUser = localStorage.getItem('kampify_user');
    const cachedCC = localStorage.getItem('kampify_cc');
    const cachedPhone = localStorage.getItem('kampify_phone');
    if (cachedUser) { setUsername(cachedUser); setView('home'); }
    if (cachedCC) setCountryCode(cachedCC);
    if (cachedPhone) setPhone(cachedPhone);
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
    if (username.trim() && phone.trim()) {
      localStorage.setItem('kampify_user', username.trim());
      localStorage.setItem('kampify_cc', countryCode);
      localStorage.setItem('kampify_phone', phone.trim());
      setView('home');
    }
  };

  // UPDATED: Supports storing item arrays mapped to options configurations
  const updateCart = (idOrKey, change, selectedOptions = []) => {
    setCart(prev => {
      const updated = { ...prev };
      let dynamicKey = idOrKey;
      if (!idOrKey.includes('-') && selectedOptions.length > 0) {
        dynamicKey = `${idOrKey}-${[...selectedOptions].sort().join(',')}`;
      }
      const baseId = idOrKey.split('-')[0];
      const currentItem = updated[dynamicKey] || { qty: 0, options: selectedOptions, baseId: baseId };
      const calculatedQty = currentItem.qty + change;

      if (calculatedQty <= 0) {
        delete updated[dynamicKey];
      } else {
        updated[dynamicKey] = {
          qty: calculatedQty,
          options: currentItem.options,
          baseId: baseId
        };
      }
      return updated;
    });
  };

  const handleRateItem = (id, rating) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, initialRating: rating } : item));
  };

  const getCartCount = () => Object.values(cart).reduce((a, b) => a + (b?.qty || 0), 0);

  const processedDishes = menuItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = (
      selectedCategory === 'ALL' ||
      (selectedCategory === 'BEVERAGES' && (item.category === 'BEVERAGES' || item.category === 'HOT DRINKS')) ||
      (selectedCategory === 'SEAFOOD' && (item.category === 'SEAFOOD' || item.category === 'BACKWATER FISH SPECIALS')) ||
      (selectedCategory === 'STEWS' && item.name.toLowerCase().includes('stew')) ||
      (selectedCategory === 'MEAT FAVOURITES' && (item.category === 'CRAB' || item.category === 'PRAWNS')) ||
      item.category === selectedCategory
    );
    const matchVeg = !vegOnly || item.isVeg;
    const matchNonVeg = !nonVegOnly || !item.isVeg;
    const matchAvail = !showActiveOnly || item.available;
  
    return matchSearch && matchCat && matchVeg && matchNonVeg && matchAvail;
  });
  const handleClearCart = () => {
    setCart({});
  };

  if (view === 'cart') {
    return (
      <CartPage
        cart={cart}
        menuItems={menuItems}
        updateCart={updateCart}
        username={username}
        onBack={() => setView('home')}
        clearCart={handleClearCart}
        ordered={ordered}
        setOrdered={setOrdered}
        setSecondsLeft={setSecondsLeft}
        secondsLeft={secondsLeft}
      />
    );
  }
  const validatePhoneNumber = (phone, dialCode) => {
    const num = phone.replace(/\D/g, '');
    const rules = {
      '+91': [10, 10], '+1': [10, 10], '+44': [10, 10],
      '+61': [9, 9], '+33': [9, 9], '+49': [10, 11],
      '+971': [9, 9], '+65': [8, 8], '+81': [9, 10], '+31': [9, 9]
    }[dialCode] || [7, 14];
    return num.length >= rules[0] && num.length <= rules[1];
  };

  const isValid = validatePhoneNumber(phone, dialCode);

  return (
    <div style={{ ...styles.appWrapper, fontSize: `${16}px` }}>
      {/* Absolute Master Reset Injection Overrides */}
      <style>{`
        * { box-sizing: border-box !important; margin: 0; padding: 0; }
        body { background-color: #022319; font-family: system-ui, -apple-system, sans-serif; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes iconJump {
          0%   { transform: translateY(0) scale(1); }
          20%  { transform: translateY(-50px) scale(1.15); }
          50%  { transform: translateY(-20px) scale(1.08); }
          70%  { transform: translateY(-35px) scale(1.11); }
          100% { transform: translateY(0) scale(1); }
        }
        .icon-jumping { animation: iconJump 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1) translateY(0); text-shadow: 0 0 20px rgba(56,239,125,0.5), 0 0 40px rgba(56,239,125,0.2); }
          30% { transform: scale(1.06) translateY(-4px); text-shadow: 0 0 40px rgba(56,239,125,0.9), 0 0 80px rgba(56,239,125,0.4); }
          60% { transform: scale(0.97) translateY(2px); text-shadow: 0 0 10px rgba(56,239,125,0.3); }
        }
        @keyframes exclaim { 0%,100%{transform:scale(1) rotate(0deg);} 20%{transform:scale(1.6) rotate(-8deg);} 40%{transform:scale(1.8) rotate(6deg);} 60%{transform:scale(1.5) rotate(-5deg);} 80%{transform:scale(1.65) rotate(4deg);} }
        .exclaim { display:inline-block; animation:exclaim 2s ease-in-out infinite; transform-origin:bottom center; }
        @keyframes bowlFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes steamRise { 0%{opacity:0;transform:translateY(0) scaleX(1);} 40%{opacity:0.5;} 100%{opacity:0;transform:translateY(-18px) scaleX(1.3);} }
        @keyframes bowlGlow  { 0%,100%{filter:drop-shadow(0 0 8px rgba(56,239,125,0.35));} 50%{filter:drop-shadow(0 0 22px rgba(56,239,125,0.75));} }
        .bowl-wrap { animation: bowlFloat 3s ease-in-out infinite, bowlGlow 3s ease-in-out infinite; }
        .steam1 { animation: steamRise 2s ease-out infinite; }
        .steam2 { animation: steamRise 2s ease-out 0.6s infinite; }
        .steam3 { animation: steamRise 2s ease-out 1.2s infinite; }
      `}</style>

      {view === 'login' ? (
        <div style={styles.loginContainer}>
          <TopWaves />
          <FloatingBubbles progress={loginProgress} keypressFlip={keypressFlip} />
          <div style={styles.loginTop}>
            <span style={styles.loginAccentTitle}>✦ Cafe Kampify ✦</span>
          </div>

          <div className="bowl-wrap" style={{ zIndex: 2, margin: '16px 0 20px', flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" width="220" height="220">
              <circle cx="60" cy="60" r="58" fill="none" stroke="rgba(56,239,125,0.55)" strokeWidth="1.5" filter="url(#glow)" />
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="60" cy="60" r="58" fill="rgba(255,255,255,0.07)" />
              <circle cx="60" cy="60" r="46" fill="rgba(255,255,255,0.10)" />
              <path className="steam1" d="M 48,46 Q 51,40 48,34" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
              <path className="steam2" d="M 60,44 Q 63,38 60,32" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
              <path className="steam3" d="M 72,46 Q 75,40 72,34" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="60" cy="75" rx="34" ry="12" fill="#78350f" />
              <path d="M 26,62 Q 60,90 94,62 Q 60,78 26,62 Z" fill="#92400e" />
              <ellipse cx="60" cy="62" rx="34" ry="8" fill="#b45309" />
              <text x="38" y="60" style={{ fontSize: '22px' }}>🥗</text>
              <text x="62" y="56" style={{ fontSize: '14px' }}>🍗</text>
              <text x="58" y="70" style={{ fontSize: '12px' }}>🫓</text>
            </svg>
          </div>

          <h1 style={styles.loginHeading}>Hey,<br /><span style={styles.loginHeadingAccent}>Foodie <span className="exclaim">!</span></span></h1>
          <p style={styles.loginBody}>Let's find your favorite food.</p>

          <form onSubmit={handleLogin} style={styles.loginForm}>
            <input
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleNameKey}
              style={styles.loginInput}
              required
            />

            <div style={styles.phoneRow}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setCcOpen(o => !o)}
                  style={styles.ccTrigger}
                >
                  {selectedCC.flag} {selectedCC.code} ▾
                </button>
                {ccOpen && (
                  <div style={styles.ccDropdown}>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search country..."
                      value={ccSearch}
                      onChange={e => setCcSearch(e.target.value)}
                      style={styles.ccSearch}
                    />
                    <div style={styles.ccList}>
                      {filteredCC.map(c => (
                        <div
                          key={c.code}
                          onClick={() => { setCountryCode(c.code); setCcOpen(false); setCcSearch(''); }}
                          style={{ ...styles.ccItem, backgroundColor: c.code === countryCode ? '#e2f2ed' : '#fff' }}
                        >
                          <span>{c.flag}</span>
                          <span style={{ flex: 1, fontSize: '13px' }}>{c.name}</span>
                          <span style={{ fontSize: '12px', opacity: 0.6 }}>{c.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="WhatsApp number"
                value={phone}
                onChange={handlePhoneChange}
                onKeyDown={handlePhoneKey}
                style={styles.phoneInput}
                required
              />
            </div>

            <button type="submit" style={styles.loginSubmit} disabled={!isValid}>GET STARTED ➔</button>
          </form>
          <Footer />
        </div>
      ) : (
        <div style={styles.mainFeed}>
          <div style={styles.topGreenSection}>
            <header style={styles.brandHeader}>
              <div>
                <p style={styles.welcomeText}>Hello, {username}!</p>
                <h2 style={styles.brandName}>Cafe Kampify</h2>
              </div>

              <div style={styles.accessibilityGroup}>
                <div onClick={() => setView('cart')} style={styles.cartFABIcon}>
                  🛒{getCartCount() > 0 && <span style={styles.cartCountBadge}>{getCartCount()}</span>}
                </div>
              </div>
            </header>

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
              </div>

              <div
                onClick={() => { setNonVegOnly(!nonVegOnly); if (!nonVegOnly) setVegOnly(false); }}
                style={{
                  ...styles.vegToggleSquare,
                  backgroundColor: nonVegOnly ? '#c62828' : '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px'
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: '800', color: nonVegOnly ? '#fff' : '#444', lineHeight: '1' }}>
                  NON
                </span>
                <div style={{ ...styles.vegDotBox, borderColor: nonVegOnly ? '#fff' : '#c62828', margin: 0 }}>
                  <div style={{ ...styles.vegInnerDot, backgroundColor: '#c62828' }} />
                </div>
              </div>

              <div
                onClick={() => { setVegOnly(!vegOnly); if (!vegOnly) setNonVegOnly(false); }}
                style={{ ...styles.vegToggleSquare, backgroundColor: vegOnly ? '#10805c' : '#fff' }}
              >
                <span style={{ fontSize: '10px', fontWeight: '800', color: vegOnly ? '#fff' : '#444' }}>VEG</span>
                <div style={{ ...styles.vegDotBox, borderColor: vegOnly ? '#fff' : '#2e7d32' }}>
                  <div style={{ ...styles.vegInnerDot, backgroundColor: '#2e7d32' }} />
                </div>
              </div>
            </div>

            <PromoBanners ordered={ordered} secondsLeft={secondsLeft} cart={cart} updateCart={updateCart} handleRateItem={handleRateItem} />
          </div>

          <div style={styles.bottomWhiteSection}>
            <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <div style={styles.filterMenuRow}>
              <button
                onClick={() => setShowActiveOnly(!showActiveOnly)}
                style={{ ...styles.auxFilterBtn, backgroundColor: showActiveOnly ? '#04432f' : '#f1f5f9', color: showActiveOnly ? '#fff' : '#333' }}
              >
                📦 Active Stock Only
              </button>
              <span style={{ fontSize: '12px', color: '#666' }}>Items: {processedDishes.length}</span>
            </div>

            <FoodGrid
              processedDishes={processedDishes}
              cart={cart}
              updateCart={updateCart}
              handleRateItem={handleRateItem}
              styles={styles}
            />
          </div>

          <AIChatBot menuItems={menuItems} updateCart={updateCart} />

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

const styles = {
  appWrapper: { width: '100%', maxWidth: '100%', minWidth: '10%', margin: '0 auto', minHeight: '100vh', backgroundColor: '#04432f', position: 'relative', overflowX: 'hidden', display: 'flex', flexDirection: 'column' },
  loginContainer: { backgroundColor: '#04432f', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyY: 'center', justifyContent: 'center', padding: '40px 32px 48px', color: '#fff', position: 'relative', textAlign: 'center', gap: '0px' },
  loginTop: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', zIndex: 2, position: 'relative' },
  loginAccentDot: { color: '#38ef7d', fontSize: '14px' },
  loginAccentTitle: { fontSize: 'clamp(16px, 6vw, 24px)', fontWeight: '900', letterSpacing: '3px', color: '#fff', textTransform: 'uppercase', whiteSpace: 'nowrap', animation: 'titlePulse 2.5s ease-in-out infinite', textShadow: '0 0 20px rgba(56,239,125,0.5), 0 0 40px rgba(56,239,125,0.2)' },
  loginIconWrap: { marginBottom: '16px', zIndex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'width 0.3s ease, height 0.3s ease' },
  loginHeading: { fontSize: 'clamp(33px, 6vw, 42px)', fontWeight: '900', lineHeight: '1.1', marginBottom: '8px', zIndex: 1 },
  loginHeadingAccent: { color: '#38ef7d' },
  loginBody: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '36px', zIndex: 1 },
  loginForm: { display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '360px', zIndex: 2, position: 'relative' },
  loginInput: { padding: '18px 24px', borderRadius: '30px', border: 'none', fontSize: '16px', fontWeight: '600', outline: 'none', backgroundColor: '#fff', color: '#333' },
  loginSubmit: { padding: '18px', borderRadius: '30px', border: 'none', backgroundColor: '#14a375', fontWeight: '800', cursor: 'pointer', fontSize: '16px', color: '#fff', marginTop: '4px' },
  phoneRow: { display: 'flex', gap: '10px', alignItems: 'stretch' },
  ccTrigger: { height: '100%', backgroundColor: '#fff', border: 'none', borderRadius: '30px', padding: '18px 16px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', color: '#333', whiteSpace: 'nowrap', outline: 'none' },
  ccDropdown: { position: 'absolute', top: '110%', left: 0, zIndex: 999, backgroundColor: '#fff', borderRadius: '16px', width: '230px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.18)' },
  ccSearch: { width: '100%', padding: '10px 14px', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', color: '#333', boxSizing: 'border-box', backgroundColor: '#fff' },
  ccList: { maxHeight: '200px', overflowY: 'auto' },
  ccItem: { display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 14px', cursor: 'pointer', color: '#333', backgroundColor: '#fff' },
  phoneInput: { flex: 1, padding: '18px 20px', borderRadius: '30px', border: 'none', fontSize: '15px', fontWeight: '600', outline: 'none', backgroundColor: '#fff', color: '#333' },
  mainFeed: { display: 'flex', flexDirection: 'column', width: '100%' },
  topGreenSection: { backgroundColor: '#04432f', padding: '16px 16px 8px 16px' },
  brandHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff', marginBottom: '16px' },
  welcomeText: { fontSize: '12px', color: '#a3b8b0' },
  brandName: { fontSize: '24px', fontWeight: '900' },
  accessibilityGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  cartFABIcon: { fontSize: '22px', cursor: 'pointer', position: 'relative', backgroundColor: 'rgba(255,255,255,0.15)', padding: '6px', borderRadius: '50%' },
  cartCountBadge: { position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  searchRowContainer: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px', width: '100%' },
  searchBarWrapper: { flex: 1, backgroundColor: '#fff', borderRadius: '30px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
  searchIcon: { color: '#888', fontSize: '16px' },
  searchInputField: { flex: 1, border: 'none', outline: 'none', fontSize: '14px', backgroundColor: 'transparent' },
  vegToggleSquare: { width: '48px', height: '44px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  vegDotBox: { width: '12px', height: '12px', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2px' },
  vegInnerDot: { width: '6px', height: '6px', borderRadius: '50%' },
  bottomWhiteSection: { backgroundColor: '#f8fafc', borderRadius: '24px 24px 0 0', padding: '20px 14px 100px 14px', flex: 1 },
  filterMenuRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  auxFilterBtn: { border: 'none', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  stickyOrderBar: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '100%', backgroundColor: '#04432f', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 998, boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' },
  stickyOrderInfo: { display: 'flex', flexDirection: 'column' },
  stickyCount: { color: '#fff', fontWeight: '800', fontSize: '15px' },
  stickyLabel: { color: '#a3b8b0', fontSize: '11px' },
  stickyOrderBtn: { backgroundColor: '#14a375', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer' }
};
import React, { useState, useEffect, useRef } from 'react';

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const COUNTRY_CODES = [
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+1',   flag: '🇺🇸', name: 'United States' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65',  flag: '🇸🇬', name: 'Singapore' },
  { code: '+60',  flag: '🇲🇾', name: 'Malaysia' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+94',  flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
];

function CountryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];
  const filtered = COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={ddStyles.trigger}>
        {selected.flag} {selected.code} ▾
      </button>
      {open && (
        <div style={ddStyles.dropdown}>
          <input
            autoFocus
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={ddStyles.search}
          />
          <div style={ddStyles.list}>
            {filtered.map(c => (
              <div
                key={c.code}
                onClick={() => { onChange(c.code); setOpen(false); setSearch(''); }}
                style={{ ...ddStyles.item, backgroundColor: c.code === value ? '#e2f2ed' : '#fff' }}
              >
                <span>{c.flag}</span>
                <span style={{ flex: 1, fontSize: '13px' }}>{c.name}</span>
                <span style={{ fontSize: '12px', color: '#888', fontWeight: '600' }}>{c.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const ddStyles = {
  trigger: { backgroundColor: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '10px 10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', outline: 'none' },
  dropdown: { position: 'absolute', top: '110%', left: 0, zIndex: 999, backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', width: '220px', overflow: 'hidden' },
  search: { width: '100%', padding: '10px 12px', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', boxSizing: 'border-box' },
  list: { maxHeight: '200px', overflowY: 'auto' },
  item: { display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', cursor: 'pointer' },
};

/* Self-contained Floating Bubbles component */
function FloatingBubbles() {
  return (
    <div style={bubbleStyles.container}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100%) scale(0.8); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120px) scale(1.2); opacity: 0; }
        }
        .bubble {
          position: absolute;
          bottom: 0;
          background: rgba(16, 128, 92, 0.15);
          border: 1px solid rgba(16, 128, 92, 0.25);
          border-radius: 50%;
          animation: floatUp infinite linear;
          pointer-events: none;
        }
      `}</style>
      <div className="bubble" style={{ left: '10%', width: '12px', height: '12px', animationDuration: '6s', animationDelay: '0s' }} />
      <div className="bubble" style={{ left: '25%', width: '18px', height: '18px', animationDuration: '8s', animationDelay: '1.5s' }} />
      <div className="bubble" style={{ left: '45%', width: '8px', height: '8px', animationDuration: '5s', animationDelay: '0.5s' }} />
      <div className="bubble" style={{ left: '60%', width: '22px', height: '22px', animationDuration: '9s', animationDelay: '2s' }} />
      <div className="bubble" style={{ left: '75%', width: '14px', height: '14px', animationDuration: '7s', animationDelay: '3s' }} />
      <div className="bubble" style={{ left: '90%', width: '10px', height: '10px', animationDuration: '6s', animationDelay: '1s' }} />
    </div>
  );
}

const bubbleStyles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '40px',
    overflow: 'hidden',
    backgroundColor: '#04432f', /* Seamless blend with the bottom wave color */
    zIndex: 2
  }
};


export default function CartPage({ cart = {}, menuItems, updateCart, onBack, username, ordered, setOrdered, setSecondsLeft, secondsLeft }) {
  const activeCartEntries = Object.entries(cart);

  const totalCost = activeCartEntries.reduce((sum, [id, qty]) => {
    const dish = menuItems.find(m => m.id === id);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  const checkoutViaWhatsApp = () => {
    let orderSlip = `*Cafe Kampify Order*\n`;
    orderSlip += `*Customer Name:* ${username}\n`;
    orderSlip += `-------------------------\n`;
    activeCartEntries.forEach(([id, qty]) => {
      const dish = menuItems.find(m => m.id === id);
      if (dish) orderSlip += `• ${dish.name} x ${qty} = ₹${dish.price * qty}\n`;
    });
    orderSlip += `-------------------------\n`;
    orderSlip += `*Grand Total:* ₹${totalCost}\n\n`;
    orderSlip += `_Order processed via mobile client app._`;
    window.open(`https://wa.me/919901299899?text=${encodeURIComponent(orderSlip)}`, '_blank');
    setSecondsLeft(10); 
    setOrdered(true);
    localStorage.setItem('kampify_ordered', 'true');
    localStorage.setItem('kampify_seconds', '10');
    localStorage.setItem('kampify_ordered_at', String(Date.now()));
  };

  const renderKayakSVG = (isFull) => (
    <svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
      <defs>
        <clipPath id={isFull ? "waveClipFull" : "waveClip"}>
          <rect x="0" y="0" width="400" height="220" />
        </clipPath>
  
        {/* GRADIENT MASK: Black hides (0 opacity), White shows (1 opacity) */}
        <linearGradient id="topFadeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0" />      {/* 0 opacity at top */}
          <stop offset="25%" stopColor="white" stopOpacity="1" />    {/* Full opacity slightly further down */}
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        
        <mask id="svgTopFade">
          <rect width="400" height="220" fill="url(#topFadeGradient)" />
        </mask>
      </defs>
  
      {/* Wrapped all artwork elements inside this group applying the mask */}
      <g mask="url(#svgTopFade)">
        <rect width="400" height="220" fill="#e2f2ed" />
        <circle cx="320" cy="70" r="25" fill="#fef08a" opacity="0.7" />
        <g className="animated-kayak">
          <g className="animated-paddle">
            <line x1="110" y1="140" x2="180" y2="100" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
            <path d="M 100,145 Q 105,135 115,138 Q 110,148 100,145 Z" fill="#b45309" />
          </g>
          {isFull ? (
            <>
              <text x="108" y="112" style={{ fontSize: '18px' }}>🫓</text>
              <text x="130" y="108" style={{ fontSize: '20px' }}>🍲</text>
              <text x="155" y="106" style={{ fontSize: '22px' }}>🍗</text>
              <text x="180" y="105" style={{ fontSize: '20px' }}>🍜</text>
              <text x="204" y="107" style={{ fontSize: '18px' }}>🍟</text>
              <text x="225" y="109" style={{ fontSize: '16px' }}>🥘</text>
              <text x="243" y="112" style={{ fontSize: '15px' }}>🍱</text>
              <path d="M 70,115 Q 200,158 330,115 Q 200,130 70,115 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 70,115 Q 200,130 330,115" fill="none" stroke="#9a3412" strokeWidth="2" />
            </>
          ) : (
            <>
              <text x="165" y="112" style={{ fontSize: '26px' }}>🍲</text>
              <text x="195" y="110" style={{ fontSize: '24px' }}>🍗</text>
              <text x="140" y="114" style={{ fontSize: '20px' }}>🫓</text>
              <path d="M 70,110 Q 200,155 330,110 Q 200,125 70,110 Z" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <path d="M 70,110 Q 200,125 330,110" fill="none" stroke="#9a3412" strokeWidth="2" />
            </>
          )}
        </g>
        <g style={{ clipPath: `url(#${isFull ? "waveClipFull" : "waveClip"})` }}>
          <path className="animated-wave-1" d="M 0,135 Q 50,125 100,135 T 200,135 T 300,135 T 400,135 T 500,135 T 600,135 T 700,135 T 800,135 L 800,220 L 0,220 Z" fill="#10805c" opacity="0.4" />
          <path className="animated-wave-2" d="M 0,142 Q 50,135 100,142 T 200,142 T 300,142 T 400,142 T 500,142 T 600,142 T 700,142 T 800,142 L 800,220 L 0,220 Z" fill="#04432f" />
        </g>
      </g>
    </svg>
  );

  return (
    <div style={styles.screen}>
      <style>{`
        @keyframes timerPulse {
          0%, 100% { box-shadow: 0 0 8px 2px #14a375; }
          50%       { box-shadow: 0 0 18px 5px #38ef7d; }
        }
        @keyframes waveAnimation {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes kayakBobbing {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes paddleRowing {
          0% { transform: rotate(-15deg); }
          50% { transform: rotate(20deg); }
          100% { transform: rotate(-15deg); }
        }
        .animated-wave-1 { animation: waveAnimation 4s linear infinite; }
        .animated-wave-2 { animation: waveAnimation 2.5s linear infinite reverse; }
        .animated-kayak { animation: kayakBobbing 3s ease-in-out infinite; transform-origin: 200px 130px; }
        .animated-paddle { animation: paddleRowing 2s ease-in-out infinite; transform-origin: 150px 120px; }
      `}</style>
  
      {/* Scrollable Core Interface Elements */}
      <div style={styles.scrollContainer}>
        <header style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>⬅ Back to Menu</button>
          <h2 style={styles.title}>Your Basket</h2>
        </header>
    
        {activeCartEntries.length === 0 ? (
          <div style={styles.emptyContainer}>
            <h3 style={styles.emptyHeading}>Your cart feels empty</h3>
            <p style={styles.emptySubtext}>Delicious Kerala delicacies are waiting to be paddled down to your table!</p>
            <button onClick={onBack} style={styles.browseBtn}>Browse Menu</button>
          </div>
        ) : (
          <div style={styles.bodyFlex}>
            <div style={styles.itemList}>
              {activeCartEntries.map(([id, qty]) => {
                const dish = menuItems.find(m => m.id === id);
                if (!dish) return null;
                return (
                  <div key={id} style={styles.cartItemCard}>
                    <div>
                      <h4 style={styles.itemName}>{dish.name}</h4>
                      <span style={styles.itemPrice}>₹{dish.price * qty}</span>
                    </div>
                    <div style={styles.counterBox}>
                      <button onClick={() => updateCart(id, -1)} style={styles.mathBtn}>−</button>
                      <span style={styles.qtyText}>{qty}</span>
                      <button onClick={() => updateCart(id, 1)} style={styles.mathBtn}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
    
            {ordered && (
              <div style={styles.timerCard}>
                {secondsLeft > 0 ? (
                  <>
                    <p style={styles.timerLabel}>⏳ Estimated time remaining</p>
                    <div style={{ ...styles.timerDisplay, animation: 'timerPulse 2s ease-in-out infinite' }}>
                      {fmt(secondsLeft)}
                    </div>
                    <p style={styles.timerSub}rm>Your order is being freshly prepared!</p>
                  </>
                ) : (
                  <>
                    <p style={styles.timerLabel}>✅ Your order should be ready!</p>
                    <a href="tel:+919901299899" style={styles.callBtn}>📞 Call Kitchen</a>
                  </>
                )}
              </div>
            )}
    
            <div style={styles.footerSummary}>
              <div style={styles.totalRow}>
                <span>To Pay Amount</span>
                <span style={styles.grandPrice}>₹{totalCost}</span>
              </div>
              {!ordered && (
                <button onClick={checkoutViaWhatsApp} style={styles.orderBtn}>
                  Send Order via WhatsApp ➔
                </button>
              )}
            </div>
          </div>
        )}
        <CartFooter />
      </div>

      {/* Fixed Sticky Background Canvas At Extreme Bottom */}
      <div style={styles.fixedBottomCanvas}>
        <div style={styles.svgAbsoluteContainer}>
          {renderKayakSVG(activeCartEntries.length > 0)}
        </div>
        <FloatingBubbles />
      </div>
    </div>
  );
}

const styles = {
  screen: { 
    backgroundColor: '#f8fafc', 
    minHeight: '100vh', 
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
    overflow: 'hidden',
    boxSizing: 'border-box'
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px 320px 16px', /* Ensures space to scroll past the container */
    zIndex: 5,
    position: 'relative'
  },
  fixedBottomCanvas: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none'
  },
  svgAbsoluteContainer: {
    width: '100%',
    height: '280px', /* Taller size so no elements get cropped */
    overflow: 'hidden',
    position: 'relative'
  },
  
  // Keep all your other style tokens exactly the same below...
  header: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  backBtn: { background: 'none', border: 'none', color: '#10805c', fontWeight: '700', fontSize: '14px', cursor: 'pointer', pointerEvents: 'auto' },
  title: { fontSize: '20px', fontWeight: '800', margin: 0, color: '#04432f' },
  emptyContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: '40px' },
  bodyFlex: { display: 'flex', flexDirection: 'column', gap: '16px' },
  itemList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  cartItemCard: { backgroundColor: '#fff', padding: '14px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', position: 'relative', pointerEvents: 'auto' },
  itemName: { margin: 0, fontSize: '15px', color: '#333' },
  itemPrice: { fontSize: '13px', color: '#10805c', fontWeight: '700' },
  counterBox: { display: 'flex', alignItems: 'center', backgroundColor: '#10805c', borderRadius: '10px', padding: '2px' },
  mathBtn: { background: 'none', border: 'none', color: '#fff', width: '24px', height: '24px', cursor: 'pointer', fontWeight: '700' },
  qtyText: { color: '#fff', fontSize: '13px', padding: '0 6px', minWidth: '14px', textAlign: 'center' },
  timerCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', pointerEvents: 'auto' },
  timerLabel: { fontSize: '13px', color: '#555', fontWeight: '600', margin: '0 0 12px' },
  timerDisplay: { fontSize: '48px', fontWeight: '900', color: '#04432f', letterSpacing: '4px', borderRadius: '16px', padding: '8px 16px', display: 'inline-block' },
  timerSub: { fontSize: '12px', color: '#888', marginTop: '10px' },
  callBtn: { display: 'inline-block', marginTop: '8px', backgroundColor: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: '800', fontSize: '15px', textDecoration: 'none' },
  footerSummary: { backgroundColor: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 -4px 15px rgba(0,0,0,0.02)', pointerEvents: 'auto' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', marginBottom: '14px' },
  grandPrice: { fontSize: '20px', fontWeight: '800', color: '#10805c' },
  orderBtn: { width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' },
  emptyHeading: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' },
  emptySubtext: { fontSize: '13px', color: '#64748b', lineHeight: '1.5', maxWidth: '280px', margin: '0 0 24px 0' },
  browseBtn: { backgroundColor: '#04432f', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(4,67,47,0.2)', pointerEvents: 'auto' },
};

function CartFooter() {
  return (
    <div style={{ textAlign: 'center', padding: '16px 0 8px', fontSize: '11px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.3px', position: 'relative', zIndex: 10 }}>
      made with ❤️ by{' '}
      <a href="https://instagram.com/gokzxoxo" target="_blank" rel="noopener noreferrer" style={{ color: '#10805c', textDecoration: 'none', fontWeight: '700', pointerEvents: 'auto' }}>@gokzxoxo</a>
    </div>
  );
}
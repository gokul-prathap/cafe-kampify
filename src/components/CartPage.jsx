import React, { useState, useEffect, useRef } from 'react';

const styles = {
  screen: { backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' },
  scrollContainer: { flex: 1, overflowY: 'auto', padding: '16px 16px 320px 16px', zIndex: 5, position: 'relative' },
  fixedBottomCanvas: { position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', pointerEvents: 'none' },
  svgAbsoluteContainer: { width: '100%', height: '280px', overflow: 'hidden', position: 'relative' },
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
  footerSummary: { backgroundColor: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', pointerEvents: 'auto' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', marginBottom: '14px' },
  grandPrice: { fontSize: '20px', fontWeight: '800', color: '#10805c' },
  orderBtn: { width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' },
  emptyHeading: { fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' },
  emptySubtext: { fontSize: '13px', color: '#64748b', lineHeight: '1.5', maxWidth: '280px', margin: '0 0 24px 0' },
  browseBtn: { backgroundColor: '#04432f', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '24px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(4,67,47,0.2)', pointerEvents: 'auto' },
  historyWrapper: { marginTop: '24px', pointerEvents: 'auto' },
  historyHeaderToggle: { display: 'flex', justifyContent: 'space-between', width: '100%', padding: '12px 16px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '12px', fontWeight: '700', color: '#334155', fontSize: '13px', cursor: 'pointer' },
  historyListStack: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' },
  historyCard: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px 16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  historyCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #f1f5f9', paddingBottom: '6px' },
  nestedTimerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#e2f2ed', padding: '6px 12px', borderRadius: '8px', marginTop: '4px' },
  nestedTimerBoxFinished: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#d1e7dd', padding: '6px 12px', borderRadius: '8px', marginTop: '4px' },
  timerLabel: { fontSize: '12px', color: '#10805c', fontWeight: '700' },
  miniTimerDisplay: { fontSize: '14px', fontWeight: '800', color: '#04432f', backgroundColor: '#fff', padding: '2px 8px', borderRadius: '6px' },
  miniCallBtn: { fontSize: '11px', backgroundColor: '#10805c', color: '#fff', padding: '4px 10px', borderRadius: '6px', textDecoration: 'none', fontWeight: '700' }
};

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

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
  container: { position: 'relative', width: '100%', height: '40px', overflow: 'hidden', backgroundColor: '#04432f', zIndex: 2 }
};

function CartFooter() {
  return (
    <div style={{ textAlign: 'center', padding: '16px 0 8px', fontSize: '11px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.3px', position: 'relative', zIndex: 10 }}>
      made with ❤️ by{' '}
      <a href="https://instagram.com/gokzxoxo" target="_blank" rel="noopener noreferrer" style={{ color: '#10805c', textDecoration: 'none', fontWeight: '700', pointerEvents: 'auto' }}>@gokzxoxo</a>
    </div>
  );
}

export default function CartPage({ cart = {}, menuItems, updateCart, onBack, username, clearCart }) {
  const activeCartEntries = Object.entries(cart);
  const [orders, setOrders] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [timeUpdater, setTimeUpdater] = useState(Date.now());

  useEffect(() => {
    const savedOrders = localStorage.getItem('kampify_orders_list');
    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch (e) { setOrders([]); }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setTimeUpdater(now);

      setOrders(prevOrders => {
        let hasChanges = false;
        const mapped = prevOrders.map(ord => {
          const elapsedSeconds = Math.floor((now - ord.timestamp) / 1000);
          if (ord.durationSeconds > 0 && elapsedSeconds >= ord.durationSeconds) {
            hasChanges = true;
            return { ...ord, durationSeconds: 0 };
          }
          return ord;
        });

        if (hasChanges) {
          localStorage.setItem('kampify_orders_list', JSON.stringify(mapped));
          return mapped;
        }
        return prevOrders;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const getPreparationMinutes = (dish) => {
    if (!dish?.time) return 45;

    const match = String(dish.time).match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 45;
  };

  const storedOrders = JSON.parse(localStorage.getItem('kampify_orders_list')) || [];
  const latestOrder = storedOrders.sort((a, b) => b.timestamp - a.timestamp)[0];
  let genericTimeLeft = 0;
  let isGenericTimerActive = false;

  if (latestOrder) {
    const elapsed = Math.floor((timeUpdater - latestOrder.timestamp) / 1000);
    genericTimeLeft = Math.max(0, latestOrder.durationSeconds - elapsed);
    isGenericTimerActive = genericTimeLeft > 0;
  }

  // UPDATED: Safely calculates cost using inner entry objects
  const totalCost = activeCartEntries.reduce((sum, [key, cartObj]) => {
    const baseId = cartObj?.baseId || key;
    const qty = cartObj?.qty ?? 0;
    const dish = menuItems.find(m => m.id === baseId);
    return sum + (dish ? dish.price * qty : 0);
  }, 0);

  const checkoutViaWhatsApp = () => {
    const orderId = `KFY-${Date.now().toString().slice(-6)}`;
  
    let orderSlip = `*
      
      
      ＣＡＦＥ ＫＡＭＰＩＦＹ*
  
  ━━━━━━━━━━━━━━━━━━━━━━
  
  🆔 *Order:* ${orderId}
  👤 *Customer:* ${username || "Guest"}
  
  ━━━━━━━━━━━━━━━━━━━━━━
  📋 *ORDER ITEMS*
  ━━━━━━━━━━━━━━━━━━━━━━
  `;
  
    const snapshotItems = [];
    const instructionLines = [];
  
    let currentOrderRequiredMinutes = 0;
  
    activeCartEntries.forEach(([key, cartObj]) => {
      const baseId = cartObj?.baseId || key;
      const itemQuantity = cartObj?.qty ?? 0;
      const selectedOptions = cartObj?.options || [];
  
      const dish = menuItems.find(m => m.id === baseId);
      if (!dish) return;
  
      const prepMinutes = getPreparationMinutes(dish);
  
      currentOrderRequiredMinutes = Math.max(
        currentOrderRequiredMinutes,
        prepMinutes
      );
  
      const vegIcon = dish.isVeg ? "🟢" : "🔴";
      const optionsString =
        selectedOptions.length > 0
          ? ` (${selectedOptions.join(', ')})`
          : '';
  
      orderSlip += `
  ${vegIcon} ${dish.name}${optionsString} → *${itemQuantity}*
  `;
  
      if (selectedOptions.length > 0) {
        instructionLines.push(
          `• ${itemQuantity} ${dish.name} — ${selectedOptions.join(", ")}`
        );
      }
  
      snapshotItems.push({
        id: baseId,
        name: dish.name + optionsString,
        qty: itemQuantity,
        priceTotal: dish.price * itemQuantity
      });
    });
  
    if (instructionLines.length > 0) {
      orderSlip += `
  
  ━━━━━━━━━━━━━━━━━━━━━━
  ⚠️ *SPECIAL INSTRUCTIONS*
  ━━━━━━━━━━━━━━━━━━━━━━
  
  ${instructionLines.join("\n")}
  `;
    }
  
    orderSlip += `
  
  ━━━━━━━━━━━━━━━━━━━━━━
  💰 *BILL SUMMARY*
  ━━━━━━━━━━━━━━━━━━━━━━
  
  🛒 Total Items: ${snapshotItems.reduce((sum, item) => sum + item.qty, 0)}
  
  💵 *TOTAL BILL: ₹${totalCost}*
  
  ━━━━━━━━━━━━━━━━━━━━━━
  ☕ *CAFE KAMPIFY*
  ━━━━━━━━━━━━━━━━━━━━━━
  `;
  
    // --------------------------------------------------
    // SMART TIMER LOGIC
    // --------------------------------------------------
  
    const now = Date.now();
  
    const existingOrders =
      JSON.parse(localStorage.getItem("kampify_orders_list")) || [];
  
    const activeOrders = existingOrders.filter(ord => {
      const elapsed = Math.floor((now - ord.timestamp) / 1000);
      return elapsed < ord.durationSeconds;
    });
  
    let activeRemainingMinutes = 0;
  
    activeOrders.forEach(ord => {
      const elapsed = Math.floor((now - ord.timestamp) / 1000);
      const remainingMinutes = Math.ceil(
        (ord.durationSeconds - elapsed) / 60
      );
  
      activeRemainingMinutes = Math.max(
        activeRemainingMinutes,
        remainingMinutes
      );
    });
  
    let finalPreparationMinutes;
  
    if (activeRemainingMinutes > currentOrderRequiredMinutes) {
      finalPreparationMinutes = activeRemainingMinutes;
    } else {
      finalPreparationMinutes = currentOrderRequiredMinutes;
    }
  
    // Global cap = 45 min
    finalPreparationMinutes = Math.min(
      45,
      Math.max(1, finalPreparationMinutes)
    ); 
  
    const newOrder = {
      id: orderId,
      timestamp: now,
      durationSeconds: finalPreparationMinutes * 60,
      total: totalCost,
      items: snapshotItems
    };
  
    const updatedOrdersList = [newOrder, ...orders];
  
    setOrders(updatedOrdersList);
  
    localStorage.setItem(
      "kampify_orders_list",
      JSON.stringify(updatedOrdersList)
    );
  
    window.open(
      `https://wa.me/919901299899?text=${encodeURIComponent(orderSlip)}`,
      "_blank"
    );
  
    if (typeof clearCart === "function") {
      clearCart();
    }
  };

  const renderKayakSVG = (isFull) => (
    <svg viewBox="0 0 400 220" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ display: 'block' }}>
      <defs>
        <clipPath id={isFull ? "waveClipFull" : "waveClip"}>
          <rect x="0" y="0" width="400" height="220" />
        </clipPath>
        <linearGradient id="topFadeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="25%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="svgTopFade">
          <rect width="400" height="220" fill="url(#topFadeGradient)" />
        </mask>
      </defs>
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
        @keyframes timerPulse { 0%, 100% { box-shadow: 0 0 6px 1px #14a375; } 50% { box-shadow: 0 0 14px 4px #38ef7d; } }
        @keyframes alertPulse { 0%, 100% { background-color: #fff3cd; border-color: #ffeeba; } 50% { background-color: #fce8bc; border-color: #f7d683; } }
        @keyframes waveAnimation { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes kayakBobbing { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(3deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes paddleRowing { 0% { transform: rotate(-15deg); } 50% { transform: rotate(20deg); } 100% { transform: rotate(-15deg); } }
        .animated-wave-1 { animation: waveAnimation 4s linear infinite; }
        .animated-wave-2 { animation: waveAnimation 2.5s linear infinite reverse; }
        .animated-kayak { animation: kayakBobbing 3s ease-in-out infinite; transform-origin: 200px 130px; }
        .animated-paddle { animation: paddleRowing 2s ease-in-out infinite; transform-origin: 150px 120px; }
        .generic-timer-banner { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-radius: 12px; border: 1px solid #ffeeba; margin-bottom: 16px; animation: alertPulse 2.5s ease-in-out infinite; }
      `}</style>

      <div style={styles.scrollContainer} >
        <header style={styles.header}>
          <button onClick={onBack} style={styles.backBtn}>⬅️ Back to Menu</button>
          <h2 style={styles.title}>Your Basket</h2>
        </header>

        {activeCartEntries.length === 0 ? (
          <div style={styles.emptyContainer}>
            {isGenericTimerActive && (
              <div className="generic-timer-banner" style={{ width: '100%', maxWidth: '340px', boxSizing: 'border-box' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#856404' }}>⏳ Next Order Arriving In:</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff', backgroundColor: '#856404', padding: '3px 10px', borderRadius: '6px', fontFamily: 'monospace' }}>
                  {fmt(genericTimeLeft)}
                </span>
              </div>
            )}
            <h3 style={styles.emptyHeading} >Your cart is empty</h3>
            <p style={styles.emptySubtext}>Delicious Kerala delicacies are waiting to be paddled down to your table!</p>
            <button onClick={onBack} style={styles.browseBtn}>Browse Menu</button>
          </div>
        ) : (
          <div style={styles.bodyFlex}>
            {isGenericTimerActive && (
              <div className="generic-timer-banner">
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#856404' }}>⏳ Active Production Queue:</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#fff', backgroundColor: '#856404', padding: '3px 10px', borderRadius: '6px', fontFamily: 'monospace' }}>
                  {fmt(genericTimeLeft)}
                </span>
              </div>
            )}

            <div style={styles.itemList}>
              {activeCartEntries.map(([cartKey, cartObj]) => {
                // FIXED: Extracts scalar configuration fields out of object keys safely
                const baseId = cartObj?.baseId || cartKey;
                const qty = cartObj?.qty ?? 0;
                const selectedOptions = cartObj?.options || [];

                const dish = menuItems.find(m => m.id === baseId);
                if (!dish) return null;

                return (
                  <div key={cartKey} style={styles.cartItemCard}>
                    <div>
                      <h4 style={styles.itemName}>
                        {dish.name}
                        {selectedOptions.length > 0 && (
                          <span style={{ display: 'block', fontSize: '11px', color: '#f59e0b', fontWeight: 'bold', marginTop: '3px' }}>
                            🏷️ {selectedOptions.join(', ')}
                          </span>
                        )}
                      </h4>
                      <span style={styles.itemPrice}>₹{dish.price * qty}</span>
                    </div>
                    <div style={styles.counterBox}>
                      <button onClick={() => updateCart(cartKey, -1, selectedOptions)} style={styles.mathBtn}>−</button>
                      <span style={styles.qtyText}>{qty}</span>
                      <button onClick={() => updateCart(cartKey, 1, selectedOptions)} style={styles.mathBtn}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.footerSummary}>
              <div style={styles.totalRow}>
                <span>To Pay Amount</span>
                <span style={styles.grandPrice}>₹{totalCost}</span>
              </div>
              <button onClick={checkoutViaWhatsApp} style={styles.orderBtn}>
                Send Order via WhatsApp ➡️
              </button>
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <div style={styles.historyWrapper}>
            <button onClick={() => setHistoryOpen(!historyOpen)} style={styles.historyHeaderToggle}>
              <span>📋 Active & Past Orders ({orders.length})</span>
              <span>{historyOpen ? '🔼 Hide' : '🔽 View'}</span>
            </button>

            {historyOpen && (
              <div style={styles.historyListStack}>
                {orders.map((ord) => {
                  const elapsedSeconds = Math.floor((timeUpdater - ord.timestamp) / 1000);
                  const secondsLeft = Math.max(0, ord.durationSeconds - elapsedSeconds);
                  const isTimerActive = secondsLeft > 0 || ord.durationSeconds > 0;

                  return (
                    <div key={ord.id} style={{
                      ...styles.historyCard,
                      borderColor: isTimerActive ? '#10805c' : '#e2e8f0',
                      borderWidth: isTimerActive ? '1.5px' : '1px',
                      backgroundColor: isTimerActive ? '#fff' : '#f8fafc',
                      opacity: isTimerActive ? 1 : 0.75
                    }}>
                      <div style={styles.historyCardHeader}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {new Date(ord.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                        <span style={{ fontWeight: '800', color: isTimerActive ? '#04432f' : '#64748b', fontSize: '14px' }}>
                          ₹{ord.total}
                        </span>
                      </div>

                      <div style={{ margin: '8px 0', fontSize: '12px', color: '#334155' }}>
                        {ord.items.map((item, idx) => (
                          <div key={idx} style={{ textDecoration: isTimerActive ? 'none' : 'line-through', color: isTimerActive ? '#334155' : '#94a3b8' }}>
                            • {item.name} x {item.qty}
                          </div>
                        ))}
                      </div>

                      {isTimerActive ? (
                        <div style={styles.nestedTimerBox}>
                          <span style={styles.timerLabel}>⏳ Cooking...</span>
                          <span style={{ ...styles.miniTimerDisplay, animation: 'timerPulse 2s ease-in-out infinite' }}>
                            {fmt(secondsLeft)}
                          </span>
                        </div>
                      ) : (
                        <div style={styles.nestedTimerBoxFinished}>
                          <span style={{ color: '#475569', fontWeight: '700' }}>🏁 Inactive / Served</span>
                          <a href="tel:+919901299899" style={{ ...styles.miniCallBtn, backgroundColor: '#64748b' }}>📞 Kitchen</a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <CartFooter />
      </div>

      <div style={styles.fixedBottomCanvas}>
        <div style={styles.svgAbsoluteContainer}>
          {renderKayakSVG(activeCartEntries.length > 0)}
        </div>
        <FloatingBubbles />
      </div>
    </div>
  );
}
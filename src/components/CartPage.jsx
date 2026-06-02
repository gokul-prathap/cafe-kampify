import React from 'react';

const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

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
    setSecondsLeft(10); // temp 10s for testing
    setOrdered(true);
    localStorage.setItem('kampify_ordered', 'true');
    localStorage.setItem('kampify_seconds', '10');
    localStorage.setItem('kampify_ordered_at', String(Date.now()));
  };

  return (
    <div style={styles.screen}>
      <style>{`
        @keyframes timerPulse {
          0%, 100% { box-shadow: 0 0 8px 2px #14a375; }
          50%       { box-shadow: 0 0 18px 5px #38ef7d; }
        }
      `}</style>

      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>⬅ Back to Menu</button>
        <h2 style={styles.title}>Your Basket</h2>
      </header>

      {activeCartEntries.length === 0 ? (
        <div style={styles.emptyContainer}>
          <span style={{ fontSize: '48px' }}>🛍️</span>
          <p style={{ marginTop: '12px', color: '#666' }}>Your cart feels empty. Add some delicacies!</p>
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
                  <p style={styles.timerSub}>Your order is being freshly prepared!</p>
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
    </div>
  );
}

const styles = {
  screen: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '16px', boxSizing: 'border-box' },
  header: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' },
  backBtn: { background: 'none', border: 'none', color: '#10805c', fontWeight: '700', fontSize: '14px', cursor: 'pointer' },
  title: { fontSize: '20px', fontWeight: '800', margin: 0, color: '#04432f' },
  emptyContainer: { textAlign: 'center', paddingTop: '60px' },
  bodyFlex: { display: 'flex', flexDirection: 'column', gap: '16px' },
  itemList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  cartItemCard: { backgroundColor: '#fff', padding: '14px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  itemName: { margin: 0, fontSize: '15px', color: '#333' },
  itemPrice: { fontSize: '13px', color: '#10805c', fontWeight: '700' },
  counterBox: { display: 'flex', alignItems: 'center', backgroundColor: '#10805c', borderRadius: '10px', padding: '2px' },
  mathBtn: { background: 'none', border: 'none', color: '#fff', width: '24px', height: '24px', cursor: 'pointer', fontWeight: '700' },
  qtyText: { color: '#fff', fontSize: '13px', padding: '0 6px', minWidth: '14px', textAlign: 'center' },
  timerCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' },
  timerLabel: { fontSize: '13px', color: '#555', fontWeight: '600', margin: '0 0 12px' },
  timerDisplay: { fontSize: '48px', fontWeight: '900', color: '#04432f', letterSpacing: '4px', borderRadius: '16px', padding: '8px 16px', display: 'inline-block' },
  timerSub: { fontSize: '12px', color: '#888', marginTop: '10px' },
  callBtn: { display: 'inline-block', marginTop: '8px', backgroundColor: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: '800', fontSize: '15px', textDecoration: 'none' },
  footerSummary: { backgroundColor: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 -4px 15px rgba(0,0,0,0.02)' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '600', marginBottom: '14px' },
  grandPrice: { fontSize: '20px', fontWeight: '800', color: '#10805c' },
  orderBtn: { width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' },
};

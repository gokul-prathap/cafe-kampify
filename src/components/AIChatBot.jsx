import React, { useState } from 'react';

export default function AIChatBot({ menuItems, updateCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! I am Kampify AI. Ask me about our dishes, vegetarian choices, or pricing!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Rule-Based Menu Intelligence Parser Engine
    setTimeout(() => {
      let reply = "I'm still learning! You can browse our categories above or click Order via WhatsApp for instant desk support.";
      const query = userText.toLowerCase();

      if (query.includes('veg') || query.includes('vegetarian')) {
        const vegDishes = menuItems.filter(i => i.isVeg && i.available).map(i => i.name).slice(0, 3);
        reply = `🌱 Excellent vegetarian items available: ${vegDishes.join(', ')}, and more under tabs!`;
      } else if (query.includes('stew')) {
        const stews = menuItems.filter(i => i.category === 'STEWS').map(i => `${i.name} (₹${i.price})`);
        reply = `🍲 Our hot traditional stews are: ${stews.join(', ')}. Which one should I add?`;
      } else if (query.includes('maggie')) {
        reply = `🍜 We serve Maggie Noodles (₹70), Egg Maggie (₹100), and Veg Maggie (₹80).`;
      } else if (query.includes('price') || query.includes('cheap')) {
        reply = `💰 Our daily essentials start at just ₹15! Check out the Traditional Kerala Breads section.`;
      }

      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} style={styles.fab}>🤖</div>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Kampify Smart Bot</span>
            <span onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }}>✕</span>
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                ...styles.msgBubble,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#10805c' : '#f1f5f9',
                color: msg.sender === 'user' ? '#fff' : '#333'
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} style={styles.chatForm}>
            <input
              type="text"
              placeholder="Ask about menu items..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.chatInput}
            />
            <button type="submit" style={styles.chatSendBtn}>➔</button>
          </form>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: '140px',
    right: '20px',
    width: '56px',
    height: '56px',
    backgroundColor: '#10805c',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 999
  },
  chatWindow: {
    position: 'fixed',
    bottom: '150px',
    right: '20px',
    width: '300px',
    height: '380px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000
  },
  chatHeader: {
    backgroundColor: '#04432f',
    color: '#fff',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '700',
    fontSize: '14px'
  },
  chatBody: {
    flex: 1,
    padding: '12px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  msgBubble: {
    padding: '8px 12px',
    borderRadius: '12px',
    fontSize: '13px',
    maxWidth: '85%',
    lineHeight: '1.4'
  },
  chatForm: {
    display: 'flex',
    borderTop: '1px solid #e2e8f0',
    padding: '8px'
  },
  chatInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '6px',
    fontSize: '13px'
  },
  chatSendBtn: {
    background: 'none',
    border: 'none',
    color: '#10805c',
    fontSize: '16px',
    cursor: 'pointer'
  }
};
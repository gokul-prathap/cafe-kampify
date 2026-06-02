import React, { useState } from 'react';

export default function AIChatBot({ menuItems = [], updateCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! I am Kampify AI. Ask me about our traditional Kerala dishes, vegetarian choices, or pricing!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Dynamic Context-Aware Parser Engine
    setTimeout(() => {
      const query = userText.toLowerCase().trim();
      let reply = "";

      // 1. GREETINGS & INTROS
      if (query.match(/\b(hi|hello|hey|hola|sup|good morning|good evening)\b/)) {
        reply = "👋 Hello there! Welcome to Cafe Kampify. Looking for food recommendations, pricing, or spicy traditional stews today?";
      } 
      
      // 2. GRATITUDE / POLITE CLOSURES
      else if (query.match(/\b(thanks|thank you|awesome|great|ok|okay|cool)\b/)) {
        reply = "😊 You're welcome! Let me know if you want to find more dishes or need help with prices.";
      }

      // 3. HUMAN HELP / PHONE / CONTACT REQUESTS
      else if (query.includes('call') || query.includes('phone') || query.includes('number') || query.includes('contact') || query.includes('support') || query.includes('kitchen')) {
        reply = "📞 You can reach our desk support and kitchen instantly at +91 9037112189. We're here to assist with your order!";
      }

      // 4. VEGETARIAN / VEG LOOKUPS
      else if (query.includes('veg') || query.includes('vegetarian')) {
        const vegDishes = menuItems.filter(i => i.isVeg && i.available).map(i => i.name).slice(0, 4);
        if (vegDishes.length > 0) {
          reply = `🌱 Excellent vegetarian items available: ${vegDishes.join(', ')}. Swipe through the menu sections to see them all!`;
        } else {
          reply = "🌱 We have delightful vegetarian choices in our menu tabs! Take a look under Traditional Kerala Breads or Sides.";
        }
      }

      // 5. PRICE / BUDGET / CHEAP ENQUIRIES
      else if (query.includes('price') || query.includes('cheap') || query.includes('cost') || query.includes('rate') || query.includes('budget')) {
        const affordable = menuItems.filter(i => i.price && i.available).sort((a, b) => a.price - b.price).slice(0, 2);
        if (affordable.length > 0) {
          reply = `💰 Our daily essentials start at budget-friendly rates! Items like ${affordable.map(i => `${i.name} (₹${i.price})`).join(' and ')} are ready to order.`;
        } else {
          reply = "💰 Our daily essentials start at just ₹15! Check out the Traditional Kerala Breads section for great pocket-friendly rates.";
        }
      }

      // 6. DYNAMIC CATEGORY MATCHING (Matches categories like 'STEWS', 'DRINKS' dynamically)
      else if (menuItems.some(i => query.includes(i.category?.toLowerCase()))) {
        const matchedItem = menuItems.find(i => query.includes(i.category?.toLowerCase()));
        const targetCat = matchedItem.category;
        const matchingDishes = menuItems.filter(i => i.category === targetCat && i.available).map(i => i.name).slice(0, 3);
        
        reply = `🍲 Our popular ${targetCat.toLowerCase()} selections include: ${matchingDishes.join(', ')}. Which one can I help you pick?`;
      }

      // 7. DYNAMIC SPECIFIC DISH SEARCH (Matches actual item name in the array)
      else if (menuItems.some(i => query.includes(i.name?.toLowerCase()))) {
        const dish = menuItems.find(i => query.includes(i.name?.toLowerCase()));
        reply = dish.available 
          ? `🍽️ Yes! We have ${dish.name} fresh and available right now for ₹${dish.price}. Would you like to check it out in your basket?`
          : `🍽️ ${dish.name} is on our menu for ₹${dish.price}, but it's currently sold out for the day. Can I find you an alternative?`;
      }

      // 8. POPULAR HARDCODED FALLBACKS (Like Maggie strings)
      else if (query.includes('maggie') || query.includes('maggi') || query.includes('noodles')) {
        reply = "🍜 We serve Maggie Noodles (₹70), Savory Veg Maggie (₹80), and rich Egg Maggie (₹100). Essential comfort food!";
      }

      // 9. GENERIC DATA CATCH-ALL (Out-of-bounds inputs)
      else {
        const featured = menuItems.filter(i => i.available).slice(0, 2).map(i => i.name);
        if (featured.length > 0) {
          reply = `🤖 I'm still training to understand that specific sentence! But I can help you find dishes. Try asking about "veg options", "pricing", or customer favorites like ${featured.join(' or ')}.`;
        } else {
          reply = "🤖 I didn't quite catch that. Try asking about our custom \"stews\", \"veg items\", or call us directly at 9037112189 for direct table support!";
        }
      }

      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    }, 550);
  };

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} style={styles.fab}>🤖</div>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Kampify Smart Bot</span>
            <span onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', padding: '2px 6px' }}>✕</span>
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
    alignItems: 'center',
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
    lineHeight: '1.4',
    wordBreak: 'break-word'
  },
  chatForm: {
    display: 'flex',
    borderTop: '1px solid #e2e8f0',
    padding: '8px',
    backgroundColor: '#fff'
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
    cursor: 'pointer',
    padding: '0 8px'
  }
};
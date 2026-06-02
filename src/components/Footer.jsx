import React from 'react';

export default function Footer() {
  return (
    <div style={s.wrap}>
      made with ❤️ by{' '}
      <a href="https://instagram.com/gokzxoxo" target="_blank" rel="noopener noreferrer" style={s.link}>
        @gokzxoxo
      </a>
    </div>
  );
}

const s = {
  wrap: { 
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'center', 
    padding: '12px 0 24px', // Increased the bottom padding to 24px
    fontSize: '11px', 
    color: 'rgba(255,255,255,0.3)', 
    letterSpacing: '0.3px' 
  },
  link: { color: '#38ef7d', textDecoration: 'none', fontWeight: '700' },
};

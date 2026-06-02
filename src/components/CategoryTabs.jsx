import React from 'react';
import { CATEGORIES_WITH_ICONS } from '../data/menuData';

export default function CategoryTabs({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="hide-scroll" style={styles.wrapperScroller}>
      {CATEGORIES_WITH_ICONS.map(cat => {
        const isActive = selectedCategory === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              ...styles.tabTile,
              backgroundColor: isActive ? '#10805c' : '#04432f'
            }}
          >
            <div style={{
              ...styles.iconContainer,
              backgroundColor: isActive ? '#14a375' : 'rgba(255,255,255,0.06)'
            }}>
              <span style={styles.emojiIcon}>{cat.icon}</span>
              {cat.id === 'MAGGIE' && <span style={styles.timeBadge}>12m</span>}
            </div>
            <span style={{
              ...styles.label,
              fontWeight: isActive ? '700' : '500',
              color: isActive ? '#fff' : '#a3b8b0'
            }}>
              {cat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  wrapperScroller: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    padding: '4px 0 16px 0',
    WebkitOverflowScrolling: 'touch',
    width: '100%'
  },
  tabTile: {
    flex: '0 0 76px',
    borderRadius: '16px',
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  iconContainer: {
    width: '54px',
    height: '54px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: '6px'
  },
  emojiIcon: {
    fontSize: '26px'
  },
  timeBadge: {
    position: 'absolute',
    bottom: '-2px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '9px',
    fontWeight: '700',
    padding: '1px 4px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  label: {
    fontSize: '11px',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  }
};
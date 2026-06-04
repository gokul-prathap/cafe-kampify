import React from 'react';
import { CATEGORIES_WITH_ICONS } from '../data/menuData';

export default function CategoryTabs({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="hide-scroll" style={styles.wrapperScroller}>
      {/* Self-contained animations for waving icon, pulsing neon border, and shifting wrapper shadow */}
      <style>{`
        /* 1. Continuous structural waving interaction */
        @keyframes safetyPinWave {
          0%, 100% { 
            transform: scale(1) skewX(0deg) skewY(0deg) translateY(0px); 
            filter: drop-shadow(0 2px 4px rgba(56, 239, 125, 0.2));
          }
          25% {
            transform: scale(1.15) skewX(-2deg) skewY(-4deg) translateY(-2px);
            filter: drop-shadow(0 6px 14px rgba(56, 239, 125, 0.5));
          }
          50% {
            transform: scale(1.08) skewX(1deg) skewY(2deg) translateY(-1px);
            filter: drop-shadow(0 4px 8px rgba(56, 239, 125, 0.3));
          }
          75% {
            transform: scale(1.12) skewX(-1deg) skewY(-2deg) translateY(-3px);
            filter: drop-shadow(0 8px 16px rgba(56, 239, 125, 0.6));
          }
        }
        .food-icon-wave {
          display: inline-block;
          transform-origin: bottom center;
          animation: safetyPinWave 4.5s ease-in-out infinite;
        }

        /* 2. Pulsing neon border glow animation for active tiles */
        @keyframes activeBorderPulse {
          0%, 100% { 
            border-color: rgba(56, 239, 125, 0.6);
            box-shadow: 0 0 12px rgba(56, 239, 125, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          50% { 
            border-color: rgba(17, 153, 142, 0.9);
            box-shadow: 0 0 20px rgba(56, 239, 125, 0.7), 0 4px 16px rgba(0, 0, 0, 0.3);
          }
        }
        .tile-border-glow {
          animation: activeBorderPulse 3s ease-in-out infinite;
        }

        /* 3. Deep inner/outer shifting aura shadow for the active icon container */
        @keyframes activeShadowShift {
          0%, 100% {
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(56, 239, 125, 0.3);
            transform: translateY(0px);
          }
          50% {
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(56, 239, 125, 0.5);
            transform: translateY(-1px);
          }
        }
        .icon-shadow-glow {
          animation: activeShadowShift 3s ease-in-out infinite;
        }
      `}</style>

      {CATEGORIES_WITH_ICONS.map(cat => {
        const isActive = selectedCategory === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={isActive ? "tile-border-glow" : ""}
            style={{
              ...styles.tabTile,
              backgroundColor: isActive ? '#10805c' : '#04432f',
              border: isActive ? '1px solid rgba(56, 239, 125, 0.6)' : '1px solid #033626',
              transform: isActive ? 'scale(1.03)' : 'scale(1)',
              boxShadow: isActive ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)' // Controlled by CSS keyframes when active
            }}
          >
            <div 
              className={isActive ? "icon-shadow-glow" : ""}
              style={{
                ...styles.iconContainer,
                backgroundColor: isActive ? '#14a375' : 'rgba(255,255,255,0.06)',
                boxShadow: isActive ? 'none' : 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.25)' // Controlled by CSS keyframes when active
              }}
            >
              <span style={styles.emojiIcon} className="food-icon-wave">{cat.icon}</span>
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
    gap: '14px',
    overflowX: 'auto',
    padding: '12px 4px 20px 4px',
    WebkitOverflowScrolling: 'touch',
    width: '100%'
  },
  tabTile: {
    flex: '0 0 78px',
    borderRadius: '20px',
    padding: '10px 4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  iconContainer: {
    width: '54px',
    height: '54px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: '8px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.25s ease-in-out'
  },
  emojiIcon: {
    fontSize: '32px',
    lineHeight: '1',
    transformOrigin: 'bottom center'
  },
  timeBadge: {
    position: 'absolute',
    bottom: '-3px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '9px',
    fontWeight: '800',
    padding: '2px 5px',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
  },
  label: {
    fontSize: '11px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease'
  }
};
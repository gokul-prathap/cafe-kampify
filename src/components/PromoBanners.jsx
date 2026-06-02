import React from "react";
import kampifyBanner from "../assets/kampify-banner.png";

export default function PromoBanners({ ordered, secondsLeft }) {
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  return (
    <>
      <style>{`
        @keyframes floatBanner {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes glow {
          0% { box-shadow: 0 0 0 rgba(56,239,125,0.2); }
          50% { box-shadow: 0 0 25px rgba(56,239,125,0.35); }
          100% { box-shadow: 0 0 0 rgba(56,239,125,0.2); }
        }
        @keyframes borderCircle {
          0%   { box-shadow: 4px 0 12px #38ef7d, -4px 0 0 transparent, 0 4px 0 transparent, 0 -4px 0 transparent; }
          25%  { box-shadow: 0 4px 12px #38ef7d,  4px 0 0 transparent, -4px 0 0 transparent, 0 -4px 0 transparent; }
          50%  { box-shadow: -4px 0 12px #38ef7d, 0 4px 0 transparent,  4px 0 0 transparent, 0 -4px 0 transparent; }
          75%  { box-shadow: 0 -4px 12px #38ef7d, -4px 0 0 transparent, 0 4px 0 transparent,  4px 0 0 transparent; }
          100% { box-shadow: 4px 0 12px #38ef7d, -4px 0 0 transparent, 0 4px 0 transparent, 0 -4px 0 transparent; }
        }
        .prep-glow {
          animation: borderCircle 1.8s linear infinite !important;
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.heroBanner}>
          <img
            src={kampifyBanner}
            alt="Cafe Kampify"
            style={styles.bannerImage}
          />

          <div style={styles.content}>
            <div style={styles.titleSection}>
              <h2 style={styles.title}>Good Food Takes Time</h2>

              <p style={styles.subtitle}>
                Every dish is freshly prepared only after you place your order.
              </p>
            </div>

            <div style={styles.badges}>
              <span style={styles.badge}>🌴 Freshly Prepared</span>
              <span style={styles.badge}>🛶 Kayak Café</span>
              <span style={styles.badge}>🍲 Signature Stews</span>
            </div>

            <div style={styles.prepBox} className="prep-glow">
              {ordered
                ? secondsLeft > 0
                  ? `⏳ Order ready in: ${fmt(secondsLeft)}`
                  : `✅ Order ready! Call kitchen if needed.`
                : `⏱ Average Preparation Time: 45 Minutes`
              }
            </div>

            <div style={styles.footerText}>
              Worth the wait.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: "100%",
    marginBottom: "16px",
  },

  heroBanner: {
    background:
      "linear-gradient(135deg, #0d3d2a 0%, #12503a 50%, #176446 100%)",
    borderRadius: "22px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    animation: "glow 6s ease-in-out infinite",
  },

  bannerImage: {
    width: "100%",
    display: "block",
    objectFit: "contain",
    paddingTop: "8px",
    maxHeight: "220px",
    animation: "floatBanner 8s ease-in-out infinite",
    pointerEvents: "none",
    userSelect: "none",
  },

  content: {
    padding: "0 16px 18px",
  },

  titleSection: {
    textAlign: "center",
  },

  title: {
    margin: "0",
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "0.5px",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "0",
    color: "rgba(255,255,255,0.85)",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  badges: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },

  badge: {
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    backdropFilter: "blur(6px)",
  },

  prepBox: {
    marginTop: "16px",
    background:
      "linear-gradient(90deg,#1f7a57,#38ef7d)",
    color: "#05331f",
    padding: "12px",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "800",
    fontSize: "13px",
  },

  footerText: {
    marginTop: "12px",
    textAlign: "center",
    color: "#bfffd8",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.5px",
  },
};
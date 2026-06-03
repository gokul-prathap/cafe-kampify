import React, { useState, useEffect, useRef } from "react";
import kampifyBanner from "../assets/kampify-banner.png";
import FloatingBubbles from './FloatingBubbles';
import FoodGrid from "./FoodGrid";
import { INITIAL_MENU as menuData } from "../data/menuData";

export default function PromoBanners({ cart, updateCart, handleRateItem }) {
    const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const [timeUpdater, setTimeUpdater] = useState(Date.now());
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showOrderInfo, setShowOrderInfo] = useState(false);

    const [bubbleY, setBubbleY] = useState(220); 
    const [isDragging, setIsDragging] = useState(false);
    const dragStartY = useRef(0);
    const dragStartBubbleY = useRef(0);
    const hasMovedSignificantly = useRef(false);

    const [textLineIndex, setTextLineIndex] = useState(0);

    const [scrollOffset, setScrollOffset] = useState(0);
    const lastScrollY = useRef(0);

    const breakfastCombos = menuData.filter(item => item.tag === "breakfast_combo");
    const todaysSpecials = menuData.filter(item => item.tag === "todays_special");
    const teaSnacks = menuData.filter(item => item.tag === "tea_snacks");
    const dinnerCombos = menuData.filter(item => item.tag === "dinner_combo");
    const juicesList = menuData.filter(item => item.tag === "juices");

    let activeSecondsLeft = 0;
    let hasSavedOrders = false;
    let orderedItemsSummary = [];

    try {
        const saved = localStorage.getItem('kampify_orders_list');
        if (saved) {
            const ordersList = JSON.parse(saved);
            if (ordersList && ordersList.length > 0) {
                hasSavedOrders = true;
                const latestOrd = ordersList[0];
                const elapsed = Math.floor((timeUpdater - latestOrd.timestamp) / 1000);
                activeSecondsLeft = Math.max(0, latestOrd.durationSeconds - elapsed);

                if (latestOrd.items) {
                    orderedItemsSummary = Object.values(latestOrd.items);
                } else if (latestOrd.cart) {
                    orderedItemsSummary = Object.values(latestOrd.cart);
                }
            }
        }
    } catch (e) {
        console.error("Could not parse orders inside PromoBanners", e);
    }

    const hasActiveCookingOrder = hasSavedOrders && activeSecondsLeft > 0;

    const [isMinimized, setIsMinimized] = useState(true);

    const [animateTrigger, setAnimateTrigger] = useState(true);

    const landingTextLines = [
        "We prepare every dish fresh, only after you place your order.",
        "To maintain quality and taste, please allow us a minimum of 45 minutes for preparation.",
        "We truly believe patience is rewarded with good food, and we promise it will be worth the wait."
    ];

    useEffect(() => {
        if (currentSlide !== 0) return;
        const textTimer = setInterval(() => {
            setTextLineIndex((prev) => (prev + 1) % landingTextLines.length);
        }, 3500);
        return () => clearInterval(textTimer);
    }, [currentSlide]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeUpdater(Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const computedOffset = Math.min(220, currentScrollY * 0.45);
            setScrollOffset(computedOffset);
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const currentY = e.clientY || (e.touches && e.touches[0].clientY);
            const deltaY = currentY - dragStartY.current;

            if (Math.abs(deltaY) > 6) {
                hasMovedSignificantly.current = true;
            }

            const computedY = Math.max(20, Math.min(window.innerHeight - 80, dragStartBubbleY.current + deltaY));
            setBubbleY(computedY);
        };

        const handlePointerUp = () => {
            if (isDragging) {
                setIsDragging(false);
                setTimeout(() => {
                    hasMovedSignificantly.current = false;
                }, 50);
            }
        };

        if (isDragging) {
            window.addEventListener("mousemove", handlePointerMove);
            window.addEventListener("mouseup", handlePointerUp);
            window.addEventListener("touchmove", handlePointerMove, { passive: false });
            window.addEventListener("touchend", handlePointerUp);
        }

        return () => {
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("mouseup", handlePointerUp);
            window.removeEventListener("touchmove", handlePointerMove);
            window.removeEventListener("touchend", handlePointerUp);
        };
    }, [isDragging]);

    const startDragHandler = (e) => {
        e.preventDefault();
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        dragStartY.current = clientY;
        dragStartBubbleY.current = bubbleY;
        hasMovedSignificantly.current = false;
        setIsDragging(true);
    };

    const handleBubbleClick = () => {
        if (!hasMovedSignificantly.current) {
            setShowOrderInfo(!showOrderInfo);
        }
    };

    const handleNavigation = (direction) => {
        setAnimateTrigger(false);

        setCurrentSlide((prev) => {
            const nextIndex = prev + direction;
            if (nextIndex >= activeSlides.length) return 0;
            if (nextIndex < 0) return activeSlides.length - 1;
            return nextIndex;
        });
    };

    useEffect(() => {
        if (!animateTrigger) {
            const t = setTimeout(() => setAnimateTrigger(true), 20);
            return () => clearTimeout(t);
        }
    }, [currentSlide, animateTrigger]);

    const slidesConfig = [
        {
            id: "brand_landing",
            isActive: true,
            hasBannerImage: true,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>Welcome to Cafe Kampify</h2>
                        <p style={styles.subtitle}>Discover freshly crafted rustic delicacies</p>
                    </div>

                    <div className="trace-glow-border button-trace-glow" style={styles.gradientPrepBox(isMinimized)}>
                        <div key={textLineIndex} className="soft-descent-fade" style={{ padding: '2px 0' }}>
                            ⛺ {landingTextLines[textLineIndex]}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "breakfast_combos",
            isActive: true,
            hasBannerImage: false,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>🌅 Sunrise Kerala Combos</h2>
                        {!isMinimized && <p style={styles.subtitle}>Fuel your mornings right (Available 7AM - 11AM)</p>}
                    </div>
                    <div className={isMinimized ? "minimized-scroll-container" : ""}>
                        <FoodGrid
                            processedDishes={breakfastCombos}
                            cart={cart || {}}
                            updateCart={updateCart}
                            handleRateItem={handleRateItem}
                        />
                    </div>
                </div>
            )
        },
        {
            id: "todays_specials",
            isActive: true,
            hasBannerImage: false,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>🔥 Today's Wild Specials</h2>
                        {!isMinimized && <p style={styles.subtitle}>Signature dishes cooked over cast-iron firepits</p>}
                    </div>
                    <div className={isMinimized ? "minimized-scroll-container" : ""}>
                        <FoodGrid
                            processedDishes={todaysSpecials}
                            cart={cart || {}}
                            updateCart={updateCart}
                            handleRateItem={handleRateItem}
                        />
                    </div>
                </div>
            )
        },
        {
            id: "tea_snacks",
            isActive: true,
            hasBannerImage: false,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>☕ Naadan Tea & Snacks</h2>
                        {!isMinimized && <p style={styles.subtitle}>Perfect pairing for a breezy mountain evening</p>}
                    </div>
                    <div className={isMinimized ? "minimized-scroll-container" : ""}>
                        <FoodGrid
                            processedDishes={teaSnacks}
                            cart={cart || {}}
                            updateCart={updateCart}
                            handleRateItem={handleRateItem}
                        />
                    </div>
                </div>
            )
        },
        {
            id: "dinner_section",
            isActive: true,
            hasBannerImage: false,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>🛶 Campfire Dinner Platters</h2>
                        {!isMinimized && <p style={styles.subtitle}>Hearty traditional dishes to wind down your evening</p>}
                    </div>
                    <div className={isMinimized ? "minimized-scroll-container" : ""}>
                        <FoodGrid
                            processedDishes={dinnerCombos}
                            cart={cart || {}}
                            updateCart={updateCart}
                            handleRateItem={handleRateItem}
                        />
                    </div>
                </div>
            )
        },
        {
            id: "juices_section",
            isActive: true,
            hasBannerImage: false,
            render: () => (
                <div style={styles.slideWrap}>
                    <div style={styles.titleSection}>
                        <h2 style={styles.title}>🍹 Kulukki & Fresh Juices</h2>
                        {!isMinimized && <p style={styles.subtitle}>Stay hydrated with cold-pressed refreshing treats</p>}
                    </div>
                    <div className={isMinimized ? "minimized-scroll-container" : ""}>
                        <FoodGrid
                            processedDishes={juicesList}
                            cart={cart || {}}
                            updateCart={updateCart}
                            handleRateItem={handleRateItem}
                        />
                    </div>
                </div>
            )
        }
    ];

    const activeSlides = slidesConfig.filter(slide => slide.isActive);
    const currentSlideData = activeSlides[currentSlide] || activeSlides[0];
    const scrollOpacity = !isMinimized ? 1 : Math.max(0, 1 - scrollOffset / 170);

    return (
        <>
            <style>{`
                @keyframes floatBanner {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes premiumSlideFade {
                    0% { opacity: 0; transform: translateX(12px); }
                    100% { opacity: 1; transform: translateX(0px); }
                }

                .premium-carousel-animate {
                    animation: premiumSlideFade 700ms cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
                }

                @keyframes softDescentFadeIn {
                    from { opacity: 0; transform: translateY(5px); filter: blur(0.5px); }
                    to { opacity: 1; transform: translateY(0); filter: blur(0); }
                }
                .soft-descent-fade {
                    animation: softDescentFadeIn 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }

                @keyframes orbitLightTracer {
                    100% { transform: rotate(360deg); }
                }
                .trace-glow-border {
                    position: relative;
                    z-index: 1;
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%) !important;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 0 15px rgba(245, 158, 11, 0.45);
                }
                .trace-glow-border::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-size: 50% 50%, 50% 50%;
                    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
                    background-image: conic-gradient(from 0deg, transparent 70%, #ffffff 90%, transparent 100%);
                    animation: orbitLightTracer 4s linear infinite;
                }
                .trace-glow-border::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 2px;
                    top: 2px;
                    width: calc(100% - 4px);
                    height: calc(100% - 4px);
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                    border-radius: 10px;
                }

                .minimized-scroll-container {
                    overflow-x: auto !important;
                    white-space: nowrap !important;
                    width: 100% !important;
                    padding: 4px 2px 10px 2px !important;
                    box-sizing: border-box !important;
                    scrollbar-width: none !important;
                }
                .minimized-scroll-container::-webkit-scrollbar {
                    display: none !important;
                }
                
                .minimized-scroll-container > div {
                    display: flex !important;
                    flex-direction: row !important;
                    flex-wrap: nowrap !important;
                    gap: 10px !important;
                    width: max-content !important;
                    pointer-events: auto !important;
                }
                
                /* UNIFORM & MINIATURE OVERRIDES FOR ALL FOOD CARDS IN MINIMIZED VIEWS */
                .minimized-scroll-container > div > div {
                    flex: 0 0 145px !important;
                    max-width: 145px !important;
                    height: 195px !important;  /* Uniform fixed heights ensure no misalignment */
                    margin-bottom: 0 !important;
                    display: inline-flex !important;
                    flex-direction: column !important;
                    white-space: normal !important;
                    padding: 8px 6px !important;
                    border-radius: 10px !important;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
                    pointer-events: auto !important;
                    position: relative !important;
                    justify-content: space-between !important;
                    background: rgb(255, 255, 255) !important;
                }

                .minimized-scroll-container > div > div h4 {
                    font-size: 10px !important;
                    margin: 1px 0 !important;
                    font-weight: 700 !important;
                    line-height: 1.1 !important;
                }
                .minimized-scroll-container > div > div img {
                    height: 75px !important;
                    width: 100% !important;
                    object-fit: cover !important;
                    border-radius: 8px !important;
                }
                .minimized-scroll-container > div > div div[style*="height: 160px"] {
                    height: 80px !important;
                }
                .minimized-scroll-container > div > div span[style*="font-size: 30px"] {
                    font-size: 13px !important;
                }
                .minimized-scroll-container > div > div span[style*="font-size: 12px"] {
                    font-size: 8px !important;
                }
                .minimized-scroll-container > div > div div[style*="font-size: 11px"] {
                    font-size: 8px !important;
                }
                .minimized-scroll-container > div > div button {
                    padding: 3px 6px !important;
                    font-size: 9px !important;
                    border-radius: 5px !important;
                    cursor: pointer !important;
                }
                .minimized-scroll-container > div > div div[style*="gap: 8px"] {
                    gap: 3px !important;
                }
                .minimized-scroll-container > div > div div[style*="gap: 8px"] button {
                    padding: 1px 3px !important;
                }
                .minimized-scroll-container > div > div div[style*="flex-wrap: wrap"] {
                    display: none !important;
                }

                @keyframes buttonOrbitTracer {
                    0% { transform: rotate(0deg); opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { transform: rotate(360deg); opacity: 0.3; }
                }

                .button-trace-glow {
                    position: relative;
                    z-index: 1;
                    overflow: hidden;
                }
                .button-trace-glow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: conic-gradient(from 0deg, transparent 60%, rgba(255,255,255,0.9) 90%, transparent 100%);
                    animation: buttonOrbitTracer 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                .button-trace-glow::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: 1px;
                    top: 1px;
                    width: calc(100% - 2px);
                    height: calc(100% - 2px);
                    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
                    border-radius: 11px;
                }
            `}</style>

            {/* DRAGGABLE, SIDE-STICKING MOVEABLE FLOATING LIVE WIDGET */}
            {hasActiveCookingOrder && (
                <div
                    style={{
                        ...styles.screenFloatingWidget,
                        top: `${bubbleY}px`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    onMouseDown={startDragHandler}
                    onTouchStart={startDragHandler}
                >
                    <div
                        onClick={handleBubbleClick}
                        style={styles.stickySideBubble}
                    >
                        ↕️ {fmt(activeSecondsLeft)}
                    </div>

                    {showOrderInfo && orderedItemsSummary.length > 0 && (
                        <div style={styles.sideInfoDropdown} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
                            <div style={{ fontWeight: '800', fontSize: '10px', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px' }}>Items Summary:</div>
                            {orderedItemsSummary.map((item, idx) => (
                                <div key={idx} style={styles.miniInfoLine}>
                                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '95px' }}>{item.name || item.title}</span>
                                    <span style={{ color: '#38ef7d', marginLeft: '6px' }}>x{item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div style={{
                ...styles.container,
                transform: `translateY(${-scrollOffset * 0.45}px)`,
                opacity: scrollOpacity
            }}>
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={styles.heroBanner}
                >
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}>
                        <FloatingBubbles progress={5} />
                    </div>

                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        style={styles.toggleButton}
                    >
                        {isMinimized ? "Expand Offers ▼" : "Collapse ▲"}
                    </button>

                    <button
                        onClick={() => handleNavigation(-1)}
                        style={{ ...styles.arrowButton, left: "10px" }}
                        aria-label="Previous Slide"
                    >
                        ◀
                    </button>

                    <button
                        onClick={() => handleNavigation(1)}
                        style={{ ...styles.arrowButton, right: "10px" }}
                        aria-label="Next Slide"
                    >
                        ▶
                    </button>

                    <div style={{ position: "relative", zIndex: 2, height: "100%", width: "100%" }}>
                        {currentSlideData.hasBannerImage && (
                            <img
                                src={kampifyBanner}
                                alt="Cafe Kampify"
                                style={{
                                    ...styles.bannerImage,
                                    maxHeight: isMinimized ? "250px" : "140px"
                                }}
                            />
                        )}

                        <div style={{
                            ...styles.content,
                            paddingTop: isMinimized ? "12px" : "16px",
                            position: "relative",
                            zIndex: 4
                        }}>
                            <div
                                className={animateTrigger ? "premium-carousel-animate" : ""}
                                style={styles.carouselStage(isMinimized)}
                            >
                                {currentSlideData.render()}
                            </div>

                            {activeSlides.length > 1 && (
                                <div style={styles.dotTrack}>
                                    {activeSlides.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setAnimateTrigger(false); setCurrentSlide(idx); }}
                                            style={{
                                                ...styles.navDot,
                                                background: currentSlide === idx ? "#38ef7d" : "rgba(255,255,255,0.25)",
                                                transform: currentSlide === idx ? "scale(1.2)" : "scale(1)"
                                            }}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
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
        position: "relative",
        zIndex: 5,
        transition: "transform 0.2s linear, opacity 0.2s linear",
        willChange: "transform, opacity"
    },
    heroBanner: {
        background: "linear-gradient(135deg, #0d3d2a 0%, #12503a 50%, #176446 100%)",
        borderRadius: "22px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(56, 239, 125, 0.15)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    toggleButton: {
        position: "absolute",
        top: "12px",
        right: "12px",
        zIndex: 120,
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
        color: "#ffffff",
        padding: "6px 12px",
        fontSize: "11px",
        fontWeight: "700",
        cursor: "pointer",
        backdropFilter: "blur(6px)",
        transition: "all 0.2s ease",
    },
    arrowButton: {
        position: "absolute",
        top: "55%",
        transform: "translateY(-50%)",
        zIndex: 120,
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "50%",
        color: "#ffffff",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(255,255,255,0.1)",
        transition: "all 0.2s ease-in-out",
        outline: "none",
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        objectFit: "contain",
        paddingTop: "8px",
        objectPosition: "top center",
        animation: "floatBanner 3s ease-in-out infinite",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 1,
        transition: "max-height 0.3s ease-in-out",
    },
    content: {
        padding: "0 36px 12px",
        position: "relative"
    },
    carouselStage: (isMinimized) => ({
        height: isMinimized ? "250px" : "auto",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        position: "relative",
        zIndex: 3
    }),
    screenFloatingWidget: {
        position: "fixed",
        right: "0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        zIndex: 99999,
        touchAction: "none",
        userSelect: "none"
    },
    stickySideBubble: {
        background: "linear-gradient(135deg, #0d3d2a 0%, #061c13 100%)",
        border: "1px solid rgba(56, 239, 125, 0.6)",
        borderRight: "none",
        borderRadius: "20px 0 0 20px",
        padding: "8px 12px 8px 10px",
        fontSize: "11px",
        fontWeight: "900",
        color: "#ffffff",
        boxShadow: "-4px 4px 12px rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        userSelect: "none"
    },
    sideInfoDropdown: {
        background: "rgba(8, 38, 26, 0.98)",
        border: "1px solid rgba(56, 239, 125, 0.4)",
        borderRadius: "8px",
        padding: "8px 12px",
        width: "150px",
        boxShadow: "-4px 6px 20px rgba(0,0,0,0.5)",
        marginRight: "6px",
        marginTop: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "4px"
    },
    miniInfoLine: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "10px",
        fontWeight: "600",
        color: "rgba(255,255,255,0.9)",
        lineHeight: "1.2"
    },
    gradientPrepBox: (isMinimized) => ({
        padding: isMinimized ? "6px 6px" : "12px 16px",
        textAlign: "center",
        fontWeight: "700",
        background: 'white',
        fontSize: isMinimized ? "10px" : "12px",
        lineHeight: "1.4",
        color: "#ffffff",
        position: "absolute",
        bottom: "16px",
        left: "16px",
        right: "16px",
        width: "calc(100% - 32px)",
        boxSizing: "border-box"
    }),
    slideWrap: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column"
    },
    titleSection: {
        textAlign: "center",
        marginBottom: "10px",
        marginTop: "16px"
    },
    title: {
        margin: "0",
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: "900",
        lineHeight: "1.2",
    },
    subtitle: {
        marginTop: "3px",
        marginBottom: "0",
        color: "rgba(255,255,255,0.75)",
        fontSize: "11px",
    },
    dotTrack: {
        display: "flex",
        justifyContent: "center",
        gap: "6px",
        marginTop: "6px",
    },
    navDot: {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        border: "none",
        padding: "0",
        cursor: "pointer",
        transition: "all 0.2s ease",
    }
};
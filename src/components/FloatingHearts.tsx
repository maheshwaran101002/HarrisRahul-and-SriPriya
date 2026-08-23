"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  symbol: string;
}

const HEART_COLORS = [
  "text-pink-400",
  "text-rose-400",
  "text-amber-300",
  "text-red-400",
  "text-rose-300",
  "text-yellow-200",
];

const HEART_SYMBOLS = ["❤", "💕", "💗", "♥", "💖"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const addHeart = useCallback((x: number, y: number) => {
    const newHeart: Heart = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: 14 + Math.random() * 18,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
    };

    setHearts((prev) => [...prev.slice(-35), newHeart]);
  }, []);

  useEffect(() => {
    let lastMoveTime = 0;
    let lastScrollTime = 0;

    // Mouse / Pointer Move (Web Hovering Everywhere)
    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 60) return;
      lastMoveTime = now;
      addHeart(e.clientX, e.clientY);
    };

    // Touch Move / Touch Start (Mobile Scrolling & Touching)
    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastMoveTime < 80) return;
      lastMoveTime = now;
      const touch = e.touches[0];
      if (touch) {
        addHeart(touch.clientX, touch.clientY);
      }
    };

    // Scroll Event (Triggers hearts continuously as user scrolls on mobile & web)
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 120) return;
      lastScrollTime = now;

      // Spawn random hearts near center & sides during scroll
      const randomX = Math.random() * window.innerWidth;
      const randomY = window.innerHeight * 0.4 + Math.random() * (window.innerHeight * 0.5);
      addHeart(randomX, randomY);
    };

    // Click / Tap Event (Burst of hearts on click)
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          addHeart(
            e.clientX + (Math.random() * 40 - 20),
            e.clientY + (Math.random() * 40 - 20)
          );
        }, i * 60);
      }
    };

    // Ambient floating hearts drifting up naturally in the background
    const ambientInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 20;
        addHeart(x, y);
      }
    }, 800);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      clearInterval(ambientInterval);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [addHeart]);

  // Clean old hearts automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 2200));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 0.9,
              scale: 0.4,
              x: heart.x - heart.size / 2,
              y: heart.y - heart.size / 2,
            }}
            animate={{
              opacity: 0,
              scale: 1.3,
              x: heart.x + (Math.random() * 60 - 30),
              y: heart.y - 140 - Math.random() * 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
            className={`absolute ${heart.color} drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]`}
            style={{
              fontSize: `${heart.size}px`,
              pointerEvents: "none",
            }}
          >
            {heart.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

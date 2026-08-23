"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const HEART_COLORS = [
  "text-pink-400",
  "text-rose-400",
  "text-pink-300",
  "text-red-400",
  "text-rose-300",
];

const HEART_SYMBOLS = ["❤", "💕", "💗", "♥"];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to ~every 100ms and 70% chance
      if (now - lastTime < 100) return;
      if (Math.random() > 0.7) return;
      lastTime = now;

      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: 14 + Math.random() * 16,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        },
      ]);
    };

    // Also support touch for mobile
    const handleTouch = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 150) return;
      lastTime = now;
      const touch = e.touches[0];
      if (!touch) return;

      setHearts((prev) => [
        ...prev.slice(-20),
        {
          id: now + Math.random(),
          x: touch.clientX,
          y: touch.clientY,
          size: 14 + Math.random() * 16,
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        },
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  // Auto-clean old hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 2000));
    }, 500);
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
              scale: 0.3,
              x: heart.x - heart.size / 2,
              y: heart.y - heart.size / 2,
            }}
            animate={{
              opacity: 0,
              scale: 1.2,
              x: heart.x + (Math.random() * 60 - 30),
              y: heart.y - 120 - Math.random() * 80,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className={`absolute ${heart.color} drop-shadow-[0_0_6px_rgba(244,114,182,0.5)]`}
            style={{
              fontSize: `${heart.size}px`,
              pointerEvents: "none",
            }}
          >
            {HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)]}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

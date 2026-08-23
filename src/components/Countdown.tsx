"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Safe cross-platform date initialization for iOS Safari & Android
const getTargetTimestamp = () => new Date(2026, 8, 13, 7, 30, 0).getTime();

export default function Countdown() {
  const calculateTimeLeft = () => {
    const target = getTargetTimestamp();
    const now = new Date().getTime();
    const distance = target - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateMandala = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    // Initial immediate calculation to prevent 00 flicker on mount
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-28 md:py-40 bg-void text-center overflow-hidden min-h-[50vh] sm:min-h-[70vh] flex items-center justify-center">
      
      {/* Interactive Rotating Mandala */}
      <motion.div 
        style={{ rotate: rotateMandala }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 sm:opacity-20 transform-gpu"
      >
        <svg viewBox="0 0 800 800" className="w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px] text-gold-400 opacity-30">
          <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="2" />
          {[...Array(24)].map((_, i) => (
            <path 
              key={i} 
              d="M400,100 C450,200 450,300 400,400 C350,300 350,200 400,100 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              transform={`rotate(${i * 15} 400 400)`}
            />
          ))}
          <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="400" cy="400" r="100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gold-400 rotate-45 mx-auto mb-6 sm:mb-12 shadow-[0_0_15px_#C5A059]" />

        <h3 className="text-sm sm:text-xl md:text-2xl font-serif text-champagne mb-8 sm:mb-16 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
          Awaiting the Moment
        </h3>
        
        {/* Responsive Grid for mobile devices */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 md:gap-12 font-serif max-w-3xl mx-auto">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center relative group interactive py-2">
              <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 sm:mb-4 font-light tabular-nums leading-none text-[#F0D78C] drop-shadow-[0_4px_20px_rgba(197,160,89,0.5)] transition-transform duration-500 group-hover:scale-110">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase text-champagne/80 font-sans font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

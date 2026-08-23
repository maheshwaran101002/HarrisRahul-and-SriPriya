"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TARGET_DATE = new Date("2026-09-13T07:30:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateMandala = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 md:py-48 bg-void text-center overflow-hidden min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center">
      
      {/* Interactive Rotating Mandala */}
      <motion.div 
        style={{ rotate: rotateMandala }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 sm:opacity-20"
      >
        <svg viewBox="0 0 800 800" className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[1000px] md:h-[1000px] lg:w-[1200px] lg:h-[1200px] text-gold-400 opacity-30">
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

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="w-3 sm:w-4 h-3 sm:h-4 bg-gold-400 rotate-45 mx-auto mb-8 sm:mb-16 shadow-[0_0_15px_#C5A059]" />

        <h3 className="text-base sm:text-xl md:text-2xl font-serif text-champagne mb-12 sm:mb-24 tracking-[0.2em] sm:tracking-[0.3em] uppercase">
          Awaiting the Moment
        </h3>
        
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-24 text-gold-gradient font-serif">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center relative group interactive min-w-[60px] sm:min-w-[80px]">
              <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 sm:mb-6 font-light tabular-nums leading-none drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-champagne/60 font-sans">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

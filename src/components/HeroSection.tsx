"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.6], [0, -80]);

  return (
    <section
      ref={containerRef}
      className="relative h-[140vh] w-full overflow-hidden bg-void"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Couple Portrait - Full screen immersive */}
        <motion.div style={{ y: yImage, scale: scaleBg, opacity: opacityBg }} className="absolute inset-0 z-10">
          <Image
            src="/assets/wedding/couple.jpeg"
            alt="Harris Rahul & Sri Priya"
            fill
            className="object-cover object-[center_15%]"
            priority
            sizes="100vw"
          />
        </motion.div>

        {/* Light Leaks VFX */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(245,230,211,0.15)_0%,transparent_70%)] pointer-events-none z-20 transform-gpu" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(197,160,89,0.15)_0%,transparent_70%)] pointer-events-none z-20 transform-gpu" />

        {/* Subtle top & bottom gradients for perfect contrast & alignment */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-void/90 via-void/40 to-transparent pointer-events-none transform-gpu h-36" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-void via-void/40 to-transparent pointer-events-none transform-gpu" />

        {/* Top invitation badge - perfectly aligned in upper floral zone */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="absolute top-3 sm:top-5 left-0 right-0 z-30 flex justify-center px-4"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-void/85 backdrop-blur-md px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-antique-gold/50 shadow-[0_4px_25px_rgba(0,0,0,0.9)] max-w-[92%] sm:max-w-none">
            <div className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
            <span className="text-gold-gradient font-sans font-medium uppercase tracking-[0.16em] sm:tracking-[0.35em] text-[9px] sm:text-xs whitespace-nowrap">
              You are cordially invited to the wedding of
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" />
          </div>
        </motion.div>

        {/* Main typography */}
        <motion.div 
          style={{ opacity: opacityText, y: yText }} 
          className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-0 right-0 z-30 text-center flex flex-col items-center pointer-events-none px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 2, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-gold-gradient drop-shadow-[0_2px_30px_rgba(197,160,89,0.5)] tracking-wide leading-none">
              Harris Rahul
            </h1>
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-3 sm:my-4 md:my-5">
              <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-r from-transparent to-antique-gold/50" />
              <span className="text-xl sm:text-2xl md:text-3xl italic font-light text-lavender font-serif">&amp;</span>
              <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-l from-transparent to-antique-gold/50" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-gold-gradient drop-shadow-[0_2px_30px_rgba(197,160,89,0.5)] tracking-wide leading-none">
              Sri Priya
            </h1>
          </motion.div>

          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4"
          >
            <div className="h-[1px] w-8 sm:w-12 bg-champagne/20" />
            <p className="text-champagne/60 text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-sans">
              13 September 2026
            </p>
            <div className="h-[1px] w-8 sm:w-12 bg-champagne/20" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-10 sm:mt-14 flex flex-col items-center"
          >
            <p className="text-champagne/30 font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-3">Scroll</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-6 bg-gradient-to-b from-champagne/40 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

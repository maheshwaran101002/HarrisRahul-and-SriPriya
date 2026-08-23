"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function BrideGroomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 md:py-40 bg-void overflow-hidden">
      {/* Cinematic Lighting VFX */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-temple-purple/15 rounded-full blur-[150px]" />
        
        {/* Dynamic Light Leaks */}
        <div className="absolute top-[10%] right-[-20%] w-[60%] h-[60%] bg-[#c5a059] opacity-0 blur-[120px] mix-blend-screen pointer-events-none z-0 animate-[lightLeak_10s_infinite_ease-in-out_2s]" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[50%] h-[50%] bg-[#cba4d8] opacity-0 blur-[100px] mix-blend-overlay pointer-events-none z-0 animate-[lightLeak_15s_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4">
            The Couple
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ivory">
            Two Souls, <span className="text-gold-gradient italic">One Journey</span>
          </h2>
        </motion.div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 max-w-5xl mx-auto">
          
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative mb-6 sm:mb-8">
              {/* Ornamental ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-antique-gold/30"
              />
              {/* Photo container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-antique-gold/40 shadow-[0_0_40px_rgba(197,160,89,0.15)] group-hover:shadow-[0_0_60px_rgba(197,160,89,0.25)] transition-shadow duration-700">
                <Image
                  src="/assets/wedding/IMG_4773.JPG.jpeg"
                  alt="Harris Rahul - The Groom"
                  fill
                  className="object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              {/* Crown icon */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl drop-shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                👑
              </div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gold-gradient mb-2 sm:mb-3">
              Harris Rahul
            </h3>
            <p className="text-champagne/50 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-sans mb-4 sm:mb-6">
              The Groom
            </p>
            <p className="text-champagne/60 font-sans text-xs sm:text-sm leading-relaxed max-w-xs">
              Son of Mr. K. Jaya Balaji &amp; Mrs. J. Mohanasundari
            </p>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative mb-6 sm:mb-8">
              {/* Ornamental ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-lavender/30"
              />
              {/* Photo container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-lavender/40 shadow-[0_0_40px_rgba(203,164,216,0.15)] group-hover:shadow-[0_0_60px_rgba(203,164,216,0.25)] transition-shadow duration-700">
                <Image
                  src="/assets/wedding/FSP06952.jpg.jpeg"
                  alt="Dr. K. Sri Priya - The Bride"
                  fill
                  className="object-cover object-[center_30%] group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 192px, 256px"
                />
              </div>
              {/* Flower icon */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl drop-shadow-[0_0_10px_rgba(203,164,216,0.5)]">
                🌸
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gold-gradient mb-2 sm:mb-3">
              Dr. K. Sri Priya
            </h3>
            <p className="text-champagne/50 uppercase tracking-[0.3em] text-[10px] sm:text-xs font-sans mb-4 sm:mb-6">
              The Bride
            </p>
            <p className="text-champagne/60 font-sans text-xs sm:text-sm leading-relaxed max-w-xs">
              Daughter of Er. K. Kannan &amp; Mrs. K. Uma
            </p>
          </motion.div>
        </div>

        {/* Connecting element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="hidden md:flex items-center justify-center mt-16"
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-antique-gold/40" />
          <div className="mx-4 text-xl text-antique-gold/50">💍</div>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-antique-gold/40" />
        </motion.div>
      </div>
    </section>
  );
}

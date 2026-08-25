"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-32 bg-void">
      {/* Mandapam Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/wedding/wedding_mandapam.png"
          alt="Reception Mandapam"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,5,16,0.65)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center text-center"
        >
          {/* Diya icon */}
          <div className="mb-6 sm:mb-8">
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 sm:w-6 h-7 sm:h-9 bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_20px_rgba(255,180,50,0.5)]"
              />
              <div className="w-10 sm:w-12 h-2 bg-gradient-to-r from-yellow-700/60 via-yellow-500/60 to-yellow-700/60 rounded-full mt-1" />
            </div>
          </div>

          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-3 sm:mb-4">
            The Evening Celebration
          </p>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-ivory mb-8 sm:mb-12 drop-shadow-[0_0_40px_rgba(197,160,89,0.3)]">
            Reception
          </h2>

          {/* Event card with frosted glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-2xl bg-void/40 backdrop-blur-lg rounded-2xl border border-champagne/10 p-8 sm:p-10 md:p-14 shadow-[0_0_80px_rgba(0,0,0,0.3)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 text-champagne">
              <div className="flex flex-col items-center text-center border-b sm:border-b-0 sm:border-r border-gold-400/15 pb-8 sm:pb-0 sm:pr-8">
                <div className="text-2xl sm:text-3xl mb-3">📅</div>
                <span className="text-gold-gradient font-serif text-lg sm:text-xl mb-2 italic">When</span>
                <p className="font-sans font-light tracking-wider text-sm sm:text-base uppercase">Saturday</p>
                <p className="font-serif text-2xl sm:text-3xl text-ivory my-2">12 September</p>
                <p className="font-serif text-lg text-ivory mb-2">2026</p>
                <div className="w-10 h-[1px] bg-champagne/20 my-3" />
                <p className="font-sans font-light tracking-[0.15em] text-xs opacity-70">6:00 PM Onwards</p>
              </div>
              
              <div className="flex flex-col items-center text-center pt-8 sm:pt-0 sm:pl-8">
                <div className="text-2xl sm:text-3xl mb-3">✨</div>
                <span className="text-gold-gradient font-serif text-lg sm:text-xl mb-2 italic">Where</span>
                <p className="font-serif text-xl sm:text-2xl text-ivory my-2 leading-snug">
                  Thappa Gardens<br/>Resort
                </p>
                <div className="w-10 h-[1px] bg-champagne/20 my-3" />
                <p className="font-sans font-light tracking-wide text-xs opacity-70 leading-relaxed">
                  Main Road, Ariyakudi<br/>Karaikkudi
                </p>
              </div>
            </div>

            {/* Directions Button for Thappa Gardens Resort */}
            <div className="mt-10 sm:mt-12 flex justify-center">
              <a
                href="https://maps.app.goo.gl/mFyxNRZi8KCuLRe68"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 overflow-hidden rounded-full interactive cursor-pointer shadow-[0_0_30px_rgba(197,160,89,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A843] via-[#F0D78C] to-[#D4A843] rounded-full" />
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                />
                <span className="relative z-10 font-sans text-xs tracking-[0.2em] uppercase text-void font-medium">📍 Get Directions to Thappa Gardens</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

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
            The Evening Celebrations
          </p>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-ivory mb-8 sm:mb-12 drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            Pre-Wedding &amp; Reception
          </h2>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl mb-8 sm:mb-12">
            
            {/* Pre-Wedding Function Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-void/40 backdrop-blur-lg rounded-2xl border border-champagne/15 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-antique-gold/40 transition-colors"
            >
              <div>
                <div className="text-2xl sm:text-3xl mb-3">✨</div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-antique-gold font-sans font-medium mb-1 block">
                  Grand Evening Celebration
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-3">
                  Pre-Wedding Function
                </h3>
                <p className="font-serif text-lg sm:text-xl text-champagne/90 mb-1">
                  Saturday, 12 September 2026
                </p>
                <p className="font-sans font-light tracking-[0.15em] text-xs opacity-80 text-champagne mb-6">
                  6:00 PM Onwards
                </p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent mb-6" />

                <p className="font-serif text-xl text-gold-gradient mb-1">
                  Thappa Gardens Resort
                </p>
                <p className="font-sans font-light text-xs tracking-[0.12em] opacity-70 text-champagne leading-relaxed">
                  Main Road, Ariyakudi<br />Karaikkudi
                </p>
              </div>
            </motion.div>

            {/* Reception Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-void/40 backdrop-blur-lg rounded-2xl border border-champagne/15 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-antique-gold/40 transition-colors"
            >
              <div>
                <div className="text-2xl sm:text-3xl mb-3">🎊</div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-antique-gold font-sans font-medium mb-1 block">
                  Wedding Reception
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-3">
                  Reception
                </h3>
                <p className="font-serif text-lg sm:text-xl text-champagne/90 mb-1">
                  Sunday, 13 September 2026
                </p>
                <p className="font-sans font-light tracking-[0.15em] text-xs opacity-80 text-champagne mb-6">
                  9:30 PM Onwards
                </p>

                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent mb-6" />

                <p className="font-serif text-xl text-gold-gradient mb-1">
                  Thappa Gardens Resort
                </p>
                <p className="font-sans font-light text-xs tracking-[0.12em] opacity-70 text-champagne leading-relaxed">
                  Main Road, Ariyakudi<br />Karaikkudi
                </p>
              </div>
            </motion.div>
          </div>

          {/* Directions Button for Thappa Gardens Resort */}
          <div className="flex justify-center">
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
      </div>
    </section>
  );
}

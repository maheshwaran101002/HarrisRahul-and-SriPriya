"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Reception() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-32">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,5,16,0.6)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center text-center"
        >
          {/* Diya icon */}
          <div className="mb-8 sm:mb-12">
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ scaleY: [1, 1.2, 0.9, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 sm:w-6 h-7 sm:h-9 bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_20px_rgba(255,180,50,0.5)]"
              />
              <div className="w-10 sm:w-12 h-2 bg-gradient-to-r from-yellow-700/60 via-yellow-500/60 to-yellow-700/60 rounded-full mt-1" />
            </div>
          </div>

          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4 sm:mb-6">
            The Evening Celebration
          </p>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-ivory mb-6 sm:mb-8 drop-shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            Reception
          </h2>

          {/* Event card with frosted glass */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-lg bg-void/40 backdrop-blur-lg rounded-2xl border border-champagne/10 p-8 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(0,0,0,0.3)]"
          >
            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl mb-3">🎊</div>
              <p className="font-serif text-2xl sm:text-3xl text-ivory mb-2">13 September 2026</p>
              <p className="font-sans font-light tracking-[0.15em] text-xs opacity-70 text-champagne mb-6">
                9:30 PM onwards
              </p>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-champagne/20 to-transparent mb-6" />
              
              <div className="text-2xl mb-3">🏛️</div>
              <p className="font-serif text-2xl sm:text-3xl text-gold-gradient mb-2">
                Thappa Gardens Resort
              </p>
              <p className="font-sans font-light text-xs tracking-[0.15em] opacity-70 text-champagne leading-loose">
                Main Road, Ariyakudi<br />Karaikkudi
              </p>
            </div>

            {/* Get Directions */}
            <div className="mt-10 flex justify-center">
              <a
                href="https://maps.app.goo.gl/mFyxNRZi8KCuLRe68"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 overflow-hidden rounded-full interactive cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A843] via-[#F0D78C] to-[#D4A843] rounded-full" />
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                />
                <span className="relative z-10 font-sans text-xs tracking-[0.2em] uppercase text-void font-medium">📍 Get Directions</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

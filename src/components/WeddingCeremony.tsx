"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function WeddingCeremony() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden min-h-screen flex items-center justify-center py-20 sm:py-24 md:py-32">
      {/* Temple Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/wedding/grand_temple.png"
          alt="Arulmigu Tiruvengadamudayan Temple"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,5,16,0.6)_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center text-center"
        >
          {/* Gold line top */}
          <div className="w-[2px] h-16 sm:h-24 bg-gradient-to-b from-transparent to-gold-400/50 mb-6 sm:mb-8" />
          
          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4 sm:mb-6">
            The Sacred Union
          </p>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-ivory mb-6 sm:mb-8 drop-shadow-[0_0_40px_rgba(253,251,247,0.2)]">
            Muhurtham
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
                <p className="font-sans font-light tracking-wider text-sm sm:text-base uppercase">Sunday</p>
                <p className="font-serif text-2xl sm:text-3xl text-ivory my-2">13 September</p>
                <p className="font-serif text-lg text-ivory mb-2">2026</p>
                <div className="w-10 h-[1px] bg-champagne/20 my-3" />
                <p className="font-sans font-light tracking-[0.15em] text-xs opacity-70">7:30 AM — 9:00 AM</p>
              </div>
              
              <div className="flex flex-col items-center text-center pt-8 sm:pt-0 sm:pl-8">
                <div className="text-2xl sm:text-3xl mb-3">🛕</div>
                <span className="text-gold-gradient font-serif text-lg sm:text-xl mb-2 italic">Where</span>
                <p className="font-serif text-xl sm:text-2xl text-ivory my-2 leading-snug">
                  Arulmigu<br/>Tiruvengadamudayan<br/>Temple
                </p>
                <div className="w-10 h-[1px] bg-champagne/20 my-3" />
                <p className="font-sans font-light tracking-wide text-xs opacity-70 leading-relaxed">
                  Devakottai Road, Ariyakudi<br/>Karaikudi
                </p>
              </div>
            </div>

            {/* Get Directions */}
            <div className="mt-10 sm:mt-12 flex justify-center">
              <a
                href="https://maps.app.goo.gl/8F63PLdjA3A3nJsG6?g_st=iw"
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

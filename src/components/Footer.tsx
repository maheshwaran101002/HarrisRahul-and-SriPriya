"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(textRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={sectionRef} className="relative w-full overflow-hidden flex flex-col items-center justify-center py-16 sm:py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/wedding/temple_at_night.png"
          alt="Temple at Night"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void" />
      </div>

      <div ref={textRef} className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        
        {/* Diya */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative flex flex-col items-center">
            <div className="w-12 sm:w-16 h-16 sm:h-24 bg-gradient-to-t from-orange-500/20 to-yellow-200/10 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] animate-pulse blur-[1px] flex justify-center items-end">
              <div className="w-3 sm:w-4 h-5 sm:h-6 absolute top-4 sm:top-6 bg-yellow-100/50 rounded-full blur-[2px]" />
              <div className="w-8 sm:w-12 h-2 bg-gradient-to-r from-yellow-700/50 via-yellow-500/50 to-yellow-700/50 rounded-full shadow-[0_0_15px_rgba(255,200,0,0.2)]" />
            </div>
            <div className="w-24 sm:w-32 h-4 bg-orange-500/10 rounded-full blur-xl mt-3 sm:mt-4" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-gold-gradient mb-6 sm:mb-8 drop-shadow-2xl leading-tight">
          HARRIS RAHUL
          <br />
          <span className="text-2xl sm:text-3xl md:text-5xl italic font-light text-lavender my-2 sm:my-4 block">&amp;</span>
          SRI PRIYA
        </h2>

        <p className="text-champagne/80 font-sans tracking-[0.3em] sm:tracking-[0.4em] uppercase text-xs sm:text-sm mb-10 sm:mb-16">
          13 &bull; 09 &bull; 2026
        </p>

        <p className="text-ivory/70 font-sans max-w-lg mx-auto font-light leading-relaxed text-xs sm:text-sm md:text-base px-4">
          We look forward to celebrating this beautiful beginning with you.
          <br /><br />
          <span className="text-gold-gradient font-serif tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm">With Love</span>
        </p>
        
        <div className="mt-12 sm:mt-20">
          <a 
            href="/assets/Harris weds Sripriya - Padding 8 (Frame Type).pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block relative overflow-hidden group interactive border border-champagne/20 rounded-full px-6 sm:px-8 py-3"
          >
            <span className="relative z-10 font-sans text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-champagne group-hover:text-void transition-colors duration-500">
              View Original Invitation
            </span>
            <div className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
        </div>
      </div>
    </footer>
  );
}

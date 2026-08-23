"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Auto-attempt play on first user interaction
  useEffect(() => {
    if (!hasInteracted) {
      const handleFirstInteraction = () => {
        setHasInteracted(true);
        setIsPlaying(true);
      };
      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("touchstart", handleFirstInteraction, { once: true });
      return () => {
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      };
    }
  }, [hasInteracted]);

  return (
    <>
      <audio ref={audioRef} loop src="/assets/wedding_audio.mp3" preload="auto" />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[90] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-champagne/30 bg-void/70 backdrop-blur-md hover:bg-champagne/10 transition-colors group interactive cursor-pointer"
        aria-label="Toggle Sound"
      >
        <div className="flex items-end justify-center gap-[2px] sm:gap-1 h-3 sm:h-4">
          <motion.div 
            animate={isPlaying ? { height: ["20%", "100%", "40%"] } : { height: "20%" }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }} 
            className="w-[2px] bg-champagne rounded-full" 
          />
          <motion.div 
            animate={isPlaying ? { height: ["60%", "20%", "100%"] } : { height: "20%" }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.2 }} 
            className="w-[2px] bg-champagne rounded-full" 
          />
          <motion.div 
            animate={isPlaying ? { height: ["100%", "40%", "80%"] } : { height: "20%" }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.4 }} 
            className="w-[2px] bg-champagne rounded-full" 
          />
          <motion.div 
            animate={isPlaying ? { height: ["40%", "80%", "20%"] } : { height: "20%" }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut", delay: 0.6 }} 
            className="w-[2px] bg-champagne rounded-full" 
          />
        </div>
      </motion.button>
    </>
  );
}

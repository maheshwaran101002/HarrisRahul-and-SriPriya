"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  toggleAudioDirectly, 
  getIsAudioPlaying, 
  subscribeAudioState,
  playAudioDirectly 
} from "@/lib/audioManager";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Sync local button state with global audio manager
    setIsPlaying(getIsAudioPlaying());
    const unsubscribe = subscribeAudioState((playing) => {
      setIsPlaying(playing);
    });

    // Auto-attempt playback on first tap anywhere if not already playing
    const handleGlobalTap = () => {
      if (!getIsAudioPlaying()) {
        playAudioDirectly();
      }
    };

    window.addEventListener("click", handleGlobalTap, { once: true });
    window.addEventListener("touchstart", handleGlobalTap, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener("click", handleGlobalTap);
      window.removeEventListener("touchstart", handleGlobalTap);
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      onClick={() => toggleAudioDirectly()}
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
  );
}

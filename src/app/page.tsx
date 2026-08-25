"use client";

import { useState, useEffect } from "react";
import OpeningSequence from "@/components/OpeningSequence";
import HeroSection from "@/components/HeroSection";
import BrideGroomSection from "@/components/BrideGroomSection";
import StorySection from "@/components/StorySection";
import WeddingCeremony from "@/components/WeddingCeremony";
import Reception from "@/components/Reception";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import AudioController from "@/components/AudioController";

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [sequenceDone, setSequenceDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (!sequenceDone) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [sequenceDone]);

  const handleStartOpen = () => {
    window.scrollTo(0, 0);
    setShowMain(true);
  };

  const handleComplete = () => {
    setSequenceDone(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  };

  return (
    <main className="bg-void min-h-screen text-ivory selection:bg-gold-500/30 selection:text-gold-200 overflow-x-hidden">
      {!sequenceDone && (
        <OpeningSequence 
          onStartOpen={handleStartOpen}
          onComplete={handleComplete} 
        />
      )}
      
      {showMain && (
        <div className="relative z-10 animate-in fade-in duration-1000">
          <AudioController />
          <HeroSection />
          <BrideGroomSection />
          <StorySection />
          <Reception />
          <WeddingCeremony />
          <Countdown />
          <Footer />
        </div>
      )}
    </main>
  );
}

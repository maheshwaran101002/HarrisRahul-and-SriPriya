"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { playAudioDirectly } from "@/lib/audioManager";

export default function OpeningSequence({ onComplete, onStartOpen }: { onComplete: () => void, onStartOpen?: () => void }) {
  const [stage, setStage] = useState(0);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Timeline: 0→diya appears, 1→particles, 2→names, 3→button visible
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1800);
    const t3 = setTimeout(() => setStage(3), 3200);
    return () => { [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  // Floating golden particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; life: number; maxLife: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn particles
      if (Math.random() > 0.85 && particles.length < 60) {
        particles.push({
          x: canvas.width * 0.3 + Math.random() * canvas.width * 0.4,
          y: canvas.height * 0.6 + Math.random() * canvas.height * 0.3,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 1.5 - 0.5,
          size: Math.random() * 3 + 1,
          opacity: 0,
          life: 0,
          maxLife: 120 + Math.random() * 80,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.05;
        
        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.2 ? lifeRatio * 5 : lifeRatio > 0.7 ? (1 - lifeRatio) / 0.3 : 1;
        p.opacity *= 0.6;

        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(229, 195, 122, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(197, 160, 89, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(197, 160, 89, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const handleOpen = () => {
    // Trigger audio synchronously within user gesture context for mobile/Vercel support
    playAudioDirectly();
    if (onStartOpen) onStartOpen();
    setDoorsOpen(true);
    setTimeout(onComplete, 2500);
  };

  return (
    <AnimatePresence>
      {!doorsOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 1.7 } }}
        >
          {/* Background with temple */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={stage >= 1 ? { opacity: 0.2, scale: 1 } : {}}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/assets/wedding/temple_at_night.png"
              alt="Temple"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-void/50" />
          </motion.div>

          {/* Floating golden particles canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-2000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Central Diya */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Glow aura */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(255,180,50,0.25) 0%, transparent 70%)' }}
            />
            {/* Flame */}
            <motion.div
              animate={{ scaleY: [1, 1.15, 0.95, 1], scaleX: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-5 sm:w-7 h-8 sm:h-11 bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_20px_rgba(255,180,50,0.6),0_0_40px_rgba(255,150,30,0.3)]" />
            </motion.div>
            {/* Diya base */}
            <div className="w-10 sm:w-14 h-2 bg-gradient-to-r from-yellow-700/80 via-yellow-500 to-yellow-700/80 rounded-full mt-1 shadow-[0_0_10px_rgba(200,160,50,0.3)]" />
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-20 text-center mt-10 sm:mt-14 px-4"
          >
            <p className="text-champagne/50 uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs font-sans mb-4 sm:mb-6">
              With the blessings of the Almighty
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif text-gold-gradient font-medium tracking-wide drop-shadow-[0_2px_30px_rgba(197,160,89,0.5)] leading-tight">
              Harris Rahul
              <span className="text-lg sm:text-2xl md:text-3xl italic font-light text-lavender mx-3 sm:mx-4">&amp;</span>
              Sri Priya
            </h1>
            <p className="text-champagne/40 italic font-serif text-sm sm:text-lg mt-3 sm:mt-5 tracking-[0.1em]">
              request your gracious presence
            </p>
          </motion.div>

          {/* Golden Open Invitation Button - inspired by Mohak's golden CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="relative z-20 mt-10 sm:mt-14"
          >
            <button
              onClick={handleOpen}
              className="group relative px-10 sm:px-14 py-3.5 sm:py-4.5 overflow-hidden rounded-lg interactive cursor-pointer"
            >
              {/* Gold gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4A843] via-[#F0D78C] to-[#D4A843] rounded-lg shadow-[0_4px_30px_rgba(197,160,89,0.4)]" />
              {/* Shimmer animation */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              <span className="relative z-10 font-sans text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase text-void font-medium">
                Open Invitation
              </span>
            </button>

            {/* Subtle pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-lg border border-antique-gold/40 pointer-events-none"
            />
          </motion.div>
        </motion.div>
      ) : (
        /* Door Opening Animation with Magical Burst VFX */
        <motion.div className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none">
          
          {/* Intense Light Burst / Popper VFX */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.8, 1, 0], scale: [0.1, 4, 15] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full mix-blend-screen blur-[40px] z-[120]"
          />
          
          {/* Golden Magical Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: [1, 0.8, 0], scale: [0.5, 2, 5], rotate: 90 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] sm:w-[500px] sm:h-[500px] bg-[radial-gradient(circle,rgba(255,215,0,0.4)_0%,transparent_60%)] mix-blend-screen z-[110]"
          />
          
          {/* Left door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full relative"
          >
            <Image
              src="/assets/wedding/IMG_0863.PNG"
              alt="Wedding Couple"
              fill
              className="object-cover object-right"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-void/80 via-void/30 to-transparent" />
            {/* Gold border edge */}
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/60 to-transparent" />
          </motion.div>

          {/* Right door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-1/2 h-full relative"
          >
            <Image
              src="/assets/wedding/IMG_0863.PNG"
              alt="Wedding Couple"
              fill
              className="object-cover object-left"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/30 to-transparent" />
            {/* Gold border edge */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-antique-gold/60 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

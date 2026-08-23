"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PRESET_WISHES = [
  { name: "Family", emoji: "🙏", message: "May your life together be filled with love and joy. Blessings!" },
  { name: "Friends", emoji: "🎊", message: "So happy for you both! Can't wait to celebrate this beautiful day!" },
  { name: "Colleagues", emoji: "💐", message: "Congratulations! Wishing you a lifetime of happiness together!" },
];

export default function WishesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [wishes, setWishes] = useState<{ name: string; message: string; emoji: string }[]>(PRESET_WISHES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setWishes(prev => [{ name: name.trim(), message: message.trim(), emoji: "💌" }, ...prev]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 md:py-36 bg-void overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-rose/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-temple-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4">
            Blessings &amp; Wishes
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ivory mb-4">
            Send Your <span className="text-gold-gradient italic">Wishes</span>
          </h2>
          <p className="text-champagne/50 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Share your blessings and warm wishes for the couple as they begin their journey together.
          </p>
        </motion.div>

        {/* Wish Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative mb-12 sm:mb-16 p-6 sm:p-8 md:p-10 rounded-2xl border border-champagne/10 bg-void/50 backdrop-blur-sm"
        >
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-champagne/60 font-sans text-xs tracking-[0.15em] uppercase mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-transparent border-b border-champagne/20 focus:border-antique-gold/60 outline-none py-3 text-ivory font-serif text-base sm:text-lg placeholder:text-champagne/20 transition-colors duration-500"
              />
            </div>
            <div>
              <label className="block text-champagne/60 font-sans text-xs tracking-[0.15em] uppercase mb-2">Your Wishes</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessings here..."
                rows={3}
                className="w-full bg-transparent border-b border-champagne/20 focus:border-antique-gold/60 outline-none py-3 text-ivory font-serif text-base sm:text-lg placeholder:text-champagne/20 transition-colors duration-500 resize-none"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <AnimatePresence>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400/80 font-sans text-xs tracking-wider"
                  >
                    ✨ Thank you for your wishes!
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                type="submit"
                className="ml-auto group relative px-8 sm:px-10 py-2.5 sm:py-3 rounded-full overflow-hidden interactive cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A843] via-[#F0D78C] to-[#D4A843] rounded-full" />
                <span className="relative z-10 font-sans text-xs tracking-[0.2em] uppercase text-void font-medium">Send Wish 💌</span>
              </button>
            </div>
          </div>
        </motion.form>

        {/* Wishes Wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {wishes.map((wish, idx) => (
            <motion.div
              key={`${wish.name}-${idx}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-5 sm:p-6 rounded-xl border border-champagne/10 bg-void/30 backdrop-blur-sm hover:border-antique-gold/30 hover:bg-void/50 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{wish.emoji}</span>
                <span className="font-serif text-sm sm:text-base text-gold-gradient font-medium">{wish.name}</span>
              </div>
              <p className="text-champagne/60 font-sans text-xs sm:text-sm leading-relaxed italic">
                &ldquo;{wish.message}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

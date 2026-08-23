"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

const STORY_CARDS = [
  {
    image: "/assets/wedding/new_image.jpeg",
    objectPosition: "object-center",
    tag: "The Couple",
    title: "Two Hearts Met",
    description: "Two souls coming together to begin a beautiful new journey.",
  },
  {
    image: "/assets/wedding/groom_cropped.jpg",
    objectPosition: "object-[center_10%]",
    tag: "The Groom",
    title: "Harris Rahul",
    description: "Stepping into a new chapter with love and family blessings.",
  },
  {
    image: "/assets/wedding/FSP06952.jpg.jpeg",
    objectPosition: "object-[center_15%]",
    tag: "The Bride",
    title: "Sri Priya",
    description: "Embracing a new beginning with grace and happiness.",
  },
  {
    image: "/assets/wedding/ring_photo_1.jpeg",
    objectPosition: "object-center",
    tag: "The Promise",
    title: "Forever Begins",
    description: "Bound by love, tradition, and sacred vows.",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentCard((prev) => {
      const next = prev + newDirection;
      if (next < 0) return STORY_CARDS.length - 1;
      if (next >= STORY_CARDS.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 md:py-40 bg-void overflow-hidden">
      {/* Cinematic Background Light Leaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 transform-gpu">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(229,195,122,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(197,160,89,0.12)_0%,transparent_70%)] pointer-events-none" />
      </div>


      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4">
            A Love Written in Stars
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-gold-gradient italic mb-4 sm:mb-6">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-antique-gold/40" />
            <span className="text-antique-gold text-sm">✦</span>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-antique-gold/40" />
          </div>
          <p className="text-champagne/40 italic font-serif text-sm sm:text-base">
            Swipe or tap to flip ✦
          </p>
        </motion.div>

        {/* Card Carousel - inspired by Amritansh */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center items-center h-[500px] sm:h-[560px] md:h-[620px] perspective-[1200px]"
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-1 sm:left-4 md:left-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory/10 border border-champagne/20 backdrop-blur-sm flex items-center justify-center text-champagne text-xl sm:text-2xl hover:bg-champagne/20 hover:text-ivory transition-all cursor-pointer shadow-lg"
            aria-label="Previous Slide"
          >
            ‹
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-1 sm:right-4 md:right-12 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-ivory/10 border border-champagne/20 backdrop-blur-sm flex items-center justify-center text-champagne text-xl sm:text-2xl hover:bg-champagne/20 hover:text-ivory transition-all cursor-pointer shadow-lg"
            aria-label="Next Slide"
          >
            ›
          </button>

          {/* Card Stack effect - background cards */}
          <div className="absolute w-[280px] sm:w-[340px] md:w-[380px] h-[420px] sm:h-[480px] md:h-[520px] rounded-2xl bg-ivory/5 border border-champagne/10 translate-y-3 translate-x-2 rotate-3 pointer-events-none" />
          <div className="absolute w-[280px] sm:w-[340px] md:w-[380px] h-[420px] sm:h-[480px] md:h-[520px] rounded-2xl bg-ivory/3 border border-champagne/5 translate-y-6 translate-x-4 rotate-6 pointer-events-none" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentCard}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                const swipe = swipePower(info.offset.x, info.velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              className="absolute w-[280px] sm:w-[340px] md:w-[380px] cursor-grab active:cursor-grabbing"
            >
              <div className="bg-ivory/[0.03] backdrop-blur-sm border border-champagne/15 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_80px_rgba(197,160,89,0.1)] transition-shadow duration-500">
                {/* Image */}
                <div className="relative h-[240px] sm:h-[280px] md:h-[300px] overflow-hidden">
                  <Image
                    src={STORY_CARDS[currentCard].image}
                    alt={STORY_CARDS[currentCard].title}
                    fill
                    className={`object-cover ${STORY_CARDS[currentCard].objectPosition || "object-center"}`}
                    sizes="380px"
                  />
                  {/* Tag badge */}
                  <div className="absolute bottom-4 left-4 px-3 sm:px-4 py-1 sm:py-1.5 bg-ivory/90 backdrop-blur-sm rounded-full">
                    <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.15em] text-void/80 font-medium">
                      {STORY_CARDS[currentCard].tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gold-gradient italic mb-3 sm:mb-4">
                    {STORY_CARDS[currentCard].title}
                  </h3>
                  <p className="text-champagne/60 font-sans text-xs sm:text-sm leading-relaxed">
                    {STORY_CARDS[currentCard].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {STORY_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > currentCard ? 1 : -1); setCurrentCard(idx); }}
              className={`transition-all duration-500 rounded-full interactive cursor-pointer ${idx === currentCard
                  ? "w-6 sm:w-8 h-2 bg-antique-gold"
                  : "w-2 h-2 bg-champagne/20 hover:bg-champagne/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

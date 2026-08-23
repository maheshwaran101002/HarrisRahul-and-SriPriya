"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  {
    src: "/assets/wedding/couple.jpeg",
    alt: "Harris Rahul & Sri Priya - Together",
    caption: "Together Forever",
  },
  {
    src: "/assets/wedding/IMG_0863.PNG",
    alt: "Wedding Portrait",
    caption: "Our Bond",
  },
  {
    src: "/assets/wedding/ring_photo_1.jpeg",
    alt: "Wedding Rings",
    caption: "The Promise",
  },
  {
    src: "/assets/wedding/FSP06952.jpg.jpeg",
    alt: "The Bride",
    caption: "The Beautiful Bride",
  },
  {
    src: "/assets/wedding/IMG_4773.JPG.jpeg",
    alt: "The Groom",
    caption: "The Handsome Groom",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 md:py-36 bg-void overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-temple-purple/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <p className="text-champagne/50 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[10px] sm:text-xs font-sans mb-4">
            Captured Moments
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ivory">
            Our <span className="text-gold-gradient italic">Gallery</span>
          </h2>
        </motion.div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-5xl mx-auto">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              onClick={() => setSelectedImage(idx)}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer interactive border border-champagne/10 hover:border-antique-gold/30 transition-all duration-500 ${
                idx === 0 ? "col-span-2 md:col-span-2 row-span-2 aspect-[4/5] md:aspect-[3/4]" :
                idx === 3 ? "col-span-1 aspect-[3/4]" :
                "col-span-1 aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes={idx === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                <p className="text-ivory font-serif text-sm sm:text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.caption}
                </p>
              </div>

              {/* Corner shine effect */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-antique-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-void/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="relative w-full max-w-3xl aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(197,160,89,0.15)]"
            >
              <Image
                src={GALLERY_ITEMS[selectedImage].src}
                alt={GALLERY_ITEMS[selectedImage].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
            
            {/* Caption */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 sm:bottom-12 text-center text-ivory font-serif text-lg sm:text-2xl tracking-wide"
            >
              {GALLERY_ITEMS[selectedImage].caption}
            </motion.p>

            {/* Close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 right-6 text-champagne/40 font-sans text-xs tracking-widest uppercase"
            >
              Tap to close ✕
            </motion.p>

            {/* Nav arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0);
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-champagne/20 flex items-center justify-center text-champagne/60 hover:text-ivory hover:border-champagne/60 transition-all interactive cursor-pointer"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(prev => prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0);
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-champagne/20 flex items-center justify-center text-champagne/60 hover:text-ivory hover:border-champagne/60 transition-all interactive cursor-pointer"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

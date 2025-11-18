"use client";

import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/personal1.jpeg" },
  { src: "/images/personal2.jpeg" },
  { src: "/images/personal3.jpeg" },
];

export default function PersonalShowcaseCanvas() {
  const [current, setCurrent] = useState(0);
  const [imageAspect, setImageAspect] = useState<"portrait" | "landscape">("landscape");

  useEffect(() => {
    const img = new window.Image();
    img.src = photos[current].src;
    img.onload = () => {
      setImageAspect(img.naturalWidth > img.naturalHeight ? "landscape" : "portrait");
    };
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 8000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <section className="relative flex flex-col items-center justify-center py-32 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Subtle textured background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1a1a1a_0%,#0a0a0a_70%,#000_100%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/textures/noise.png')] mix-blend-overlay" />

      {/* Title */}
      <div className="relative z-10 mb-14 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-100 tracking-tight">
          Photo Showcase
        </h2>
        <p className="text-gray-400 mt-2 text-base md:text-lg">
        </p>
      </div>

      {/* Canvas Frame */}
      <div
        className="
          relative w-[1100px] max-w-[95vw] h-[640px] md:h-[720px]
          rounded-[1.5rem] 
          border-[12px] border-[#1c1c1c]
          bg-[#121212]
          shadow-[0_25px_80px_rgba(0,0,0,0.8),0_4px_12px_rgba(255,255,255,0.05)_inset]
        "
        style={{
          boxShadow: `
            0 35px 90px rgba(0,0,0,0.75),
            inset 0 0 4px rgba(255,255,255,0.04),
            0 0 0 2px #2a2a2a inset
          `,
        }}
      >
        {/* Canvas photo area */}
        <div className="relative w-full h-full overflow-hidden bg-[#0c0c0c] rounded-[1rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.03)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={photos[current].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <NextImage
                src={photos[current].src}
                alt={`Photo ${current + 1}`}
                fill
                priority
                sizes="100vw"
                className={`select-none rounded-[0.8rem] transition-all duration-700 ease-out ${
                  imageAspect === "portrait"
                    ? "object-contain"
                    : "object-cover object-center"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Matte texture overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.02)_100%)] mix-blend-soft-light pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.06] bg-[url('/textures/canvas.png')] mix-blend-overlay" />
        </div>

        {/* Depth shadow below frame */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[85%] h-[60px] bg-black/40 blur-[50px] rounded-full" />

        {/* ✨ Gentle Reflection Glow (new) */}
        <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[80%] h-[120px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_80%)] opacity-20 blur-[60px] pointer-events-none" />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-[#1c1c1c]/70 hover:bg-[#2a2a2a]/90 border border-[#333] backdrop-blur-md transition-all duration-300 z-20"
        >
          <ChevronLeft size={26} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-[#1c1c1c]/70 hover:bg-[#2a2a2a]/90 border border-[#333] backdrop-blur-md transition-all duration-300 z-20"
        >
          <ChevronRight size={26} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 flex justify-center w-full space-x-2 z-10">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-[6px] w-[20px] rounded-full transition-all duration-500 ${
                i === current ? "bg-white/80" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

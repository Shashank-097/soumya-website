"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { memo, useState, useEffect } from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// === Typing Text ===
const TypingText = memo(() => (
  <div className="relative flex items-center justify-center md:justify-start h-[90px] md:h-[100px]">
    <span className="bg-linear-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent text-5xl md:text-7xl font-extrabold tracking-tight">
      <Typewriter
        words={[
          "Soumya Tiwari",
          "Research Scholar",
          "Political Risk Expert",
          "Geopolitical Risk Analyst",
          "International Business Expert",
        ]}
        loop
        cursor
        cursorStyle="_"
        typeSpeed={65}
        deleteSpeed={35}
        delaySpeed={1300}
      />
    </span>
  </div>
));
TypingText.displayName = "TypingText";

// === Social Icons ===
const SocialIcons = memo(() => {
  const base =
    "flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-gray-700/40 backdrop-blur-md text-gray-400 transition-transform duration-300 hover:scale-110";
  return (
    <div className="flex justify-center md:justify-start space-x-5 pt-6">
      <a
        href="https://www.linkedin.com/in/soumya-tiwari"
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:text-white`}
      >
        <FaLinkedin className="w-5 h-5" />
      </a>
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:text-green-400`}
      >
        <FaWhatsapp className="w-5 h-5" />
      </a>
      <a
        href="https://x.com/soumya-tiwari"
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} hover:text-gray-200`}
      >
        <FaXTwitter className="w-5 h-5" />
      </a>
    </div>
  );
});
SocialIcons.displayName = "SocialIcons";

// === Navbar ===
const Navbar = memo(({ solid }: { solid: boolean }) => (
  <nav
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      solid
        ? "backdrop-blur-md bg-white/5 border-b border-gray-700/30 shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
        : "bg-transparent"
    }`}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <h1 className="text-lg font-semibold tracking-wider text-gray-200">
        Soumya<span className="text-gray-400">Tiwari</span>
      </h1>

      <div className="flex space-x-8 text-sm font-medium text-gray-300">
        <Link href="#about" className="hover:text-white transition">
          About
        </Link>
        <Link href="#research" className="hover:text-white transition">
          Research
        </Link>
        <Link href="/blog" className="hover:text-white transition">
          Blogs
        </Link>
        <Link
          href="#contact"
          className="bg-white text-gray-900 px-4 py-1.5 rounded-full font-semibold shadow-sm hover:bg-gray-200 transition"
        >
          Contact
        </Link>
      </div>
    </div>
  </nav>
));
Navbar.displayName = "Navbar";

// === Hero ===
export default function Hero() {
  const [navSolid, setNavSolid] = useState(false);
  const reduceMotion = useReducedMotion();

  // ✅ Optimized scroll listener (no reflow spam)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setNavSolid(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar solid={navSolid} />

      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center min-h-screen overflow-hidden bg-[#1f1f1f] text-white px-6 md:px-16">
        {/* Background (static gradient only) */}
        <div className="absolute inset-0 bg-linear-to-br from-[#141414] via-[#1f1f1f] to-[#2a2a2a]" />
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-white/5 rounded-full blur-[100px] opacity-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gray-400/10 rounded-full blur-[90px] opacity-10" />

        {/* === Text Content === */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 md:w-1/2 space-y-8 md:pr-12 text-center md:text-left will-change-transform"
        >
          <TypingText />

          <div className="h-[3px] w-[90px] bg-linear-to-r from-gray-400 to-gray-200 rounded-full mx-auto md:mx-0" />

          <p className="text-gray-300 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
            Senior Research Scholar at FORE School of Management, New Delhi —
            specializing in international business, risk management, and
            emerging market geopolitics.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <a
              href="#work"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition"
            >
              Explore My Work
            </a>
            <a
              href="#about"
              className="inline-block bg-gray-700 text-gray-200 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-white hover:text-gray-900 transition"
            >
              About Me
            </a>
          </div>

          <SocialIcons />
        </motion.div>

        {/* === Portrait === */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 md:w-1/2 flex justify-center mb-10 md:mb-0 will-change-transform"
        >
          <div className="relative w-[320px] h-[420px] md:w-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-gray-700/40 bg-white/5 backdrop-blur-lg shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(200,200,200,0.3)] transition-all duration-500">
            <Image
              src="/images/soumya2.jpeg"
              alt="Soumya Tiwari"
              fill
              priority
              className="object-cover object-top select-none will-change-transform"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-10 text-gray-400 text-sm tracking-widest uppercase"
        >
          Scroll ↓
        </motion.div>
      </section>
    </>
  );
}
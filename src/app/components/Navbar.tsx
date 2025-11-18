"use client";

import Link from "next/link";
import { memo, useEffect, useState } from "react";

const Navbar = memo(() => {
  const [solid, setSolid] = useState(false);

  // Scroll listener for sticky effect
  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        solid
          ? "backdrop-blur-md bg-white/5 border-b border-gray-700/30 shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* === Left: Logo === */}
        <h1 className="text-lg font-semibold tracking-wider text-gray-200">
          Soumya<span className="text-gray-400">Tiwari</span>
        </h1>

        {/* === Center: Navigation Links === */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-sm font-medium text-gray-300">
        <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="#about" className="hover:text-white transition">
            About
          </Link>
          <Link href="#research" className="hover:text-white transition">
            Research
          </Link>
          <Link href="/blog" className="hover:text-white transition">
            Blogs
          </Link>
        </div>

        {/* === Right: CTA Button === */}
        <Link
          href="contact"
          className="bg-white text-gray-900 px-4 py-1.5 rounded-full font-semibold shadow-sm hover:bg-gray-200 transition"
        >
          Connect
        </Link>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;

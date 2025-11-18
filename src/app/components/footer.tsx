"use client";

import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { JSX } from "react";

export default function Footer(): JSX.Element {
  const lightGrey = "#d1d1d1";

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Research", href: "#research" },
    { name: "Publications", href: "#publications" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/soumya-tiwari",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      href: "https://x.com/soumya-tiwari",
      icon: <FaXTwitter className="w-5 h-5" />,
    },
    {
      href: "https://wa.me/919999999999",
      icon: <FaWhatsapp className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="relative bg-linear-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a] text-gray-300 py-16 px-8 md:px-20 border-t border-gray-700/40">
      {/* === Top Section === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* === About Column === */}
        <div>
          <h3 className="text-xl font-semibold text-[#d1d1d1] mb-4">
            Soumya Tiwari
          </h3>
          <p className="text-gray-400 leading-relaxed max-w-sm">
            Senior Research Scholar at FORE School of Management, exploring
            geopolitical risks, international strategy, and global policy
            frameworks shaping the modern economy.
          </p>
        </div>

        {/* === Quick Links === */}
        <div>
          <h3 className="text-xl font-semibold text-[#d1d1d1] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-[#d1d1d1] transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Contact / Socials === */}
        <div>
          <h3 className="text-xl font-semibold text-[#d1d1d1] mb-4">Connect</h3>
          <p className="text-gray-400 mb-4">
            Let’s collaborate on impactful global research and insights.
          </p>

          <div className="flex space-x-5 mt-3">
            {socialLinks.map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/60 border border-gray-600/40 text-gray-400 hover:text-[#d1d1d1] hover:shadow-[0_0_15px_rgba(209,209,209,0.3)] transition-all duration-300 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* === Divider Line === */}
      <div className="mt-14 border-t border-gray-700/40 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Soumya Tiwari. All rights reserved.
      </div>
    </footer>
  );
}

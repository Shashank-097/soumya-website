"use client";

import { Mail, Linkedin, MessageCircle } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contacts = [
    {
      title: "WhatsApp",
      subtitle: "Chat instantly on WhatsApp",
      icon: <MessageCircle size={34} />,
      link: "https://wa.me/919876543210",
    },
    {
      title: "Email",
      subtitle: "Send a quick email",
      icon: <Mail size={34} />,
      link: "mailto:client@example.com",
    },
    {
      title: "LinkedIn",
      subtitle: "Connect professionally",
      icon: <Linkedin size={34} />,
      link: "https://linkedin.com/in/username",
    },
    {
      title: "X (Twitter)",
      subtitle: "Follow or DM on X",
      icon: <FaXTwitter size={34} />,
      link: "https://x.com/username",
    },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">

      {/* ---- DARK GREY PREMIUM BACKGROUND ---- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] via-[#2a2a2a] to-[#1c1c1c]" />

      {/* Soft Dark Grey Aurora Highlights */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_40%_20%,#3a3a3a,transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_80%_90%,#252525,transparent_60%)] blur-3xl" />

      {/* Floating Particles (Subtle Grey) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 800,
              y: Math.random() * 800,
              opacity: 0.15,
              scale: Math.random() * 1.2,
            }}
            animate={{
              y: -100,
              opacity: 0,
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* ---- MAIN CARD ---- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-4xl p-10 rounded-3xl 
        bg-[#2d2d2d]/60 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.35)]"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-center text-white">
          Get in Touch
        </h1>
        <p className="text-center text-gray-300 mt-4 mb-12 text-lg max-w-xl mx-auto">
          Connect with me through any platform — fast, simple, and direct.
        </p>

        {/* Contact Grid */}
        <div className="grid sm:grid-cols-2 gap-8 mt-6">
          {contacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.12,
                type: "spring",
                stiffness: 120,
              }}
            >
              <Link
                href={item.link}
                target="_blank"
                className="group block p-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]
                hover:bg-white/10 transition-all duration-300 hover:scale-[1.04]"
              >
                <div className="flex items-center gap-5">
                  <div className="text-gray-200 group-hover:text-white transition-transform group-hover:rotate-12">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

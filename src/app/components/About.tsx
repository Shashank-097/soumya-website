"use client";

import { motion, useReducedMotion, easeOut } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { memo, useEffect, useState } from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const reduceMotion = useReducedMotion();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/soumya-tiwari",
      icon: <FaLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      color:
        "hover:text-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.3)] hover:border-[#0077b5]",
    },
    {
      href: "https://x.com/soumya-tiwari",
      icon: <FaXTwitter className="w-5 h-5" />,
      label: "Twitter / X",
      color:
        "hover:text-gray-200 hover:shadow-[0_0_15px_rgba(200,200,200,0.3)] hover:border-gray-500",
    },
    {
      href: "https://wa.me/919999999999",
      icon: <FaWhatsapp className="w-5 h-5" />,
      label: "WhatsApp",
      color:
        "hover:text-green-400 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:border-green-500",
    },
  ];

  const motionProps = {
    initial: hasLoaded ? (reduceMotion ? {} : { opacity: 0, y: 40 }) : false,
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, ease: easeOut },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-[#1b1b1b] text-gray-100 px-6 py-24"
    >
      {/* === Background === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a]" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[160px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gray-400/10 rounded-full blur-[200px] opacity-10" />

      {/* === About Card (Frosted Metallic Style) === */}
      <motion.div
        {...motionProps}
        className="
          relative z-10 w-full max-w-5xl 
          bg-[#d1d1d1]/20 text-gray-100 rounded-3xl
          p-10 md:p-16
          backdrop-blur-xl border border-gray-600/30
          shadow-[inset_0_0_20px_rgba(255,255,255,0.05),_0_10px_40px_rgba(0,0,0,0.6)]
          transition-all duration-500 hover:scale-[1.01]
        "
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* === Text Section === */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#f1f1f1] tracking-tight">
                𝑨𝒃𝒐𝒖𝒕 𝒎𝒆 . . .
              </h2>
              <div className="mt-2 h-[3px] w-[100px] bg-[#2e3b4e]/60 rounded-full mx-auto md:mx-0" />
            </div>

            <blockquote className="text-lg italic text-gray-300 border-l-4 border-gray-400/60 pl-4">
              “Understanding risk isn’t about predicting the future — it’s about
              preparing intelligently for it.”
            </blockquote>

            <p className="text-lg leading-relaxed text-gray-200 max-w-xl mx-auto md:mx-0">
              I’m <strong>Soumya Tiwari</strong>, a Senior Research Scholar at{" "}
              <span className="font-semibold text-white">
                FORE School of Management, New Delhi
              </span>
              . My academic journey explores how{" "}
              <em>geopolitical risks</em> and <em>policy dynamics</em> shape
              decision-making in international business.
            </p>

            <p className="text-lg leading-relaxed text-gray-200 max-w-xl mx-auto md:mx-0">
              I bridge{" "}
              <span className="font-semibold text-white">
                academia, strategy, and policy
              </span>{" "}
              — creating insights that empower organizations to adapt to global
              uncertainty with confidence.
            </p>
          </div>

          {/* === Info Cards (Navy Frosted Style with Hover) === */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md md:max-w-lg place-items-center">
            {[
              { title: "Research Focus", text: "Geopolitics & Risk Strategy" },
              { title: "Affiliation", text: "FORE School of Management" },
              { title: "Location", text: "New Delhi, India" },
              { title: "Experience", text: "5+ Years in Research" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={hasLoaded ? (reduceMotion ? {} : { opacity: 0, y: 20 }) : false}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
                className="
                  relative w-full p-6 rounded-2xl 
                  bg-[#2e3b4e]/95 backdrop-blur-sm
                  border border-gray-600/50 
                  text-gray-100
                  shadow-[0_8px_25px_rgba(0,0,0,0.5)]
                  transition-all duration-500 
                  hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(46,59,78,0.6)]
                "
              >
                <h4 className="font-semibold text-gray-100 text-lg">
                  {item.title}
                </h4>
                <p className="text-gray-300 text-sm mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* === Social Icons === */}
        <motion.div
          initial={hasLoaded ? (reduceMotion ? {} : { opacity: 0, y: 20 }) : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
          className="relative mt-14 flex space-x-6 justify-center"
        >
          {socialLinks.map(({ href, icon, color, label }, i) => (
            <a
              key={i}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-11 h-11 rounded-full bg-gray-700/70 border border-gray-600/40 backdrop-blur-md text-gray-300 ${color} transition-all duration-300 hover:scale-110`}
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(About);

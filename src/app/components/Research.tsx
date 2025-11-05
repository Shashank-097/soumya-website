"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBookOpen,
  FaGlobeAsia,
  FaBalanceScale,
  FaChartLine,
} from "react-icons/fa";

export default function Research() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const LIGHT_GREY = "#d1d1d1";

  const researchData = [
    {
      icon: <FaBalanceScale className="text-[#d1d1d1] w-7 h-7" />,
      title: "Corporate Political Activities in Uncertain Environments",
      field: "International Business & Political Economy",
      journal: "Strategic Management Review (2024)",
      desc: "Examines how firms strategically engage with political institutions to mitigate risks and shape regulatory outcomes in volatile markets.",
    },
    {
      icon: <FaGlobeAsia className="text-[#d1d1d1] w-7 h-7" />,
      title: "Geopolitical Risk and Multinational Strategy",
      field: "Geoeconomics & Global Strategy",
      journal: "Journal of International Business Studies (2023)",
      desc: "Analyzes how geopolitical tensions influence MNE decision-making, regional restructuring, and cross-border investment resilience.",
    },
    {
      icon: <FaChartLine className="text-[#d1d1d1] w-7 h-7" />,
      title: "Emerging Market Multinationals and Global Integration",
      field: "Emerging Market Strategy",
      journal: "Global Business Perspectives (2023)",
      desc: "Explores how emerging market MNEs expand globally under institutional voids and adapt to political and policy uncertainties.",
    },
    {
      icon: <FaBookOpen className="text-[#d1d1d1] w-7 h-7" />,
      title: "Reconceptualizing Political Risk in Global Business",
      field: "Political Risk Management",
      journal: "International Affairs & Business Review (2022)",
      desc: "Develops an integrated framework for understanding how political risk evolves in an era of multipolar geopolitics and economic nationalism.",
    },
  ];

  return (
    <section
      id="research"
      ref={ref}
      className="relative min-h-screen bg-linear-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a] py-28 px-6 md:px-16 text-gray-100 overflow-hidden"
    >
      {/* === Background Glow === */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#d1d1d1]/10 blur-[180px] rounded-full opacity-20" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[220px] rounded-full opacity-10" />

      {/* === Section Header === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#d1d1d1]">
          Research Highlights
        </h2>
        <div className="mt-3 h-[3px] w-[100px] bg-[#d1d1d1]/70 mx-auto rounded-full" />
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          My research explores how political and geopolitical dynamics shape
          firm behavior, global strategy, and risk management — with a special
          focus on corporate political activities and emerging market MNEs.
        </p>
      </motion.div>

      {/* === Research Cards === */}
      <div className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto relative z-10">
        {researchData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            style={{
              willChange: "transform, opacity",
              WebkitTransform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              isolation: "isolate",
            }}
            className="
              relative w-full p-8 rounded-2xl 
              bg-[#d1d1d1]/10 backdrop-blur-md
              border border-gray-600/40
              shadow-[inset_0_0_15px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.6)]
              text-gray-100
              transition-all duration-500 
              hover:scale-[1.02] 
              hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]
            "
          >
            {/* Icon + Title */}
            <div className="flex items-center space-x-4 mb-5">
              <div className="p-3 rounded-full bg-[#2e3b4e]/60 backdrop-blur-md border border-[#d1d1d1]/30">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#f5f5f5]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">{item.field}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-3">{item.desc}</p>

            {/* Journal */}
            <p className="text-sm text-gray-500 italic">{item.journal}</p>
          </motion.div>
        ))}
      </div>

      {/* === CTA Button === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          willChange: "transform, opacity",
          WebkitTransform: "translateZ(0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="text-center mt-20 relative z-10"
      >
        <a
          href="#contact"
          className="inline-block bg-[#d1d1d1] text-gray-900 px-10 py-3 rounded-full font-bold shadow-lg 
          hover:bg-[#e2e2e2] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
        >
          View Full Research Portfolio
        </a>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function BlogCategories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const categories = [
    {
      id: "1",
      title: "Category 1",
      description: "Explore insights and articles related to Category 1.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "2",
      title: "Category 2",
      description: "Thought-provoking perspectives under Category 2.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "3",
      title: "Category 3",
      description: "Deep dives and strategic insights in Category 3.",
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "4",
      title: "Category 4",
      description: "Latest articles and trends from Category 4.",
      image:
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-linear-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a] py-28 px-6 md:px-16 text-gray-100"
    >
      {/* === Header === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100">
          Blog Categories
        </h2>
        <div className="mt-3 h-[3px] w-[100px] bg-gray-400 mx-auto rounded-full" />
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Select a category to explore articles curated for you.
        </p>
      </motion.div>

      {/* === Category Cards Grid === */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <Link key={i} href={`/blog/category/${cat.id}`} className="group">
            <motion.article
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="relative bg-gray-200/90 text-gray-900 rounded-2xl shadow-lg 
                         border border-gray-300 backdrop-blur-sm overflow-hidden 
                         transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-gray-900">
                  {cat.title}
                </h3>
                <p className="text-gray-700 mb-4">{cat.description}</p>
                <span className="inline-block text-sm font-medium text-gray-700 bg-gray-300/70 px-3 py-1 rounded-full">
                  View Posts →
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}

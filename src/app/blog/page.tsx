"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  image: string;
}

export default function Blog() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const posts: BlogPost[] = [
    {
      slug: "decoding-geopolitical-risks-in-2025",
      title: "Decoding Geopolitical Risks in 2025",
      date: "October 15, 2025",
      excerpt:
        "How global uncertainty continues to reshape international business strategy and investment decisions.",
      tag: "Global Strategy",
      image:
        "https://images.unsplash.com/photo-1581091870634-2b6b6f1c84b0?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "the-new-age-of-corporate-diplomacy",
      title: "The New Age of Corporate Diplomacy",
      date: "September 12, 2025",
      excerpt:
        "Exploring how corporations adapt their global operations amidst rising political and economic tensions.",
      tag: "Corporate Strategy",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "emerging-markets-between-promise-and-pressure",
      title: "Emerging Markets: Between Promise and Pressure",
      date: "August 22, 2025",
      excerpt:
        "A closer look at how emerging economies navigate policy changes and capital flows in volatile times.",
      tag: "Economics",
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a] py-28 px-6 md:px-16 text-gray-100"
    >
      {/* === Header === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100">
          Insights & Perspectives
        </h2>
        <div className="mt-3 h-[3px] w-[100px] bg-gray-400 mx-auto rounded-full" />
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          A collection of my latest thoughts and analyses on global business,
          risk strategy, and international policy.
        </p>
      </motion.div>

      {/* === Blog Cards Grid === */}
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {posts.map((post, i) => (
          <Link key={i} href={`/blog/${post.slug}`} className="group">
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
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <span className="inline-block text-sm font-medium text-gray-700 bg-gray-300/70 px-3 py-1 rounded-full">
                  {post.tag}
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      {/* === CTA === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center mt-20"
      >
        <a
          href="#contact"
          className="inline-block bg-gray-300 text-gray-900 px-10 py-3 rounded-full font-bold shadow-lg hover:bg-gray-200 hover:shadow-xl transition"
        >
          Read More Articles
        </a>
      </motion.div>
    </section>
  );
}

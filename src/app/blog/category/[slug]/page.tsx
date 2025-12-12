"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

// Dummy posts WITH categories (same as slug page)
const blogPosts = [
  {
    slug: "decoding-geopolitical-risks-in-2025",
    title: "Decoding Geopolitical Risks in 2025",
    date: "October 15, 2025",
    excerpt:
      "How global uncertainty continues to reshape international business strategy and investment decisions.",
    tag: "Global Strategy",
    image:
      "https://images.unsplash.com/photo-1581091870634-2b6b6f1c84b0?auto=format&fit=crop&w=800&q=80",
    category: "1",
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
    category: "2",
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
    category: "3",
  },
];

export default function CategoryPage() {
  const { slug } = useParams(); // category id: "1" | "2" | "3" | "4"

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Filter posts by category
  const filteredPosts = blogPosts.filter((p) => p.category === slug);

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
        <Link
          href="/blog"
          className="text-gray-400 hover:text-gray-200 text-sm mb-6 inline-block"
        >
          ← Back to Categories
        </Link>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100">
          Category {slug}
        </h2>
        <div className="mt-3 h-[3px] w-[100px] bg-gray-400 mx-auto rounded-full" />
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Articles curated under Category {slug}.
        </p>
      </motion.div>

      {/* === Posts Grid === */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {filteredPosts.map((post, i) => (
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
      ) : (
        <p className="text-center text-gray-400 text-lg mt-24">
          No articles found in this category yet.
        </p>
      )}
    </section>
  );
}

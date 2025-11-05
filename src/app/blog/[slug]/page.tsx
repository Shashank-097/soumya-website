"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

// Dummy blog data (same structure as main blog)
const blogPosts = [
  {
    slug: "decoding-geopolitical-risks-in-2025",
    title: "Decoding Geopolitical Risks in 2025",
    date: "October 15, 2025",
    image:
      "https://images.unsplash.com/photo-1581091870634-2b6b6f1c84b0?auto=format&fit=crop&w=1200&q=80",
    content: `
      The year 2025 has brought new challenges to global markets. Geopolitical risk continues
      to dominate international decision-making as nations grapple with shifting alliances,
      economic sanctions, and resource scarcity.

      In this article, we explore how businesses can mitigate these risks through strategic
      foresight and adaptive planning frameworks.

      Companies that understand policy signals early are better positioned to pivot, protect
      capital, and sustain growth amid uncertainty.
    `,
    tag: "Global Strategy",
  },
  {
    slug: "the-new-age-of-corporate-diplomacy",
    title: "The New Age of Corporate Diplomacy",
    date: "September 12, 2025",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    content: `
      Corporate diplomacy is no longer optional. In an era of global interdependence, every
      multinational enterprise must navigate both boardrooms and diplomatic tables.

      From climate negotiations to digital regulation, corporations are influencing — and
      being influenced by — political shifts in unprecedented ways.
    `,
    tag: "Corporate Strategy",
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1b1b1b] text-gray-300">
        <p>Blog post not found.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-br from-[#151515] via-[#1b1b1b] to-[#2a2a2a] text-gray-100 py-20 px-6 md:px-16">
      {/* === Back Button === */}
      <div className="max-w-5xl mx-auto mb-10">
        <Link
          href="/blog"
          className="text-gray-400 hover:text-gray-200 transition text-sm"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* === Blog Content === */}
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-gray-200/90 text-gray-900 rounded-2xl shadow-lg 
                   border border-gray-300 backdrop-blur-sm overflow-hidden"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-10">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-600 mb-6">{post.date}</p>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content.trim()}
          </p>

          <span className="inline-block mt-8 text-sm font-medium text-gray-700 bg-gray-300/70 px-4 py-1 rounded-full">
            {post.tag}
          </span>
        </div>
      </motion.article>
    </section>
  );
}

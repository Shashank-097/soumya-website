"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ADMIN_PASSWORD = "12341234";
const MAX_WORDS_PREVIEW = 100;

type Media = { images: string[]; videos: string[] };
type Post = {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  media: Media;
};

function truncateWords(text: string, maxWords: number) {
  const words = text.split(/\s+/);
  return words.length <= maxWords
    ? text
    : words.slice(0, maxWords).join(" ") + "...";
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"new" | "saved">("new");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<Media>({ images: [], videos: [] });
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [expandedPostIdx, setExpandedPostIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  useEffect(() => {
    const postsStr = localStorage.getItem("blog-posts");
    if (postsStr) {
      try {
        const parsed: Post[] = JSON.parse(postsStr);
        setSavedPosts(parsed);
      } catch (err) {
        console.error("Error parsing saved posts:", err);
      }
    }
  }, []);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((results) =>
      setMedia((m) => ({ ...m, images: [...m.images, ...results] }))
    );
  };

  const saveBlog = () => {
    if (editingIdx !== null) {
      const updatedPosts = [...savedPosts];
      updatedPosts[editingIdx] = {
        title,
        content,
        author,
        date: date || new Date().toISOString(),
        category,
        media,
      };
      setSavedPosts(updatedPosts);
      localStorage.setItem("blog-posts", JSON.stringify(updatedPosts));
      alert("Post updated successfully!");
      setEditingIdx(null);
    } else {
      const posts = [
        ...savedPosts,
        {
          title,
          content,
          author,
          date: date || new Date().toISOString(),
          category,
          media,
        },
      ];
      setSavedPosts(posts);
      localStorage.setItem("blog-posts", JSON.stringify(posts));
      alert("Post saved successfully!");
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setAuthorized(true);
    else alert("Wrong password!");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !author || !category)
      return alert("Please fill all fields!");
    saveBlog();
    setTitle("");
    setContent("");
    setAuthor("");
    setDate("");
    setCategory("");
    setMedia({ images: [], videos: [] });
  };

  const handleDelete = (idx: number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const posts = [...savedPosts];
      posts.splice(idx, 1);
      setSavedPosts(posts);
      localStorage.setItem("blog-posts", JSON.stringify(posts));
      alert("Post deleted successfully!");
    }
  };

  const handleEdit = (idx: number) => {
    const post = savedPosts[idx];
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setDate(post.date);
    setCategory(post.category);
    setMedia(post.media || { images: [], videos: [] });
    setEditingIdx(idx);
    setActiveTab("new");
  };

  const getContentToShow = (content: string, idx: number) =>
    expandedPostIdx === idx
      ? content
      : truncateWords(content, MAX_WORDS_PREVIEW);

  const toggleExpand = (idx: number) =>
    setExpandedPostIdx((prev) => (prev === idx ? null : idx));

  // 🔒 Login
  if (!authorized)
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8f8f8] text-gray-800">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition">
            Login
          </button>
        </form>
      </main>
    );

  // 🧩 Main Admin Layout (Light Mode)
  return (
    <div className="min-h-screen flex bg-[#f5f5f5] text-gray-800">
      <aside className="w-64 bg-white p-6 flex flex-col border-r border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {(["new", "saved"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left w-full p-3 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {tab === "new" ? "New Post" : "Saved Posts"}
              </button>
            );
          })}
        </nav>
        <button
          className="mt-auto p-3 rounded-lg text-left font-medium w-full text-gray-500 hover:text-red-500 transition"
          onClick={() => setAuthorized(false)}
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "new" ? (
            <motion.div
              key="new"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-gray-900">
                {editingIdx !== null ? "Edit Blog" : "Create New Blog"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 rounded-2xl shadow-md border border-gray-200"
              >
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                >
                  <option value="" disabled>
                    Choose Category
                  </option>
                  {[
                    "SEO",
                    "Content Marketing",
                    "Social Media",
                    "Branding",
                    "Development",
                    "Design",
                  ].map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>

                <textarea
                  placeholder="Write your blog content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition resize-none"
                />

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Images
                  </label>
                  <div
                    className="flex flex-wrap gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition"
                    onClick={() =>
                      document.getElementById("image-input")?.click()
                    }
                  >
                    {media.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-200"
                      >
                        <Image
                          src={img}
                          alt={`Image ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="flex items-center justify-center w-28 h-28 bg-gray-100 text-gray-500 rounded-lg">
                      + Add
                    </div>
                  </div>
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImagesChange}
                  />
                </div>

                <button className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition">
                  {editingIdx !== null ? "Update Blog" : "Save Blog"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">
                Saved Posts
              </h2>
              {savedPosts.length === 0 ? (
                <p className="text-gray-500 mt-6">No blogs yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedPosts.map((post, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
                    >
                      <h3 className="text-xl font-semibold mb-1 text-gray-900">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        By {post.author} • {post.category}
                      </p>
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {getContentToShow(post.content, idx)}
                      </p>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="text-red-500 hover:text-red-600 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

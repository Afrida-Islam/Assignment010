import React, { useState, useMemo } from "react";
// 1. Correctly import motion and AnimatePresence from framer-motion
import { motion, AnimatePresence } from "framer-motion";

// 2. Correctly import icons only from lucide-react
import {
  Calendar,
  User,
  ArrowRight,
  Search,
  Tag,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    category: "Career",
    title: "How to Build a High-Performance Portfolio in 2026",
    excerpt:
      "Learn the secrets to standing out in a crowded job market with projects that matter. We dive deep into case studies that actually get you hired.",
    author: "Jane Smith",
    date: "Dec 28, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
    featured: true,
  },
  {
    id: 2,
    category: "Technology",
    title: "The Future of AI in Professional Learning",
    excerpt:
      "How SkillSet is integrating AI to personalize your learning path and accelerate growth.",
    author: "Dr. Alan Turing",
    date: "Jan 01, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
    featured: false,
  },
  {
    id: 3,
    category: "Design",
    title: "Minimalism vs. Maximalism in Web UI",
    excerpt:
      "Finding the sweet spot in modern interface design for better user conversion.",
    author: "Marco Rossi",
    date: "Jan 02, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
    featured: false,
  },
  {
    id: 4,
    category: "Productivity",
    title: "Deep Work Strategies for Developers",
    excerpt:
      "How to maintain flow state in an era of constant Slack notifications and meetings.",
    author: "Sarah Chen",
    date: "Jan 05, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&q=80&w=600",
    featured: false,
  },
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Career", "Technology", "Design", "Productivity"];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#f8fafc] dark:bg-gray-950 min-h-screen font-sans selection:bg-orange-100 selection:text-orange-600">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-orange-600 font-bold mb-4"
          >
            <Sparkles size={20} />
            <span className="uppercase tracking-[0.3em] text-sm">
              The SkillSet Journal
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter"
          >
            Stay{" "}
            <span className="text-orange-500 italic underline decoration-gray-200 underline-offset-8">
              Ahead
            </span>
            .
          </motion.h1>

          <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-end">
            <div className="relative group">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors"
                size={24}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword, or author..."
                className="w-full pl-16 pr-8 py-6 bg-white dark:bg-gray-900 border-none rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none focus:ring-2 focus:ring-orange-500 transition-all text-lg outline-none"
              />
            </div>

            <div className="hidden lg:flex bg-orange-600 rounded-[2rem] p-6 text-white items-center gap-4 shadow-xl shadow-orange-500/20 group cursor-pointer hover:bg-orange-700 transition-colors">
              <div className="bg-white/20 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
                <Send size={24} />
              </div>
              <div>
                <p className="font-bold leading-tight">Join 12k Readers</p>
                <p className="text-orange-100 text-xs">
                  Weekly insights to your inbox
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gray-900 dark:bg-orange-600 text-white scale-105 shadow-lg"
                  : "bg-white dark:bg-gray-900 text-gray-500 hover:text-orange-500 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div className="space-y-12">
            <motion.div layout className="grid md:grid-cols-1 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`group relative grid md:grid-cols-[400px_1fr] gap-8 bg-white dark:bg-gray-900 p-6 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800 ${
                      post.featured && activeCategory === "All"
                        ? "ring-2 ring-orange-500 ring-offset-4 dark:ring-offset-gray-950"
                        : ""
                    }`}
                  >
                    <div className="relative h-64 md:h-full overflow-hidden rounded-[2.5rem]">
                      <img
                        src={post.img}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt=""
                      />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <span className="px-4 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center py-4">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} /> {post.date}
                        </span>
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} /> {post.readTime}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                            {post.author[0]}
                          </div>
                          <span className="text-sm font-bold dark:text-gray-300">
                            {post.author}
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-orange-600 font-black text-sm uppercase tracking-tighter"
                        >
                          Read Post <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem]"
              >
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">
                  No articles found matching your criteria.
                </h3>
              </motion.div>
            )}
          </div>

          <aside className="space-y-8 h-fit sticky top-24">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800">
              <h4 className="text-xl font-black mb-6 flex items-center gap-2 dark:text-white">
                Trending <span className="text-orange-500">Topics</span>
              </h4>
              <div className="space-y-6">
                {blogPosts.slice(0, 3).map((p) => (
                  <div key={p.id} className="group cursor-pointer">
                    <p className="text-xs font-bold text-orange-500 uppercase mb-1">
                      {p.category}
                    </p>
                    <h5 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 transition-colors leading-snug">
                      {p.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-[3rem] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-2xl font-black mb-4">
                  Master Your <span className="text-orange-500">Craft</span>
                </h4>
                <p className="text-gray-400 text-sm mb-6">
                  Get a weekly dose of career-defining insights, directly from
                  industry leaders.
                </p>
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full px-6 py-4 bg-white/10 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
                />
                <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all">
                  Subscribe Now
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-600/20 blur-3xl rounded-full" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;

import React from "react";
import { motion } from "framer-motion";
import bannerIMG from "../assets/bannerIMG.jpeg";
import { Search, Play, BookOpen, Star, Users } from "lucide-react";

const LearningHero = () => {
  return (
    // Background dynamic classes added: dark:bg-slate-950
    <div className="relative min-h-screen bg-[#FDF6E3] dark:bg-slate-950 overflow-hidden px-6 lg:px-20 flex items-center transition-colors duration-500">
      {/* Background Decorative Elements - Opacity adjusted for dark mode */}
      <div className="absolute top-20 right-[45%] w-6 h-6 border-2 border-orange-400 rounded-full opacity-30 dark:opacity-10 animate-pulse" />
      <div className="absolute top-1/2 left-5 w-4 h-4 bg-blue-400 rounded-full opacity-20 dark:opacity-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-4 mt-4">
            <div className="w-8 h-[2px] bg-orange-500" />
            <span className="text-orange-600 dark:text-orange-400 font-bold uppercase tracking-[0.2em] text-xs">
              Future of Learning
            </span>
          </div>

          {/* Title Color dynamic: dark:text-white */}
          <h1 className="text-3xl lg:text-7xl font-extrabold text-[#1A2B49] dark:text-white leading-tight mb-6">
            Find The Best Online <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400">
              Course for Skills!
            </span>
          </h1>

          {/* Paragraph Color dynamic: dark:text-slate-400 */}
          <p className="text-gray-500 dark:text-slate-400 text-lg max-w-md mb-10 leading-relaxed">
            Access over 5,000+ top-rated courses from industry leaders. Flexible
            learning designed to help you land your dream career.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-[#1A2B49] dark:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-900 dark:hover:bg-orange-700 transition-all shadow-xl hover:shadow-2xl flex items-center gap-2">
              <BookOpen size={20} />
              Explore Courses
            </button>
            <button className="flex items-center gap-3 text-[#1A2B49] dark:text-slate-200 font-bold group">
              <span className="p-3 border-2 border-gray-300 dark:border-slate-700 rounded-full group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:border-blue-500 transition-all shadow-sm">
                <Play
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                />
              </span>
              Watch Intro
            </button>
          </div>

          {/* Quick Stats - Border color dynamic */}
          <div className="mt-12 mb-8 flex items-center gap-8 border-t border-gray-200 dark:border-slate-800 pt-8">
            <div>
              <p className="text-2xl font-bold text-[#1A2B49] dark:text-white">
                12k+
              </p>
              <p className="text-sm text-gray-400 dark:text-slate-500">
                Active Students
              </p>
            </div>
            <div className="w-[1px] h-10 bg-gray-200 dark:bg-slate-800" />
            <div>
              <p className="text-2xl font-bold text-[#1A2B49] dark:text-white">
                4.9/5
              </p>
              <div className="flex text-yellow-500">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Visuals */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main Organic Image Container */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] z-10"
            >
              <div
                className="w-full h-full overflow-hidden shadow-2xl border-[12px] border-white dark:border-slate-800 bg-gradient-to-br from-[#EF6B35] to-orange-300"
                style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              >
                <img
                  src={bannerIMG}
                  alt="Students learning"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 transform-gpu"
                />
              </div>

              {/* Floating Card 1 - Search (Dark mode optimized) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-4 lg:-right-8 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/50 dark:border-slate-700 backdrop-blur-md min-w-[220px] lg:min-w-[260px] z-30"
              >
                <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
                  <Search size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Search Course
                  </p>
                  <p className="text-xs lg:text-sm font-semibold text-[#1A2B49] dark:text-white">
                    UI/UX Design Masterclass
                  </p>
                </div>
              </motion.div>

              {/* Floating Card 2 - Community (Dark mode optimized) */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-0 -left-10 lg:-left-24 bg-white dark:bg-slate-900 p-4 lg:p-5 rounded-2xl shadow-2xl border border-gray-50 dark:border-slate-800 w-64 lg:w-72 z-30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A2B49] dark:text-white text-sm leading-tight">
                      Join the Community
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-slate-500">
                      Over 500+ daily signups
                    </p>
                  </div>
                </div>

                <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?u=${i + 10}`}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover shadow-sm"
                      alt="user"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                    +2k
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                    Live Now
                  </span>
                  <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center font-black text-[10px] italic shadow-inner">
                    P+
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Dotted Pattern - Color dynamic */}
            <div
              className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 dark:opacity-5 pointer-events-none z-0"
              style={{
                backgroundImage:
                  "radial-gradient(#1A2B49 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LearningHero;

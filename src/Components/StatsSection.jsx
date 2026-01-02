import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    {
      id: 1,
      number: 1200,
      suffix: "+",
      label: "Global Students Enrolled",
      subLabel: "Growing community of learners worldwide.",
    },
    {
      id: 2,
      number: 59,
      suffix: "",
      label: "Expert Mentors",
      subLabel: "Industry professionals from top companies.",
    },
    {
      id: 3,
      number: 32,
      suffix: "+",
      label: "Premium Courses",
      subLabel: "Highly curated content for excellence.",
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-white dark:bg-gray-950 py-20 px-6 transition-all duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Insights & Statistics
            </h2>
            {/* Orange Underline */}
            <div className="h-1.5 w-24 bg-[#FF782D] mx-auto mb-6 rounded-full"></div>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We provide the tools and excellence needed to master new skills.
              Join thousands of successful students and accelerate your career.
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all text-center group"
            >
              {/* Icon Box with Orange Background Fade */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF782D]/10 text-[#FF782D] rounded-full mb-6 group-hover:scale-110 group-hover:bg-[#FF782D] group-hover:text-white transition-all duration-300">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>

              <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                {inView ? <CountUp end={item.number} duration={2.5} /> : "0"}
                {item.suffix}
              </h3>

              <h4 className="text-lg font-bold text-[#FF782D] uppercase tracking-wider mb-2">
                {item.label}
              </h4>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {item.subLabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative Map Element - Greyish Orange Tint */}
        <div className="mt-20 opacity-20 dark:opacity-10 flex justify-center">
          <img
            src="https://i.ibb.co/VqnY8p0/world-map-network.png"
            alt="Global Network"
            className="max-w-4xl w-full filter grayscale hover:grayscale-0 transition-all duration-700 dark:invert"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

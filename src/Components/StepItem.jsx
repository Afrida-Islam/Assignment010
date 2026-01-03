import React from "react";
import { motion } from "framer-motion";

const PlayIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-play"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const StepItem = ({ number, title, description }) => (
  <div className="flex items-start space-x-4 p-4 transition-colors duration-300">
    <div className="relative flex-shrink-0">
      {/* Circle Background: dark:bg-orange-900/30 */}
      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-lg font-bold text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-800 shadow-md">
        {number}
      </div>

      <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 dark:border-slate-700 animate-pulse opacity-50"></div>
    </div>

    <div>
      {/* Title: dark:text-slate-100 */}
      <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-1">
        {title}
      </h3>
      {/* Description: dark:text-slate-400 */}
      <p className="text-gray-500 dark:text-slate-400 text-sm">{description}</p>
    </div>
  </div>
);

const stepsData = [
  {
    number: 1,
    title: "Search for your course",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 2,
    title: "Enroll with ease",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 3,
    title: "Start learning",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
  {
    number: 4,
    title: "Get certified",
    description: "Discouraged and irrelevant life Youyou. sneek peek",
  },
];

const HowItWorks = () => {
  return (
    // Main Wrapper: dark:bg-slate-950
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-8 transition-colors duration-500">
      {/* Card Container: dark:bg-slate-900 */}
      <div className="max-w-6xl w-full bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl rounded-2xl overflow-hidden border dark:border-slate-800">
        <div className="md:grid md:grid-cols-2 md:divide-x divide-gray-100 dark:divide-slate-800">
          {/* Left Side: Video/Image Section */}
          <div className="relative flex items-center justify-center min-h-[300px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
              alt="Online Learning"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <button
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center shadow-2xl transition duration-300 hover:bg-white dark:hover:bg-slate-800 text-orange-600 dark:text-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300/50"
              aria-label="Play video"
              onClick={() => console.log("Video played!")}
            >
              <PlayIcon className="w-8 h-8 ml-1" />
            </button>

            <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          </div>

          {/* Right Side: Steps Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="p-8 sm:p-12">
              {/* Heading: dark:text-white */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                How It Works?
              </h2>
              {/* Text: dark:text-slate-400 */}
              <p className="text-gray-600 dark:text-slate-400 mb-8 sm:mb-10 text-base">
                Discouraged and irrelevant life attitudes. You're you. sneak
                peek into what has in store.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-4">
                {stepsData.map((step) => (
                  <StepItem
                    key={step.number}
                    number={step.number}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

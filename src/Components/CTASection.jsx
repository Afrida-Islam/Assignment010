import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // npm install lucide-react

const slides = [
  {
    id: 1,
    title: "Ready to transform your",
    highlight: "Learning Journey?",
    description:
      "Join over 1,200+ students already learning on Astrax. Get unlimited access to all premium courses.",
    btnText: "Explore Courses",
    link: "/all-courses",
  },
  {
    id: 2,
    title: "Become an Industry",
    highlight: "Expert Mentor",
    description:
      "Share your knowledge with the world and inspire the next generation of leaders.",
    btnText: "Join as Teacher",
    link: "/contact",
  },
];

const CTASection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto Play Logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FF782D] via-[#ef5e0a] to-[#d34e00] px-8 py-20 md:px-20 shadow-2xl">
          {/* Background Animated Shapes */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"
          />

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6">
                {slides[current].title} <br />
                <span className="text-orange-200">
                  {slides[current].highlight}
                </span>
              </h2>

              <p className="max-w-2xl text-orange-50 text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                {slides[current].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={slides[current].link}
                    className="px-10 py-4 bg-white text-[#FF782D] font-extrabold rounded-full shadow-xl hover:bg-orange-50 transition-all"
                  >
                    {slides[current].btnText}
                  </Link>
                </motion.div>

                <Link
                  to="/contact"
                  className="px-10 py-4 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Manual Controls (Buttons) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hidden md:block"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`h-2 transition-all rounded-full ${
                  index === current ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
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
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Container matched to your site's orange brand color */}
        <div className="relative overflow-hidden rounded-3xl bg-[#FF782D] px-8 py-16 md:px-20 md:py-24 shadow-xl">
          {/* Subtle pattern overlay to match your professional look */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {slides[current].title} <br />
                <span className="text-white underline decoration-white/30 underline-offset-8">
                  {slides[current].highlight}
                </span>
              </h2>

              <p className="max-w-2xl text-white/90 text-lg md:text-xl mb-10 leading-relaxed font-medium">
                {slides[current].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={slides[current].link}
                  className="group flex items-center justify-center gap-2 px-10 py-4 bg-white text-[#FF782D] font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  {slides[current].btnText}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/contact"
                  className="px-10 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Match your UI's clean style */}
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto p-2 rounded-full bg-black/10 text-white hover:bg-black/20 transition-all hidden lg:block"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto p-2 rounded-full bg-black/10 text-white hover:bg-black/20 transition-all hidden lg:block"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Indicators - Matched to your screenshot's pill style */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-10 h-2 bg-white"
                    : "w-2 h-2 bg-white/40"
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

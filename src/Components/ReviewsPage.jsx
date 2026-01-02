import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "UI/UX Student",
    content:
      "The courses on Astrax are life-changing. I went from zero knowledge to landing my first junior role in just 4 months!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Senior Developer",
    content:
      "As a mentor, the platform provides incredible tools to reach students globally. The community here is vibrant and helpful.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Michael Smith",
    role: "Marketing Specialist",
    content:
      "The premium courses are worth every penny. The project-based learning approach actually helps you build a real portfolio.",
    rating: 4,
    image: "https://i.pravatar.cc/150?u=3",
  },
];

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 relative group"
    >
      <div className="absolute top-6 right-8 text-orange-500/10 group-hover:text-orange-500/20 transition-colors">
        <Quote size={56} fill="currentColor" />
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < review.rating
                ? "fill-orange-500 text-orange-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-8 relative z-10 italic">
        "{review.content}"
      </p>

      <div className="flex items-center gap-4">
        <img
          src={review.image}
          alt={review.name}
          className="w-12 h-12 rounded-full border-2 border-orange-500"
        />
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white leading-none">
            {review.name}
          </h4>
          <p className="text-sm text-orange-600 font-medium mt-1">
            {review.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ReviewsPage = () => {
  return (
    <section className="py-24 bg-[#fafafa] dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#FF782D] font-bold tracking-widest uppercase text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mt-3"
          >
            What our <span className="text-[#FF782D]">Students</span> Say
          </motion.h2>
          <div className="w-24 h-1 bg-[#FF782D] mx-auto mt-6 rounded-full" />
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom Floating Animation Decor */}
        <div className="mt-20 flex justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="px-8 py-3 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-orange-100 dark:border-gray-800 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                  src={`https://i.pravatar.cc/100?u=${i + 10}`}
                  alt="user"
                />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Join <span className="text-[#FF782D]">1,200+</span> happy learners
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;

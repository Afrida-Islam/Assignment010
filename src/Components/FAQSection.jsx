import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
// import faqImage from "../assets/image1.png";
import faqImage from "../assets/image.png";
import { motion } from "framer-motion";
const faqItems = [
  {
    question: "Do I need experience?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, numquam alias. Laborum maiores non iure, laudantium odio, ipsa magni a ducimus nobis consequuntur.",
  },
  {
    question: "How do I choose the right course?",
    answer:
      "Selecting the perfect course depends on your goals, current skill level, and interests. We recommend exploring our catalog and using the filter options to narrow down choices. Each course also has detailed descriptions and prerequisites.",
  },
  {
    question: "What skills do I need?",
    answer:
      "Most of our beginner courses require no prior experience. For advanced topics, specific prerequisites will be listed on the course page. Generally, a basic understanding of computer usage and internet navigation is helpful.",
  },
  {
    question: "How do they work?",
    answer:
      "Our courses are self-paced and online. You get access to video lectures, reading materials, quizzes, and projects. You can learn at your own schedule and interact with instructors and other students through forums.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2 ml-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white text-4xl font-bold"
          >
            <div className="mb-8 md:mb-12 text-left">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                How Can We Help You?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Discouraged and irrelevant life attitudes. You're upgrading to
                be a better you.peek into.
              </p>
            </div>
          </motion.div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 pt-0 text-base text-gray-600 dark:text-gray-400">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center p-4 pt-8">
          <img
            src={faqImage}
            alt="People asking questions"
            className="w-120 h-120  object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

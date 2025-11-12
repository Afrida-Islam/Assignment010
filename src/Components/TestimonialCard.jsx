import React from "react";
import userImage from "../assets/image3.jpeg";
import { BsChatRightQuoteFill } from "react-icons/bs";
const userTestimonial = {
  quote:
    "What a Great explanation with very detail information for me as the newbie Cloud Learner. This Course is my second source after AWS APN Learning Portal.",
};

const TestimonialCard = () => {
  return (
    <section className="py-16 lg:py-24 bg-orange-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-6xl font-extrabold text-orange-500 mb-6 leading-none item-center justify-center flex">
            <BsChatRightQuoteFill />
          </div>

          <p className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-8">
            {userTestimonial.quote}
          </p>

          <div className="flex justify-center">
            <img
              className="h-20 w-20 rounded-full object-cover shadow-lg"
              src={userImage}
              alt="Testimonial user profile picture"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop
                e.target.src =
                  "https://placehold.co/100x100/1e293b/ffffff?text=User";
              }}
            />
          </div>

          {/* Optional: Add User Name and Title if available */}
          {/* <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            John Doe
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cloud Learner
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;

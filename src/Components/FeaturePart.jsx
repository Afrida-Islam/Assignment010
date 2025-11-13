import React from "react";
import bgImage from "../assets/bg.jpeg";
const features = [
  {
    icon: "fa-solid fa-calendar-alt", // Placeholder for actual icon, see step 3
    title: "100% Flexible and Online",
    description:
      "Learn at your own pace, on your own schedule, from anywhere in the world.",
  },
  {
    icon: "fa-solid fa-award", // Placeholder
    title: "Trusted By Millions",
    description: "Join a global community of learners and professionals.",
  },
  {
    icon: "fa-solid fa-globe", // Placeholder
    title: "Offline access",
    description: "Download lessons and study without an internet connection.",
  },
  {
    icon: "fa-solid fa-user-graduate", // Placeholder
    title: "Self-Paced Learning",
    description:
      "Tailor your learning journey to fit your personal goals and speed.",
  },
];
const FeaturePart = () => {
  return (
    <div>
      <section
        className="relative py-16 lg:py-16 bg-orange-50  overflow-hidden"
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Background shapes - adjust colors and positions as needed */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 dark:bg-orange-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-200 dark:bg-teal-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 transform translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:text-center mb-12">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Us?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6"
              >
                {/* Icon Container (the white circle) */}
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-white dark:bg-gray-700 shadow-md mb-6">
                  {/* Placeholder for the actual icon */}
                  {/* Replace with an actual SVG or a font-awesome icon */}
                  <i
                    className={`${feature.icon} text-3xl text-orange-500 dark:text-orange-400`}
                  ></i>
                  {/* For example, if using an SVG directly: */}
                  {/* <svg className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8c1.11 0 2.08.402 2.592 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.592-1M12 11h2.5M12 11h-2.5" />
                </svg> */}
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                {/* Feature Description (optional, but good for context) */}
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturePart;

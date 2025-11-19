import React from "react";
// Import specific icons from lucide-react (using these instead of font-awesome classes)
import { Clock, Award, Download, GraduationCap } from "lucide-react";

// Using a mock link for the background image since external file imports are not supported in the single file mandate.
// const bgImage = "../assets/bg.jpeg";

const features = [
  {
    icon: Clock, // Component reference for "100% Flexible and Online"
    title: "100% Flexible and Online",
    description:
      "Learn at your own pace, on your own schedule, from anywhere in the world.",
  },
  {
    icon: Award, // Component reference for "Trusted By Millions"
    title: "Trusted By Millions",
    description: "Join a global community of learners and professionals.",
  },
  {
    icon: Download, // Component reference for "Offline access"
    title: "Offline access",
    description: "Download lessons and study without an internet connection.",
  },
  {
    icon: GraduationCap, // Component reference for "Self-Paced Learning"
    title: "Self-Paced Learning",
    description:
      "Tailor your learning journey to fit your personal goals and speed.",
  },
];

const FeaturePart = () => {
  return (
    <div className="font-sans antialiased bg-gray-50 dark:bg-gray-900">
      <section className="relative py-16 lg:py-24 bg-orange-50 dark:bg-gray-800 overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-300 dark:bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-40 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-300 dark:bg-teal-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 transform translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-wider text-orange-600 dark:text-orange-400 uppercase">
              Core Benefits
            </h2>
            <p className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Why Choose Our Platform?
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              A learning experience designed for modern life and global reach.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              // Assign the Icon component dynamically
              const IconComponent = feature.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-orange-100 dark:border-gray-700"
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-orange-100 dark:bg-orange-600/20 shadow-inner mb-6">
                    {/* Rendering the React Icon component */}
                    <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-orange-600 dark:text-orange-400" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturePart;

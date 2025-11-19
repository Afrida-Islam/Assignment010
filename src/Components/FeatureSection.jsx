import React from "react";

const features = [
  {
    title: "Explore",
    description: "In courses at any time, with lifetime access",
    icon: "🔍", // Example icon
  },
  {
    title: "Enroll",
    description: "In courses at any time, with lifetime access",
    icon: "📖",
  },
  {
    title: "Learn",
    description: "In courses at any time, with lifetime access",
    icon: "✍️",
  },
];

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div
      className="
      p-6 bg-white rounded-lg shadow-md border border-gray-100
      transform transition duration-300 ease-in-out
      hover:-translate-y-1 hover:shadow-xl hover:border-gray-200
      cursor-pointer
    "
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4 text-red-600">{icon}</div>

        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div className="bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-700">Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

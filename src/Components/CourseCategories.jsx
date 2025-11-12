import React, { useState } from "react";

// Data for your course categories
const categories = [
  { name: "All", count: null }, // 'All' often doesn't have a specific count in the display
  { name: "Digital Marketing", count: 4 },
  { name: "Science", count: 4 },
  { name: "Consulting", count: 4 },
  { name: "Network", count: 4 },
  { name: "Finance", count: 6 },
  { name: "Music & Audio", count: 4 },
  { name: "Content Writing", count: 4 },
  { name: "Marketing", count: 4 },
  { name: "Photography", count: 4 },
  { name: "Videography", count: 4 },
  { name: "Development", count: 4 },
  { name: "Art & Design", count: 4 },
];

const CourseCategories = () => {
  const [activeCategory, setActiveCategory] = useState("All"); // State to track the active category

  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Premium Courses
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Proin ac 9,845 Premium Courses, a vestibulum augue.
          </p>
          <p className="mt-1 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Vivamus ipsum
          </p>
        </div>

        {/* Category Buttons Container */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              // Dynamically apply classes based on whether this category is active
              className={`
                px-6 py-2 rounded-lg text-base font-medium transition-all duration-200 ease-in-out
                ${
                  activeCategory === category.name
                    ? "bg-orange-500 text-white shadow-md" // Active state classes
                    : "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" // Inactive state classes
                }
              `}
            >
              {category.name} {category.count !== null && `(${category.count})`}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;

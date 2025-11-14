import React, { useState } from "react";

const AddCourse = () => {
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     imageUrl: "",
  //     price: "",
  //     duration: "",
  //     category: "Development", // Set a default value
  //     description: "",
  //     isFeatured: false,
  //   });

  //   const handleChange = (e) => {
  //     const { name, value, type, checked } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: type === "checkbox" ? checked : value,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Logic to handle course submission (e.g., API call)
  //     console.log("Course Data Submitted:", formData);
  //     alert("Course Data Logged to Console!");
  //     // Optionally reset form here
  //     // setFormData({ /* ... initial state ... */ });
  //   };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center border-b pb-4">
          ➕ Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Image URL Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Course Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                // value={formData.title}
                // onChange={handleChange}
                required
                placeholder="e.g., Advanced React Hooks"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-1">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                // value={formData.imageUrl}
                // onChange={handleChange}
                placeholder="https://example.com/course.jpg"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Price, Duration, Category Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                // value={formData.price}
                // onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="49.99"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration (Hours/Weeks)
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                // value={formData.duration}
                // onChange={handleChange}
                required
                placeholder="10 hours or 4 weeks"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                // value={formData.category}
                // onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              //   value={formData.description}
              //   onChange={handleChange}
              required
              placeholder="Provide a detailed and engaging description of the course content..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                // checked={formData.isFeatured}
                // onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="isFeatured" className="font-medium text-gray-700">
                Feature this course
              </label>
              <p className="text-gray-500">
                Check this box to prominently display the course on the
                homepage.
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              🚀 Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

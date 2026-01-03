import { useLoaderData } from "react-router";
import { CourseCard } from "./CourseCard";
import { useState, useMemo } from "react";

const AllCourses = () => {
  const initialData = useLoaderData();

  const [models, setModels] = useState(
    Array.isArray(initialData) ? initialData : []
  );
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // Sorting state

  const handleSearch = (e) => {
    e.preventDefault();
    const category = e.target.search.value;
    setLoading(true);
    setModels([]);
    fetch(
      `https://assignment010serverside.vercel.app/search?search=${category}`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setModels(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error during search:", error);
        setModels([]);
        setLoading(false);
      });
  };

  // Sorting logic based on price
  const sortedModels = useMemo(() => {
    let sortedList = [...models];
    if (sortOrder === "lowToHigh") {
      sortedList.sort((a, b) => a.price_usd - b.price_usd);
    } else if (sortOrder === "highToLow") {
      sortedList.sort((a, b) => b.price_usd - a.price_usd);
    }
    return sortedList;
  }, [models, sortOrder]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <div className="text-4xl text-center font-extrabold text-gray-900 dark:text-white">
        Premium Courses
      </div>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mb-8">
        Browse our catalog of {models.length} Premium Courses, hand-selected for
        excellence.
      </p>

      {/* Control Section: Search and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center mb-10">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center items-center"
        >
          <div className="relative flex items-center w-full">
            <input
              name="search"
              type="search"
              placeholder="Search by topic or title..."
              className="w-full input input-bordered rounded-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-white border-gray-300 dark:border-slate-700 shadow-md focus:ring-2 focus:ring-indigo-500 transition"
            />
            <svg
              className="h-5 w-5 absolute left-3 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className={`py-2 px-8 rounded-full font-bold text-white transition duration-200 whitespace-nowrap ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
            }`}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-bold text-gray-700 dark:text-gray-300 hidden sm:block">
            Sort:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select select-bordered rounded-full bg-white dark:bg-slate-800 text-gray-700 dark:text-white border-gray-300 dark:border-slate-700 shadow-md focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
          >
            <option value="">Default Order</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Loading courses...
          </p>
        </div>
      ) : sortedModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedModels.map((model) => (
            <CourseCard key={model._id} model={model} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800">
          <p className="text-xl font-bold text-gray-500">
            No courses found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllCourses;

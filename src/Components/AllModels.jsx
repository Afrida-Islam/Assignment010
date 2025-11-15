import { useLoaderData } from "react-router";
import { CourseCard } from "../Components/CourseCard";
import { useState } from "react";

const AllModels = () => {
  const initialData = useLoaderData();

  const [models, setModels] = useState(
    Array.isArray(initialData) ? initialData : []
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(`Searching for: ${search_text}`);
    setLoading(true);
    setModels([]);
    fetch(`http://localhost:3000/models?search=${search_text}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="text-4xl text-center font-extrabold text-gray-900">
        Premium Courses
      </div>
      <p className="text-center text-gray-600 mt-2 mb-8">
        Browse our catalog of 9,845 Premium Courses, hand-selected for
        excellence.
      </p>

      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
      >
        <div className="relative flex items-center w-full max-w-md">
          <input
            name="search"
            type="search"
            placeholder="Search by topic or title..."
            className="w-full input input-bordered rounded-full pl-10 pr-4 py-2 text-gray-700 shadow-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <svg
            className="h-5 w-5 absolute left-3 opacity-50 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
        </div>
        <button
          type="submit"
          className={`py-2 px-6 rounded-full font-semibold text-white transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"
          }`}
          disabled={loading}
        >
          {loading ? "Searching...." : "Search"}
        </button>
      </form>

      {/* {loading ? (
        <div className="text-center text-xl text-indigo-600 py-10">
          Loading courses...
        </div>
      ) : models.length === 0 ? (
        <div className="text-center text-xl text-gray-500 py-10">
          No courses found. Try a different search term.
        </div>
      ) : ( */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {models.map((model) => (
          <CourseCard key={model._id} model={model} />
        ))}
      </div>
      {/* )} */}
    </div>
  );
};

export default AllModels;

import { useState, useEffect } from "react";
import { ModelCard } from "../Components/ModelCard";

const API_URL = "http://localhost:3000/data";

const SEARCH_API_URL = "http://localhost:3000/search";

const AllModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setModels(data);
        setError(null);
      } catch (e) {
        console.error("Failed to fetch initial data:", e);

        setError(
          "Failed to load models. Check if your backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(`Searching for: ${search_text}`);
    setLoading(true);

    fetch(`${SEARCH_API_URL}?search=${search_text}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Search failed: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Search results:", data);
        setModels(data);
        setError(null);
      })
      .catch((e) => {
        console.error("Search error:", e);
        setError("Search query failed. Check your server's search route.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading && models.length === 0) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
        <p>Loading models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600 font-medium bg-red-50 rounded-lg mx-auto max-w-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-12 md:mb-16 ">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white flex itam-center justify-center">
          Premium Courses
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto  flex itam-center justify-center">
          Proin ac 9,845 Premium Courses, a vestibulum augue.
        </p>
        <p className="mt-1 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto  flex itam-center justify-center">
          Vivamus ipsum
        </p>
      </div>

      {/* <form
        onSubmit={handleSearch}
        className=" mt-5 mb-10 flex gap-2 justify-center"
      >
        <label className="input input-bordered flex items-center gap-2 rounded-full max-w-xs w-full">
          <svg
            className="h-4 w-4 opacity-50"
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
          <input
            name="search"
            type="search"
            placeholder="Search"
            className="grow border-none focus:outline-none"
          />
        </label>
        <button className="btn btn-secondary rounded-full min-w-[100px]">
          {loading ? "Searching...." : "Search"}
        </button>
      </form> */}

      {models.length === 0 && !loading ? (
        <p className="text-center text-xl text-gray-500 mt-10">
          No models found for this query.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10 m-4">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllModels;

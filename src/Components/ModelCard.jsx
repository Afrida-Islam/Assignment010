import { Link } from "react-router-dom"; // Changed to 'react-router-dom' for general use

export const ModelCard = ({ model }) => {
  // Destructure all necessary fields, including the new ones
  const {
    name,
    thumbnail,
    category,
    _id,
    duration, // New field for time/duration (e.g., "1 year")
    students, // New field for students count (e.g., 1)
    rating, // New field for rating (e.g., 5.0)
    ratingCount, // New field for count (e.g., 1)
    price, // New field for price (e.g., 120)
    originalPrice, // Optional field for strikethrough price
  } = model;

  // Helper to render star ratings based on a number (assuming a 5-star system)
  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < fullStars ? "currentColor" : "none"}
          stroke={i < fullStars ? "none" : "currentColor"}
          className={`w-4 h-4 transition-colors ${
            i < fullStars ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.238l2.427 4.887 5.378.78.006.002c.489.07.697.63.354.98l-3.896 3.793.92 5.358c.08.468-.363.824-.77.633L12 18.528l-4.81 2.536c-.406.191-.85-.165-.77-.633l.92-5.358-3.896-3.793c-.343-.35-.135-.91.354-.98l5.378-.78.006-.002 2.427-4.887z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="card bg-white rounded-lg shadow-xl overflow-hidden max-w-sm">
      {/* --- Image/Thumbnail Section --- */}
      <figure className="h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover" // Removed hover effects to match static image
        />
      </figure>

      {/* --- Card Body --- */}
      <div className="card-body p-4">
        {/* Category (Videography) */}
        <p className="text-sm text-pink-600 font-medium mb-1">
          {category || "Category"}
        </p>

        {/* Title (Live Event Streaming) */}
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2">
          {name}
        </h2>

        {/* Duration and Students Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
          {/* Duration */}
          {duration && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="font-semibold text-gray-700">{duration}</span>
            </div>
          )}

          {/* Students */}
          {students !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </span>
              <span className="font-semibold text-gray-700">
                {students} Students
              </span>
            </div>
          )}
        </div>

        {/* Price and Rating Row (Card Actions area) */}
        <div className="flex justify-between items-center pt-2">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm font-semibold text-gray-800">
              {rating && rating.toFixed(1)} ({ratingCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-800">
              ${price || "N/A"}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Removed the 'View' button link to match the clean design of the example card */}
        {/* If you want to keep the link, wrap the entire card or just the image/title */}
      </div>
    </div>
  );
};

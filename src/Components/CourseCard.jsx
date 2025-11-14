import { Link } from "react-router-dom";

export const CourseCard = ({ model }) => {
  // Destructure and map JSON keys to component variables
  const {
    title,
    image_link,
    category,
    _id, // This is essential for the link destination!
    duration_weeks,
    students_enrolled,
    rating,
    price_usd,
  } = model;

  // Function to determine the display duration
  const displayDuration = duration_weeks ? `${duration_weeks} weeks` : "N/A";

  // Function to render stars (omitted for brevity, assume it's the same)
  const renderStars = (score) => {
    // ... same renderStars function as before
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
      {/* Image/Thumbnail Section */}
      <figure className="h-48 overflow-hidden">
        <img
          src={image_link}
          alt={title}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body p-4 flex flex-col">
        {" "}
        {/* Added flex-col to manage spacing */}
        {/* Category (Data Science) */}
        <p className="text-sm text-gray-500 font-medium mb-1">
          {category || "Category"}
        </p>
        {/* Title (Machine Learning with Python) */}
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3">
          {title}
        </h2>
        {/* Duration and Students Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {/* Duration */}
          {duration_weeks && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500">
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
              <span className="font-medium text-gray-700">
                {displayDuration}
              </span>
            </div>
          )}

          {/* Students */}
          {students_enrolled !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </span>
              <span className="font-medium text-gray-700">
                {students_enrolled.toLocaleString()} Students
              </span>
            </div>
          )}
        </div>
        {/* Price and Rating Row (Bottom) */}
        <div className="flex justify-between items-center pb-3">
          {" "}
          {/* Moved border to the button section below */}
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm font-semibold text-gray-800">
              {rating ? rating.toFixed(1) : "N/A"}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-800">
              ${price_usd ? price_usd.toFixed(2) : "N/A"}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-1">
          {_id && (
            <Link
              to={`/coursesdatails${_id}`}
              className="w-full inline-block text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

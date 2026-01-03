import { Link } from "react-router-dom";

export const CourseCard = ({ model }) => {
  const {
    title,
    image_link,
    category,
    _id,
    duration_weeks,
    students_enrolled,
    rating,
    price_usd,
  } = model;

  const displayDuration = duration_weeks ? `${duration_weeks} weeks` : "N/A";

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
            i < fullStars
              ? "text-yellow-500"
              : "text-gray-300 dark:text-slate-600"
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
    // Card Wrapper: dark backgrounds and border added
    <div className="card bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden max-w-sm border border-transparent dark:border-slate-800 transition-colors duration-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={image_link}
          alt={title}
          className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
        />
      </figure>

      <div className="card-body p-5 flex flex-col">
        {/* Category: dark:text-slate-400 */}
        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-1">
          {category || "Category"}
        </p>

        {/* Title: dark:text-white */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-tight mb-3 line-clamp-2">
          {title}
        </h2>

        {/* Duration & Students Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400 mb-4">
          {duration_weeks && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500 dark:text-orange-400">
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
              <span className="font-medium text-gray-700 dark:text-slate-300">
                {displayDuration}
              </span>
            </div>
          )}

          {students_enrolled !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500 dark:text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </span>
              <span className="font-medium text-gray-700 dark:text-slate-300">
                {students_enrolled.toLocaleString()} Students
              </span>
            </div>
          )}
        </div>

        {/* Rating & Price */}
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(rating)}</div>
            <span className="text-sm font-semibold text-gray-800 dark:text-slate-200">
              {rating ? rating.toFixed(1) : "N/A"}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-gray-800 dark:text-white">
              ${price_usd ? price_usd.toFixed(2) : "N/A"}
            </span>
          </div>
        </div>

        {/* Footer Link: dark:border-slate-800 */}
        <div className="border-t border-gray-100 dark:border-slate-800 pt-4 mt-auto">
          {_id && (
            <Link
              to={`/coursesdatails/${_id}`}
              className="w-full inline-block text-center py-2.5 px-4 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

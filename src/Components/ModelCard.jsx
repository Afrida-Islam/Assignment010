import React from "react";
// Assuming Link is correctly imported from react-router in your full environment
import { Link } from "react-router";

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "#f59e0b" : "none"}
    stroke={filled ? "#f59e0b" : "#f59e0b"}
    className="w-4 h-4 transition-colors duration-100"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 mr-1.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const HatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 mr-1.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3L2 8v13h20V8L12 3z" />
    <path d="M12 3v5" />
    <path d="M22 11l-5 3" />
    <path d="M2 11l5 3" />
  </svg>
);

export const ModelCard = ({ model }) => {
  const {
    name,
    thumbnail,
    category,
    description,
    _id,
    created_by,

    duration = "N/A",
    students = "0 Students",
    rating = 0.0,
    reviewCount = 0,
    price = 0,
    originalPrice = 0,
  } = model;

  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= Math.round(score)} />);
    }
    return stars;
  };

  return (
    <div
      className="w-100 max-w-sm bg-white rounded-xl shadow-lg 
                       hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 
                       overflow-hidden font-inter border border-gray-100"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/320x192/94a3b8/ffffff?text=Image+Not+Found`;
            e.target.className = "w-full h-full object-contain bg-gray-200 p-4";
          }}
        />
      </figure>

      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wider">
            {category}
          </div>

          <div className="text-xs text-gray-500 italic">by {created_by}</div>
        </div>

        <h2 className="text-gray-900 text-xl font-extrabold leading-snug mb-3">
          {name}
        </h2>

        <p className="line-clamp-2 text-sm text-gray-600 mb-3">
          {description || "No description provided."}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <ClockIcon />
            <span>{duration}</span>
          </span>
          <span className="flex items-center">
            <HatIcon />
            <span>{students}</span>
          </span>
        </div>

        <div className="flex justify-between items-end pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm font-semibold">
            <div className="flex space-x-0.5">{renderStars(rating)}</div>
            <span className="ml-2 text-gray-800">{rating.toFixed(1)}</span>
            <span className="ml-1 text-gray-500 text-xs">({reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end">
            {originalPrice > price && (
              <span className="text-xs text-gray-400 line-through mb-[-0.25rem]">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {/* Current Price */}
            <span className="text-2xl font-bold text-red-600">${price}</span>
          </div>
        </div>
      </div>

      {/* View Button (using Link) */}
      <div className="p-5 pt-0">
        <Link
          to={`/model-details`}
          className="flex justify-center items-center w-full py-2 px-4 rounded-lg text-white font-semibold 
                               bg-orange-600 hover:bg-orange-700 transition-colors duration-300 shadow-md 
                               shadow-blue-500/50"
        >
          View Course
        </Link>
      </div>
    </div>
  );
};

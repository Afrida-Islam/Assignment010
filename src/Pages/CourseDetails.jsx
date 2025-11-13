import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- FALLBACK MOCK COURSE DATA STRUCTURE (if API fails or returns incomplete data) ---
const FALLBACK_COURSE = {
  _id: "default-001",
  name: "Course Data Not Found",
  category: "N/A",
  description:
    "Could not load course details from the API. Please ensure your Express server is running and the /data endpoint is returning an array of course objects.",
  created_by: "System",
  thumbnail:
    "https://placehold.co/1200x600/ef4444/ffffff?text=Data+Loading+Failed",
  duration: "Unknown",
  students: "0",
  rating: 0,
  reviewCount: 0,
  price: 0,
  originalPrice: 0,
  modules: ["Check Server Status (http://localhost:3000/data)"],
  features: ["Error details in console"],
};

// --- ICON COMPONENTS (Lucide via Inline SVG) ---

const StarIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={`text-yellow-400 ${className}`}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ClockIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-blue-600 ${className}`}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const UsersIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-blue-600 ${className}`}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CheckIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-green-500 ${className}`}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AwardIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-orange-500 ${className}`}
  >
    <path d="M12 15a6.5 6.5 0 0 0 1.5-4h-3a6.5 6.5 0 0 0 1.5 4Z" />
    <path d="M12 2a4 4 0 0 0-4 4v4.5A4.5 4.5 0 0 0 7 15l2 2v3l3-2 3 2v-3l2-2a4.5 4.5 0 0 0-.5-4.5V6a4 4 0 0 0-4-4Z" />
  </svg>
);

// --- TOAST COMPONENT ---
const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl transition-all duration-300 transform 
                ${
                  show
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }
                bg-green-600 text-white`}
      role="alert"
      style={{ minWidth: "280px" }}
    >
      <div className="flex items-center">
        <CheckIcon size={24} className="text-white mr-2" />
        <span className="font-semibold text-base">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

const CourseDetails = ({ course: initialCourse }) => {
  // 💡 FIX: Safely use the course prop, falling back to mock data if it's undefined/null.
  const course = initialCourse || FALLBACK_COURSE;

  const [showToast, setShowToast] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Handle the enrollment process
  const handleEnroll = () => {
    if (isEnrolled) return;

    console.log(`Simulating enrollment for course: ${course.name}`);

    // Simulate a delay for an async action (e.g., API call)
    setTimeout(() => {
      setIsEnrolled(true);
      setShowToast(true);
    }, 500);
  };

  // Helper function to render star rating
  const renderStars = (score) => {
    const stars = [];
    const roundedScore = Math.round(score || 0);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          size={16}
          className={i <= roundedScore ? "opacity-100" : "opacity-40"}
        />
      );
    }
    return stars;
  };

  // Card for the enrollment/price details (fixed/sticky sidebar)
  const EnrollmentCard = () => (
    <div className="lg:sticky lg:top-8 mt-6 lg:mt-0 p-6 bg-white rounded-xl shadow-2xl border border-blue-100/50">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
        Course Access
      </h3>

      <div className="flex items-baseline mb-4">
        {/* Current Price */}
        <span className="text-5xl font-extrabold text-red-600 leading-none">
          ${(course.price || 0).toFixed(2)}
        </span>
        {/* Original Price */}
        {course.originalPrice > course.price && (
          <span className="ml-3 text-lg text-gray-500 line-through">
            ${(course.originalPrice || 0).toFixed(2)}
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-between text-gray-700">
          <span className="flex items-center">
            <ClockIcon size={18} className="mr-2" />
            Duration:
          </span>
          <span className="font-semibold text-gray-900">
            {course.duration || "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="flex items-center">
            <UsersIcon size={18} className="mr-2" />
            Students:
          </span>
          <span className="font-semibold text-gray-900">
            {course.students || "0"}
          </span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="flex items-center">
            <StarIcon size={18} className="mr-2 !text-yellow-500" />
            Rating:
          </span>
          <span className="font-semibold text-gray-900 flex items-center">
            {(course.rating || 0).toFixed(1)}{" "}
            <span className="ml-1 text-xs text-gray-500">
              ({course.reviewCount || 0})
            </span>
          </span>
        </div>
      </div>

      {/* Enrollment Button */}
      <button
        onClick={handleEnroll}
        disabled={isEnrolled}
        className={`w-full py-3 text-lg font-bold rounded-xl transition-all duration-300 transform 
                                ${
                                  isEnrolled
                                    ? "bg-green-500 hover:bg-green-600 cursor-not-allowed shadow-none"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/50 hover:shadow-2xl"
                                }`}
      >
        {isEnrolled ? "Successfully Enrolled!" : "Enroll Now"}
      </button>

      {/* Features list */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
        <ul className="space-y-2 text-sm">
          {(course.features || FALLBACK_COURSE.features).map(
            (feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <AwardIcon size={16} className="mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header/Hero Section */}
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 mb-8 border-t-4 border-blue-600">
          <span className="inline-block px-3 py-1 text-sm font-bold text-blue-800 bg-blue-100 rounded-full uppercase tracking-wider mb-3">
            {/* Error was here when course was undefined */}
            {course.category || "CATEGORY"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {course.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{course.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
            <span className="italic">
              Taught by:{" "}
              <span className="font-medium text-gray-800">
                {course.created_by || "N/A"}
              </span>
            </span>
            <div className="flex items-center">
              <div className="flex space-x-0.5">
                {renderStars(course.rating)}
              </div>
              <span className="ml-2 font-bold text-gray-900">
                {(course.rating || 0).toFixed(1)}
              </span>
              <span className="ml-1 text-gray-500 text-sm">
                ({course.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Main Content: Modules & Enrollment Card */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Column 1: Course Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image */}
            <figure className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={course.thumbnail || FALLBACK_COURSE.thumbnail}
                alt={course.name}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/1200x600/94a3b8/ffffff?text=Image+Not+Available`;
                }}
              />
            </figure>

            {/* What You'll Learn (Modules) */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
                What You'll Learn (Modules)
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                {(course.modules || FALLBACK_COURSE.modules).map(
                  (module, index) => (
                    <li
                      key={index}
                      className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100 transition duration-200 hover:bg-blue-50"
                    >
                      <CheckIcon size={20} className="mt-1 flex-shrink-0" />
                      <span className="ml-3 font-medium">{module}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Column 2: Enrollment Card (Sticky on Large Screens) */}
          <div className="lg:col-span-1">
            <EnrollmentCard />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message="Enrollment Successful! You now have access to the course."
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
export default CourseDetails;

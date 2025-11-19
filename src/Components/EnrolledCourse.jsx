import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
// NOTE: Assuming AuthContext and useAuth are correctly set up
// import { useAuth } from "../context/AuthContext";

// --- PLACEHOLDER / MOCK IMPORTS (Replace with your actual imports) ---
const useAuth = () => ({
  currentUser: {
    email: "afrida0627@gmail.com",
  },
});
const handleUnenroll = (_id) => {
  console.log(`Unenrolling from enrollment document ID: ${_id}`);
  alert(`Unenrollment logic for ID ${_id} goes here!`);
};
// --- END PLACEHOLDERS ---

// =========================================================================
// 1. Enrolled Course List Item Component (Inner Component - UI Flow Preserved)
// =========================================================================

function EnrolledCourseListItem({ course, handleUnenroll }) {
  // Destructure properties exactly as they appear in your API response
  const {
    _id, // MongoDB ID for the enrollment record (used for unenrollment)
    courseId, // Course ID (used for linking to the course start page)
    courseTitle,
    instructor,
    price_usd,
    image_link,
  } = course;

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-b-0 shadow-lg rounded-lg mb-4">
      {/* Left Section: Icon, Name, Details */}
      <div className="flex items-center">
        {/* Icon/Image Placeholder */}
        <div className="w-12 h-12 shrink-0 bg-gray-200 rounded-md mr-4 overflow-hidden">
          {image_link ? (
            <img
              src={image_link}
              alt={courseTitle || "Course image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full"></div>
          )}
        </div>

        {/* Course Details */}
        <div className="flex flex-col">
          {/* Main Title */}
          <span className="text-base font-semibold text-gray-800">
            {courseTitle}
          </span>

          {/* Statistics/Details (Instructor and Price) */}
          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
            {/* Instructor */}
            <span className="flex items-center text-gray-600 font-medium">
              By: {instructor}
            </span>

            {/* Price (Formatted) */}
            <span className="text-gray-500">
              <p className="font-bold text-green-600">
                {price_usd === 0 || price_usd === "0"
                  ? "FREE"
                  : `$${price_usd}`}
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex gap-2 items-center">
        {/* 1. Primary Action: Start Learning */}
        <Link to={`/course/start/${courseId}`}>
          <button className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Start Learning
          </button>
        </Link>

        {/* 2. Secondary Action: Unenroll */}
        <button
          onClick={() => handleUnenroll(_id)}
          className="flex-shrink-0 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-full shadow-sm transition-all duration-200 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          Unenroll
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 2. Main Parent Component (Handles Fetching and Mapping)
// =========================================================================

export default function EnrolledCourse() {
  const { currentUser } = useAuth();
  // 💥 FIX 1: Initialized as an ARRAY [] and renamed to PLURAL 'models'
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dependencies used in the original component (keeping them if needed elsewhere)
  const { id } = useParams();
  const [refetch, setRefecth] = useState(false);

  useEffect(() => {
    // 1. Guard Clause: Prevent fetching if the email isn't available yet
    if (!currentUser?.email) {
      setLoading(false);
      // 💥 FIX 4: Ensure models is an empty array if we skip the fetch
      setModels([]);
      return;
    }

    console.log("call api");

    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        // Correct API call structure
        const response = await fetch(
          `http://localhost:3000/my-enrolls?email=${currentUser.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // 💥 FIX 2: Use setModels (plural) to set the array
        setModels(data);

        console.log("Api called!");
        console.log(data);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        // 💥 FIX 3: Always set an empty array on failure
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();

    // 💡 Dependencies cleaned up, only using variables that trigger the effect
  }, [currentUser?.email, refetch]);

  // --- Render ---
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Enrolled Courses 📚
      </h1>

      {/* Conditional Rendering based on state */}
      {loading ? (
        <p className="text-gray-600">Loading your enrolled courses...</p>
      ) : Array.isArray(models) && models.length === 0 ? (
        // Use Array.isArray(models) for absolute safety, although the initialization fixes most issues
        <div className="p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-md">
          <p className="font-medium">
            You are not currently enrolled in any courses.
          </p>
          <p className="text-sm">Time to start a new learning journey!</p>
        </div>
      ) : (
        models.map((course) => (
          <EnrolledCourseListItem
            key={course._id}
            course={course}
            handleUnenroll={handleUnenroll}
          />
        ))
      )}
    </div>
  );
}

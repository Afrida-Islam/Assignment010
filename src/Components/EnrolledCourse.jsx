import React, { useEffect, useState } from "react";

// --- MOCK UTILITIES (For runnable self-contained component) ---

// Mocking useAuth
const useAuth = () => ({
  currentUser: {
    email: "afrida0627@gmail.com",
    uid: "user-abc-123"
  },
});

// Mocking useParams from react-router-dom
const useParams = () => ({ id: 'mock-id' });

// Mocking Link from react-router-dom as a standard anchor tag
const Link = ({ to, children, className }) => (
  <a href={to} className={className} onClick={(e) => {
    e.preventDefault();
    console.log(`Navigating to: ${to}`);
  }}>
    {children}
  </a>
);

// Mock data to simulate the API response
const MOCK_ENROLLMENTS = [
  {
    _id: "e001",
    courseId: "c101",
    courseTitle: "Introduction to Responsive Web Design",
    instructor: "Jane Doe",
    price_usd: 49.99,
    image_link: "https://placehold.co/100x100/1e40af/ffffff?text=Web+Dev",
  },
  {
    _id: "e002",
    courseId: "c102",
    courseTitle: "Data Structures in Python (Advanced)",
    instructor: "Dr. Alex Chen",
    price_usd: 0,
    image_link: "https://placehold.co/100x100/065f46/ffffff?text=Python",
  },
  {
    _id: "e003",
    courseId: "c103",
    courseTitle: "The Art of Digital Painting with Procreate",
    instructor: "Mia Rodriguez",
    price_usd: 129.00,
    image_link: "https://placehold.co/100x100/9d174d/ffffff?text=Design",
  },
];

// Replaces the original handleUnenroll to avoid `alert()`
const handleUnenroll = (_id) => {
  console.log(`Unenrollment initiated for enrollment ID: ${_id}. (In a real app, this would trigger an API call to delete the enrollment.)`);
};


// --- COURSE LIST ITEM COMPONENT ---
function EnrolledCourseListItem({ course, handleUnenroll }) {
  const { _id, courseId, courseTitle, instructor, price_usd, image_link } = course;

  // Key responsiveness applied here:
  // flex-col on small screens, switching to flex-row (justify-between) on medium screens.
  // Action buttons (the last div) are full width on small screens (w-full) and stack the buttons vertically (flex-col).
  // On medium screens and up, the button container reverts to row layout and auto-width.
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white border-b border-gray-200 shadow-lg rounded-xl mb-6 transition-all duration-300 hover:shadow-xl">
      
      {/* Course Info Section - Stays left-aligned */}
      <div className="flex items-start flex-grow mb-4 md:mb-0 min-w-0">
        <div className="w-14 h-14 shrink-0 bg-gray-100 rounded-lg mr-4 overflow-hidden shadow-inner">
          {image_link ? (
            <img
              src={image_link}
              alt={courseTitle || "Course image"}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/e5e7eb/6b7280?text=Course"; }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-base font-semibold text-gray-900 truncate">
            {courseTitle}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 sm:space-x-3">
            <span className="text-gray-600 font-medium">
              By: {instructor}
            </span>

            <span className="text-sm text-gray-500 sm:mt-0">
              <p className="font-bold text-green-600">
                {price_usd === 0 || price_usd === "0"
                  ? "FREE"
                  : `$${(typeof price_usd === 'number' ? price_usd.toFixed(2) : price_usd)}`}
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section - Stacks on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[280px]"> 
        <Link to={`/course/start/${courseId}`} className="w-full sm:w-1/2 md:w-auto">
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Start Learning
          </button>
        </Link>

        <button
          onClick={() => handleUnenroll(_id)}
          className="w-full sm:w-1/2 md:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-full shadow-sm transition-all duration-200 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          Unenroll
        </button>
      </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---
export default function App() {
  const { currentUser } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Using the mocked useParams

  // Refetch state is kept for demonstration, though not strictly needed for mock data
  const [refetch, setRefecth] = useState(false); 

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      setModels([]);
      return;
    }

    // Replace the external fetch with a mock data load simulation
    const fetchEnrolledCourses = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        try {
          // In a real app, you'd filter MOCK_ENROLLMENTS by currentUser.email
          setModels(MOCK_ENROLLMENTS); 
          console.log("Mock API call successful. Data loaded.");
        } catch (err) {
          console.error("Error fetching enrolled courses:", err);
          setModels([]);
        } finally {
          setLoading(false);
        }
      }, 800); // 800ms delay
    };

    fetchEnrolledCourses();
  }, [currentUser?.email, refetch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 border-b-2 pb-2">
          My Enrolled Courses 📚
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
             <p className="ml-4 text-lg text-gray-600">Loading your courses...</p>
          </div>
        ) : Array.isArray(models) && models.length === 0 ? (
          <div className="p-6 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-md shadow-md">
            <p className="font-semibold text-lg">
              You are not currently enrolled in any courses.
            </p>
            <p className="text-base mt-1">
              Time to explore the catalog and start a new learning journey!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {models.map((course) => (
              <EnrolledCourseListItem
                key={course._id}
                course={course}
                handleUnenroll={handleUnenroll}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
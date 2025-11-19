import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

const useAuth = () => ({
  currentUser: {
    email: "afrida0627@gmail.com",
  },
});
const handleUnenroll = (_id) => {
  console.log(`Unenrolling from enrollment document ID: ${_id}`);
  alert(`Unenrollment logic for ID ${_id} goes here!`);
};

function EnrolledCourseListItem({ course, handleUnenroll }) {
  const { _id, courseId, courseTitle, instructor, price_usd, image_link } =
    course;

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-b-0 shadow-lg rounded-lg mb-4">
      <div className="flex items-center">
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

        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">
            {courseTitle}
          </span>

          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
            <span className="flex items-center text-gray-600 font-medium">
              By: {instructor}
            </span>

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

      <div className="flex gap-2 items-center">
        <Link to={`/course/start/${courseId}`}>
          <button className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Start Learning
          </button>
        </Link>

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

export default function EnrolledCourse() {
  const { currentUser } = useAuth();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [refetch, setRefecth] = useState(false);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);

      setModels([]);
      return;
    }

    console.log("call api");

    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/my-enrolls?email=${currentUser.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setModels(data);

        console.log("Api called!");
        console.log(data);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);

        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser?.email, refetch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Enrolled Courses 📚
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading your enrolled courses...</p>
      ) : Array.isArray(models) && models.length === 0 ? (
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

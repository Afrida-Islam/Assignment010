import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// --- COURSE LIST ITEM COMPONENT ---
function EnrolledCourseListItem({ course, handleUnenroll }) {
  const { _id, courseId, courseTitle, instructor, price_usd, image_link } =
    course;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white border-b border-gray-200 shadow-lg rounded-xl mb-6 transition-all duration-300 hover:shadow-xl">
      {/* Course Info Section - Stays left-aligned */}
      <div className="flex items-start flex-grow mb-4 md:mb-0 min-w-0">
        <div className="w-14 h-14 shrink-0 bg-gray-100 rounded-lg mr-4 overflow-hidden shadow-inner">
          {image_link ? (
            <img
              src={image_link}
              alt={courseTitle || "Course image"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/e5e7eb/6b7280?text=Course";
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-base font-semibold text-gray-900 truncate">
            {courseTitle}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-1 sm:space-x-3">
            <span className="text-gray-600 font-medium">By: {instructor}</span>

            <span className="text-sm text-gray-500 sm:mt-0">
              <p className="font-bold text-green-600">
                {price_usd === 0 || price_usd === "0"
                  ? "FREE"
                  : `$${
                      typeof price_usd === "number"
                        ? price_usd.toFixed(2)
                        : price_usd
                    }`}
              </p>
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section - Stacks on mobile, inline on desktop */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[280px]">
        <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          Start Learning
        </button>

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

// --- MAIN COMPONENT ---
export default function EnrolledCourse() {
  const { currentUser } = useAuth();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      setModels([]);
      return;
    }

    const fetchEnrolledCourses = async () => {
      setLoading(true);

      try {
        const url = `https://assignment010serverside.vercel.app/my-enrolls?email=${currentUser.email}`;

        const response = await fetch(url);

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(
            `HTTP Error ${
              response.status
            }: Failed to load enrollments. Response body: ${errorBody.substring(
              0,
              100
            )}...`
          );
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.result)) {
          setModels(data.result);
        } else if (Array.isArray(data)) {
          setModels(data);
          console.warn(
            "Server responded with a direct array, not {success: true, result: [...]}."
          );
        } else {
          setModels([]);
          // toast.error(data.message || "Failed to fetch enrolled courses.");
          console.error(
            "API response structure is incorrect or success is false:",
            data
          );
        }
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        // toast.error("An error occurred while fetching your courses.");
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser?.email, refetch]);

  const handleUnenroll = (enrollmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be unenrolled from this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unenroll me!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment010serverside.vercel.app/enrolls/${enrollmentId}`
          // {
          //   method: "DELETE",
          //   headers: {
          //     authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          // }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Unenrolled!",
                "You have been successfully unenrolled.",
                "success"
              );
              setRefetch(!refetch); // Trigger refetch
            } else {
              Swal.fire(
                "Error!",
                data.message || "Failed to unenroll.",
                "error"
              );
            }
          })
          .catch((err) => {
            console.error("Unenrollment error:", err);
            Swal.fire(
              "Error!",
              "An error occurred during unenrollment.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 border-b-2 pb-2">
          My Enrolled Courses 📚
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-600">
              Loading your courses...
            </p>
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

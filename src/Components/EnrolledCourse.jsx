import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

// --- COURSE LIST ITEM COMPONENT ---
function EnrolledCourseListItem({ course, handleUnenroll }) {
  const { _id, courseTitle, instructor, price_usd, image_link } = course;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-lg dark:shadow-none rounded-2xl mb-6 transition-all duration-300 hover:shadow-xl dark:hover:border-slate-700">
      {/* Course Info Section */}
      <div className="flex items-start flex-grow mb-4 md:mb-0 min-w-0">
        <div className="w-16 h-16 shrink-0 bg-gray-100 dark:bg-slate-800 rounded-xl mr-4 overflow-hidden shadow-inner">
          {image_link ? (
            <img
              src={image_link}
              alt={courseTitle || "Course image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/e5e7eb/6b7280?text=Course";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {courseTitle}
          </span>

          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-slate-400 mt-1 sm:space-x-4">
            <span className="font-medium">By: {instructor}</span>
            <span className="font-bold text-green-600 dark:text-green-400">
              {price_usd === 0 || price_usd === "0"
                ? "FREE"
                : `$${
                    typeof price_usd === "number"
                      ? price_usd.toFixed(2)
                      : price_usd
                  }`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[280px]">
        <button className="w-full px-5 py-2.5 text-sm font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all">
          Start Learning
        </button>

        <button
          onClick={() => handleUnenroll(_id)}
          className="w-full sm:w-1/2 md:w-auto px-5 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
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
        const data = await response.json();

        if (data.success && Array.isArray(data.result)) {
          setModels(data.result);
        } else if (Array.isArray(data)) {
          setModels(data);
        } else {
          setModels([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
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
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Unenrolled!", "You have been unenrolled.", "success");
              setRefetch(!refetch);
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 md:p-10 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-white mb-8 border-b-2 border-gray-200 dark:border-slate-800 pb-3">
          My Learning Journey 📚
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
            <p className="ml-4 text-lg text-gray-600 dark:text-slate-400">
              Fetching courses...
            </p>
          </div>
        ) : models.length === 0 ? (
          <div className="p-10 bg-blue-50 dark:bg-slate-900 border-l-4 border-blue-400 text-blue-800 dark:text-blue-400 rounded-xl shadow-sm">
            <p className="font-bold text-xl">
              You haven't enrolled in any courses yet.
            </p>
            <p className="mt-2 text-gray-600 dark:text-slate-500">
              Start your journey today by exploring our available classes!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
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

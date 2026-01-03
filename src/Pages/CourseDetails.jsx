import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch(`https://assignment010serverside.vercel.app/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching model:", err);
        setLoading(false);
      });
  }, [id]);

  const {
    _id,
    category,
    title,
    level,
    duration_weeks,
    students_enrolled,
    rating,
    price_usd,
    instructor,
    certificate_offered,
    image_link,
    description,
  } = model;

  const handleEnrollment = () => {
    if (!currentUser) {
      toast.error("You need to login to enroll in a course.");
      navigate("/logindata");
      return;
    }

    const enrollmentData = {
      courseId: _id,
      userEmail: currentUser.email,
      courseTitle: title,
      instructor,
      price_usd,
      image_link,
    };

    fetch(`https://assignment010serverside.vercel.app/enrolls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(enrollmentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Enrolled!",
            text: "Successfully enrolled in this course.",
            icon: "success",
          }).then(() => navigate("/enrolled-courses"));
        } else {
          Swal.fire({ title: "Error!", text: data.message, icon: "error" });
        }
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-slate-950 dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Main Card Wrapper */}
      <div className="card bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-colors duration-300">
        {/* Main Content: Image and Primary Details */}
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
          {/* Image Section */}
          <div className="shrink-0 w-full md:w-5/12">
            <img
              src={image_link}
              alt={title}
              className="w-full object-cover rounded-2xl shadow-lg h-80 sm:h-96"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-7/12">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 dark:bg-indigo-500 rounded-full uppercase">
                {category || "N/A"}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                  level === "Advanced"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                }`}
              >
                {level || "N/A"}
              </span>
              {certificate_offered && (
                <span className="px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full uppercase">
                  Certificate Included
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
              {title}
            </h1>

            <p className="text-gray-600 dark:text-slate-400 text-lg">
              Instructor:{" "}
              <span className="font-semibold text-gray-800 dark:text-slate-200">
                {instructor}
              </span>
            </p>

            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
              <button
                onClick={handleEnrollment}
                className="py-4 px-10 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 transition duration-150 shadow-lg text-lg transform hover:-translate-y-1"
              >
                Enroll Now (${price_usd})
              </button>
              <button
                onClick={() => navigate(`/update-course/${_id}`)}
                className="py-4 px-10 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-150 shadow-lg text-lg transform hover:-translate-y-1"
              >
                Update Course
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6 md:p-10 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-10">
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <p className="text-2xl font-black text-green-600 dark:text-green-400">
                ${price_usd}
              </p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mt-1">
                Price
              </p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <p className="text-2xl font-black text-yellow-500">⭐ {rating}</p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mt-1">
                Rating
              </p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {students_enrolled ? students_enrolled.toLocaleString() : "0"}
              </p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mt-1">
                Students
              </p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
              <p className="text-2xl font-black text-pink-600 dark:text-pink-400">
                {duration_weeks ? `${duration_weeks}W` : "N/A"}
              </p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase mt-1">
                Duration
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-orange-500 rounded-full"></span>
              Course Description
            </h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg bg-white dark:bg-slate-900/50 p-6 rounded-2xl border dark:border-slate-800">
              {description || "No description provided for this course."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [refetch, setRefecth] = useState(false);

  useEffect(() => {
    console.log("call api");

    fetch(`http://localhost:3000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data.result);
        console.log("Api called!");
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching model:", err);
        setLoading(false);
      });
  }, [currentUser, id, refetch]);

  const {
    _id,
    course_id,
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
    console.log('Check user: ' + JSON.stringify(currentUser));

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

    fetch(`http://localhost:3000/enrolls`, {
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
            text: "You have successfully enrolled in this course.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/enrolled-courses");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Failed to enroll in the course.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        console.error("Enrollment error:", err);
        Swal.fire({
          title: "Error!",
          text: "An error occurred during enrollment.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleUpdate = () => {
    navigate(`/update-course/${_id}`);
  };

  if (loading) {
    return <div> Loading...</div>;
  }

  return (
    <div className="card bg-white shadow-2xl border border-gray-100 rounded-2xl overflow-hidden">
      {/* Main Content: Image and Primary Details */}
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10">
        {/* Image Section */}
        <div className="shrink-0 w-full md:w-5/12">
          <img
            src={image_link}
            alt={title || "Course image"}
            className="w-full object-cover rounded-xl shadow-lg h-80 sm:h-96"
          />
        </div>

        <div className="flex flex-col justify-start space-y-4 w-full md:w-7/12 m-6">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm font-semibold text-white bg-indigo-600 rounded-full">
              {category || "N/A"}
            </span>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                level === "Advanced"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {level || "N/A"}
            </span>
            {certificate_offered && (
              <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                Certificate Included
              </span>
            )}
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            {title}
          </h1>

          <p className="text-gray-600 leading-relaxed text-lg pt-2">
            <span className="font-semibold text-gray-700">{instructor}</span>
          </p>

          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={handleEnrollment}
              className="py-3 px-8 rounded-full font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-150 shadow-lg text-lg transform hover:scale-105 mb-5"
            >
              Enroll Now (${price_usd})
            </button>
            <button
              onClick={handleUpdate}
              className="py-3 px-8 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 shadow-lg text-lg transform hover:scale-105 mb-5"
            >
              Update Course
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <p className="text-2xl font-bold text-green-600">${price_usd}</p>
            <p className="text-sm text-gray-500 mt-1">Course Price</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <p className="text-2xl font-bold text-yellow-600">⭐ {rating}</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <p className="text-2xl font-bold text-blue-600">
              {students_enrolled ? students_enrolled.toLocaleString() : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Students Enrolled</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <p className="text-2xl font-bold text-pink-600">
              {duration_weeks ? `${duration_weeks} Weeks` : "N/A"}
            </p>
            <p className="text-sm text-gray-500 mt-1">Course Duration</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
            Course Description
          </h2>
          <p className="text-gray-700 leading-loose text-base">
            {description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

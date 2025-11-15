import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// --- Custom Confirmation Modal Component ---
const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, text }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{text}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const CouseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = {
    accessToken: "MOCK_TOKEN_12345",
    email: "mock.user@example.com",
  };

  const showToast = (message, type = "success") => {
    console.log(`[TOAST - ${type.toUpperCase()}]: ${message}`);

    alert(message);
  };
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
  const fetchModelDetails = useCallback(() => {
    fetch(`http://localhost:3000/models/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch model.");
        return res.json();
      })
      .then((data) => {
        setModel(data.result || {});
        console.log("Model details API called!");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching model details:", err);
        setLoading(false);
        showToast("Could not load model details.", "error");
      });
  }, [id, user.accessToken]);

  useEffect(() => {
    // useEffect only runs once on component mount (since refetch is removed)
    fetchModelDetails();
  }, [fetchModelDetails]);

  const handleDlete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setIsModalOpen(false);

    fetch(`http://localhost:3000/models/${model._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete model.");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        showToast("Model successfully deleted!", "success");
        navigate("/all-models");
      })
      .catch((err) => {
        console.error("Error deleting model:", err);
        showToast("Failed to delete model. See console for details.", "error");
      });
  };

  // The handleDownload function has been completely removed as requested.

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium text-indigo-600">
          Loading details...
        </div>
      </div>
    );
  }

  if (!model || Object.keys(model).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-medium text-red-600">Model not found.</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        title="Confirm Deletion"
        text="Are you sure you want to delete this course model? This action cannot be reverted."
      />

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

          <div className="flex flex-col justify-start space-y-4 w-full md:w-7/12">
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
              <Link
                to={`/update-model/${_id}`}
                className="py-3 px-8 rounded-full font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-lg text-lg"
              >
                Update Course
              </Link>

              <button
                onClick={handleDlete}
                className="py-3 px-8 rounded-full font-bold text-red-600 border-2 border-red-600 hover:bg-red-50 transition duration-150 text-lg"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>

        {/* --- Key Metrics and Description Section --- */}
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
                {students_enrolled.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">Students Enrolled</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-100">
              <p className="text-2xl font-bold text-pink-600">
                {duration_weeks} Weeks
              </p>
              <p className="text-sm text-gray-500 mt-1">Course Duration</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">
              Course Description
            </h2>
            <p className="text-gray-700 leading-loose text-base">
              {description}
            </p>
          </div>

          {/* <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">{course_id}</p>
            <p className="text-sm text-gray-500">{_id}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CouseDetails;

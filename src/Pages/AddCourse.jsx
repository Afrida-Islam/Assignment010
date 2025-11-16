import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const AddCourse = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image_link: e.target.image_link.value,
      price_usd: parseFloat(e.target.price_usd.value),
      duration_weeks: parseInt(e.target.duration_weeks.value, 10),
      isFeatured: e.target.isFeatured.checked,
      created_at: new Date(),
      downloads: 0,
      created_by: user ? user.email : "unknown",
    };

    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to add course.");
          });
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Successfully added the new course!");
        console.log("API Success:", data);

        navigate("/");
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error(`Error: ${err.message || "Could not add course."}`);
      });
  };

  return (
    <div className="card border border-orange-200 bg-orange-50 w-full max-w-lg mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-8 relative">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-orange-600">
          Add New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field (Replaces Name) */}
          <div>
            <label className="label font-semibold text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="input w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., Machine Learning with Python"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-semibold text-gray-700">
              Category
            </label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Business & Finance">Business & Finance</option>
              <option value="Creative Arts">Creative Arts</option>
              <option value="Marketing">Marketing</option>
              <option value="Music Production">Music Production</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="label font-semibold text-gray-700">
                Price (USD)
              </label>
              <input
                type="number"
                name="price_usd"
                required
                min="0"
                step="0.01"
                className="input w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="199.99"
              />
            </div>
            <div className="w-1/2">
              <label className="label font-semibold text-gray-700">
                Duration (Weeks)
              </label>
              <input
                type="number"
                name="duration_weeks"
                required
                min="1"
                className="input w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="16"
              />
            </div>
          </div>

          {/* Image URL Field (Renamed from thumbnail) */}
          <div>
            <label className="label font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="image_link"
              required
              className="input w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://example.com/course_image.jpg"
            />
          </div>

          <div>
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="5"
              className="textarea w-full rounded-xl border border-orange-300 p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 h-auto"
              placeholder="Provide a detailed description of the course content..."
            ></textarea>
          </div>

          {/* isFeatured Checkbox */}
          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <label
              htmlFor="isFeatured"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Mark as Featured Course
            </label>
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-8 py-3 rounded-xl text-lg font-bold bg-orange-500 hover:bg-orange-600 transition duration-150 shadow-lg"
          >
            Submit Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

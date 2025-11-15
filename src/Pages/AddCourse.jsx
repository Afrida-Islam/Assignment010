import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddCourse = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      created_at: new Date(),
      downloads: 0,
      created_by: user.email,
    };

    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully added!");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={""}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Vehicles">Data Science</option>
              <option value="Plants">Web Development</option>
              <option value="Foods">Graphic Design</option>
              <option value="Home & Living">Business & Finance</option>
              <option value="Characters">Creative Arts</option>
              <option value="Space">Marketing</option>
              <option value="Animals">Music Production</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="label font-medium">Image URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const data = useLoaderData();
  const model = data?.result;

  console.log("my this course: " + model);
  const { _id } = model || {};
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      image_link: e.target.image_link.value,
    };

    fetch(`http://localhost:3000/models/${_id}`, {
      // <-- ERROR: _id is not defined here
      method: "PUT",
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

        // navigate("/");
      })
      .catch((err) => {
        console.error("API Error:", err);
        toast.error(`Error: ${err.message || "Could not add course."}`);
      });
  };
  // if (!model) {
  //   return (
  //     <div className="text-center p-10">
  //       <h2 className="text-xl font-semibold text-red-600">
  //         Loading or Course Not Found...
  //       </h2>
  //       <p>Please check the route ID and server status.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              defaultValue={model?.title}
              name="title"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={model?.category}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
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

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={model?.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="image_link"
              defaultValue={model?.image_link}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;

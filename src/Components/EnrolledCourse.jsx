import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link,  } from "react-router-dom";
// Helper function placeholder (since it's not defined in the original snippet)
// Note: These functions are not used in the new minimal card design but are kept for completeness.
const handleEnrollment = () => {
  console.log("Enrollment logic called (placeholder)");
};
const handleUpdate = () => {
  console.log("Update logic called (placeholder)");
};

const EnrolledCourse = () => {
  
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(true);
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
  }, [user, id, refetch]);
  //   if (_id) {
  //     console.log("Fetching enrolled course details...");
  //     fetch(`http://localhost:3000/models/${_id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setModel(data.result);
  //         console.log("Enrolled course data fetched:", data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching enrolled course:", err);
  //         setLoading(false);
  //       });
  //   } else {
  //     console.log("ID is undefined, skipping fetch request.");
  //     setLoading(false); // Set loading to false if no ID to fetch
  //   }
  // }, [user, id, refetch]); // 'id' is a dependency, so useEffect will re-run when it changes
  const {
    title,
    rating,
    duration_weeks,
    image_link,
    price_usd,
  _id
  } = model;
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Enrolled Course Details...
      </div>
    );
  }

  // Custom Handler for the Uninstall button
  const handleUninstall = () => {
    
    console.log(`Attempting to uninstall course: ${title}`);
    alert(`Course "${title}" would be uninstalled here.`);
    
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Enrolled Course (List View)
      </h1>

      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100 last:border-b-0 shadow-lg rounded-lg">
        {/* Left Section: Icon, Name, Details */}
        <div className="flex items-center">
          {/* Icon/Image Placeholder (mimicking the grey box) */}
          <div className="w-12 h-12 shrink-0 bg-gray-200 rounded-md mr-4 overflow-hidden">
            {/* Using the actual image_link if available, otherwise gray box */}
            {image_link ? (
              <img
                src={image_link}
                alt={title || "Course image"}
                className="w-full h-full object-cover"
              />
            ) : (
              // Empty div for the placeholder color
              <div className="w-full h-full"></div>
            )}
          </div>

          {/* Course Details */}
          <div className="flex flex-col">
            {/* Main Title */}
            <span className="text-base font-semibold text-gray-800">
              {title}
            </span>

            {/* Statistics/Details (mimicking 'DM', '5', '258 MB' structure) */}
            <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
             
              <span className="flex items-center">
                <p className="text-2xl font-bold text-green-600">
                  ${price_usd}
                </p>
              </span>

              {/* Rating */}
              <span className="flex items-center">
                <span className="text-orange-500">⭐ {rating}</span>
              </span>

              
              <span className="text-gray-500">
                {duration_weeks ? `${duration_weeks} Weeks` : "N/A"}
              </span>
            </div>
          </div>
        </div>

       <div className="flex gap-2"> {/* Right Section: Uninstall Button */}
        <button
          onClick={handleUninstall}
          className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-full shadow-md transition-all duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 "
        >
          Uninstall
        </button>
         <Link to={`/update-course/${_id}`}>
                  <button
                    // onClick={() => handleLinkClick(true)}
                    className="flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-full shadow-md transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  >
                    {/* < className="w-4 h-4 mr-2" /> */}
                   Update
                  </button>
                </Link></div>

      </div>
    </div>
  );
};

export default EnrolledCourse;

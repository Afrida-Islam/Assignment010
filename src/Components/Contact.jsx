import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // হোম পেজে যাওয়ার জন্য
import Swal from "sweetalert2"; // সাকসেস মেসেজের জন্য

const Contact = () => {
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();

    // এখানে আপনি চাইলে আপনার API কল করতে পারেন

    // ১. সাকসেস মেসেজ দেখানো
    Swal.fire({
      title: "Success!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonColor: "#2DD4BF", // Teal color matching your button
    }).then((result) => {
      // ২. ওকে বাটনে ক্লিক করলে হোম পেজে নিয়ে যাবে
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
        <p className="text-gray-500 mt-2">
          Home / <span className="text-teal-500">Contact Us</span>
        </p>
      </div>

      {/* Main Contact Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Get In Touch */}
        <div className="md:w-1/3 bg-white p-8 md:border-r border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Get In Touch
          </h3>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Call Us At
                </p>
                <p className="text-gray-800 font-bold">00047858785</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Email US ON
                </p>
                <p className="text-gray-800 font-bold">demo123@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-full text-orange-500">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Find US
                </p>
                <p className="text-gray-800 font-bold">
                  6391 Elgin St. Celina, DE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8">
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows="6"
                placeholder="Type message"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-bold py-4 rounded-md transition-all shadow-md active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

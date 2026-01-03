import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Contact = () => {
  const navigate = useNavigate();

  const handleSendMessage = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Success!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonColor: "#f97316", // Orange-500
      background: document.documentElement.classList.contains("dark")
        ? "#1E293B"
        : "#FFFFFF",
      color: document.documentElement.classList.contains("dark")
        ? "#F8FAFC"
        : "#1E293B",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Let's Start a <span className="text-orange-500">Conversation</span>
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
          Have a question or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
              Contact Info
            </h3>

            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Call Us
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">
                    +1 (555) 000-8888
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Email Us
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">
                    support@studyflow.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-5 group">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Visit Us
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 font-bold">
                    123 Learning Ave, NY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <form
              onSubmit={handleSendMessage}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@example.com"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Share your thoughts..."
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none resize-none transition-all placeholder:text-slate-400"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="group w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

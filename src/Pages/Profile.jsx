import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
    }
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName,
          photoURL,
        });

        await currentUser.reload();
        alert("Profile updated successfully!");
        navigate("/");
      } catch (error) {
        alert("Error updating profile: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-orange-50 p-4">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 border border-gray-100">
          {/* Header */}
          <h2 className="text-2xl font-semibold text-orange-600 text-center mb-6">
            My Profile
          </h2>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={photoURL || "https://i.ibb.co/kg4C8QXM/download.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-green-200 mb-3"
            />
            <h3 className="text-lg font-medium text-gray-800">
              {displayName || "User"}
            </h3>
            <p className="text-sm text-gray-500">
              {currentUser ? currentUser.email : ""}
            </p>
          </div>

          {/* Update Form */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="text-orange-700 font-semibold mb-3">
              Update Profile
            </h4>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <p className="text-xs text-gray-500 mb-3">
              Updates immediately above upon successful save.
            </p>

            <button
              onClick={handleUpdateProfile}
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  UserPlus,
  LogOut,
  User,
  Menu,
  X,
  BookOpen, // For Courses
  LayoutDashboard, // For Dashboard (icon)
  PlusCircle, // For Add Course
  BookMarked, // For My Enrolled Course
  LibraryBig, // For My Added Course
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DiAtom } from "react-icons/di";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  // Removed isDashboardOpen state and dashboardRef as we are now showing all links directly
  const profileRef = useRef(null);

  // Effect to handle clicks outside the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check for Profile Dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      navigate("/logindata"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a user-friendly error message
    }
  };

  const dashboardLinks = [
    {
      name: "My Enrolled Courses",
      path: "/dashboard/enrolled-courses",
      icon: BookMarked,
    },
    {
      name: "Add Course",
      path: "/dashboard/add-course",
      icon: PlusCircle,
    },
    {
      name: "My Added Courses",
      path: "/dashboard/my-added-courses",
      icon: LibraryBig,
    },
  ];

  const handleLinkClick = (isMobile = false) => {
    if (isMobile) {
      setIsOpen(false);
    }
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1
          className="text-3xl font-extrabold text-orange-500 flex items-center cursor-pointer"
          onClick={() => navigate("/")} // Navigate to root on logo click
        >
          <DiAtom className="text-orange-500 mr-2 h-10 w-10" />
          SkillSet
        </h1>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-600">
          <Link
            to="/"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors cursor-pointer"
          >
            Home
          </Link>

          {/* If LOGGED OUT, show Courses link */}
          {!currentUser && (
            <Link
              to="/courses"
              onClick={() => handleLinkClick()}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Courses
            </Link>
          )}
          {!currentUser && (
            <Link
              to="/courses"
              onClick={() => handleLinkClick()}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Dashboard
            </Link>
          )}

          {currentUser &&
            dashboardLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick()}
                className="flex items-center hover:text-orange-600 transition-colors cursor-pointer"
              >
                <link.icon className="w-5 h-5 mr-1 text-orange-500" />
                {link.name}
              </Link>
            ))}
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            /* Logged In - Profile Dropdown */
            <div className="relative" ref={profileRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setProfileOpen(!isProfileOpen)}
              >
                <img
                  src={
                    currentUser?.photoURL ||
                    "https://i.ibb.co/kg4C8QXM/download.jpg"
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 transition-all duration-200">
                  <p className="block px-4 py-2 text-sm text-gray-700 font-semibold truncate border-b mb-1">
                    {currentUser.displayName || currentUser.email || "User"}
                  </p>
                  <Link
                    to="/profiledata"
                    onClick={() => handleLinkClick()}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 cursor-pointer"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>

                  <a
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In - Auth Buttons */
            <div className="hidden md:flex space-x-2">
              <Link to="/logindata">
                <button className="px-4 py-2 text-orange-700 font-medium border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </button>
              </Link>
              <Link to="/Registerdata">
                <button className="px-4 py-2 text-white font-medium bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-orange-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl pb-4 transition-all duration-300">
          <div className="flex flex-col space-y-2 px-4 pt-2">
            <Link
              to="/"
              onClick={() => handleLinkClick(true)}
              className="py-2 text-gray-700 hover:bg-orange-50 px-2 rounded-lg cursor-pointer flex items-center"
            >
              Home
            </Link>

            <Link
              to="/courses"
              onClick={() => handleLinkClick(true)}
              className="py-2 text-gray-700 hover:bg-orange-50 px-2 rounded-lg cursor-pointer flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </Link>
            <p className="px-2 pb-1 text-sm font-bold text-gray-500">
              Dashboard
            </p>
            {currentUser && (
              <>
                <div className="pt-2 border-t mt-2">
                  <p className="px-2 pb-1 text-sm font-bold text-gray-500">
                    Dashboard
                  </p>
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => handleLinkClick(true)}
                      className="flex items-center py-2 pl-6 text-gray-700 hover:bg-orange-50 rounded-lg cursor-pointer"
                    >
                      <link.icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </Link>
                  ))}
                </div>

                <Link
                  to="/profiledata"
                  onClick={() => handleLinkClick(true)}
                  className="flex items-center py-2 text-gray-700 hover:bg-orange-50 px-2 rounded-lg cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>

                <a
                  onClick={handleLogout}
                  className="flex items-center py-2 text-red-600 hover:bg-red-50 px-2 rounded-lg cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </>
            )}

            {!currentUser && (
              <div className="flex flex-col space-y-2 pt-4 border-t mt-4">
                <Link to="/logindata">
                  <button
                    onClick={() => handleLinkClick(true)}
                    className="w-full py-2 text-orange-700 border border-orange-500 hover:bg-orange-50 px-2 rounded-lg flex items-center justify-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </button>
                </Link>
                <Link to="/Registerdata">
                  <button
                    onClick={() => handleLinkClick(true)}
                    className="w-full py-2 text-white bg-orange-600 hover:bg-orange-700 px-2 rounded-lg flex items-center justify-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

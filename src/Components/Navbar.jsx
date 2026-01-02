import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import toast for notifications
import toast, { Toaster } from "react-hot-toast";
import {
  LogIn,
  UserPlus,
  LogOut,
  User,
  Menu,
  X,
  BookOpen,
  PlusCircle,
  BookMarked,
  LibraryBig,
  Newspaper,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DiAtom } from "react-icons/di";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  // 2. Updated handleLogout with Toast Logic
  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);

      // Show success toast with orange accent
      toast.success("Successfully logged out!", {
        icon: "👋",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const dashboardLinks = [
    {
      name: "My Enrolled Courses",
      path: "/enrolled-courses",
      icon: BookMarked,
    },
    { name: "Add Course", path: "/auth/login", icon: PlusCircle },
    { name: "My Added Courses", path: "/my-added-courses", icon: LibraryBig },
  ];

  const handleLinkClick = (isMobile = false) => {
    if (isMobile) setIsOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-950 shadow-lg transition-colors">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-3xl font-extrabold text-orange-500 flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <DiAtom className="text-orange-500 mr-2 h-10 w-10" />
          SkillSet
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 text-base font-medium text-gray-600 dark:text-gray-300">
          <Link
            to="/"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/blog"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            onClick={() => handleLinkClick()}
            className="hover:text-orange-600 transition-colors"
          >
            Privacy
          </Link>

          {currentUser &&
            dashboardLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => handleLinkClick()}
                className="flex items-center hover:text-orange-600 transition-colors text-sm"
              >
                <link.icon className="w-4 h-4 mr-1 text-orange-500" />
                {link.name}
              </Link>
            ))}
        </nav>

        {/* Right Side: Auth & Profile */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setProfileOpen(!isProfileOpen)}
              >
                <img
                  src={
                    currentUser?.photoURL ||
                    "https://i.ibb.co.com/QjMhM16S/download-10.jpg"
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-lg shadow-xl py-2 z-50 border border-gray-100 dark:border-gray-800">
                  <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold truncate border-b dark:border-gray-800 mb-1">
                    {currentUser.displayName || currentUser.email}
                  </p>
                  <Link
                    to="/profiledata"
                    onClick={() => handleLinkClick()}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <div className="flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300">
                    <span className="text-sm">Dark Mode</span>
                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      checked={theme === "dark"}
                      className="toggle toggle-orange appearance-none w-10 h-5 bg-gray-300 rounded-full checked:bg-orange-500 relative transition-all"
                    />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link to="/logindata">
                <button className="px-4 py-2 text-orange-700 font-medium border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center">
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </button>
              </Link>
              <Link to="/Register">
                <button className="px-4 py-2 text-white font-medium bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
                  <UserPlus className="w-4 h-4 mr-2" /> Register
                </button>
              </Link>
            </div>
          )}

          <button
            className="lg:hidden p-2 text-orange-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* ... Mobile Menu Logic stays the same ... */}
    </header>
  );
};

export default Navbar;

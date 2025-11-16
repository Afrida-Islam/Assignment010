import React, { useState, useEffect, useCallback } from "react";
// Import toast library
import { Toaster as ToastContainer } from "react-hot-toast"; // 👈 Add this import

import {
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from "firebase/auth";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  getDocs,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

import {
  auth as firebaseAuth,
  db as firestoreDb,
} from "../firebase/firebase.config";

const appId = "default-app-id";
const initialAuthToken = null;

const renderStars = (score) => {
  const fullStars = Math.floor(score);
  const stars = []; // Star SVG path

  const starPath =
    "M10.788 3.238l2.427 4.887 5.378.78.006.002c.489.07.697.63.354.98l-3.896 3.793.92 5.358c.08.468-.363.824-.77.633L12 18.528l-4.81 2.536c-.406.191-.85-.165-.77-.633l.92-5.358-3.896-3.793c-.343-.35-.135-.91.354-.98l5.378-.78.006-.002 2.427-4.887z";

  for (let i = 0; i < 5; i++) {
    const isFilled = i < fullStars;
    stars.push(
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFilled ? "currentColor" : "none"}
        stroke={isFilled ? "none" : "currentColor"}
        className={`w-4 h-4 transition-colors ${
          isFilled ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        <path fillRule="evenodd" d={starPath} clipRule="evenodd" />
      </svg>
    );
  }
  return stars;
};

const EnrolledCourseCard = ({ model, onUnenroll }) => {
  const {
    title,
    image_link,
    category,
    _id,
    duration_weeks,
    students_enrolled,
    rating,
    price_usd,
  } = model;

  const displayDuration = duration_weeks ? `${duration_weeks} weeks` : "N/A";
  const formattedPrice = price_usd ? price_usd.toFixed(2) : "N/A";

  const placeholderImage = `https://placehold.co/400x200/4F46E5/FFFFFF?text=${title
    .substring(0, 10)
    .replace(/\s/g, "+")}`;

  return (
    <div className="card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <figure className="h-48 overflow-hidden bg-gray-100">
        <img
          src={image_link}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-4 flex flex-col">
        <p className="text-sm text-gray-500 font-medium mb-1">
          {category || "Category"}
        </p>

        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3">
          {title}
        </h2>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {duration_weeks && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="font-medium text-gray-700">
                {displayDuration}
              </span>
            </div>
          )}

          {students_enrolled !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </span>

              <span className="font-medium text-gray-700">
                {students_enrolled.toLocaleString()} Students
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pb-3">
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(rating)}</div>

            <span className="text-sm font-semibold text-gray-800">
              {rating ? rating.toFixed(1) : "N/A"}
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-800">
              ${formattedPrice}
            </span>
          </div>
        </div>
        {/* Action Button (Unenroll) */}
        <div className="border-t border-gray-200 pt-3 mt-1">
          {_id && (
            <button
              onClick={() => onUnenroll(_id, title)}
              className="w-full inline-block text-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              Unenroll (Remove from list)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Enrollment Application Component
const EnnolledCourse = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Use the imported instances directly
  const db = firestoreDb;
  const authentication = firebaseAuth;

  // --- Define Global Variables needed for the component logic ---
  const appId = "default-app-id"; // Used in collectionPath
  const initialAuthToken = null; // Used in auth flow // --- Firebase Initialization and Authentication (Refactored) ---
  // ------------------------------------------------------------------

  useEffect(() => {
    // ❌ The entire previous try/catch block for initialization is removed.
    // We only keep the onAuthStateChanged listener, using the imported 'authentication'.

    const unsubscribe = onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setCurrentUser(user);
        setUserId(user.uid);
        setLoading(false);
        console.log("User signed in:", user.uid);
      } else {
        try {
          if (initialAuthToken) {
            await signInWithCustomToken(authentication, initialAuthToken);
          } else {
            await signInAnonymously(authentication);
          }
        } catch (e) {
          console.error("Auth sign-in failed:", e);
          setError("Authentication failed. Please check credentials.");
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array as 'authentication' is imported statically // --- Firestore Data Fetching (Filtered by Enrollment) ---

  useEffect(() => {
    if (!db || !userId) return; // 'db' is now the imported 'firestoreDb'

    const collectionPath = `/artifacts/${appId}/public/data/courses`;
    const coursesRef = collection(db, collectionPath); // Filter courses where the 'enrolled_users' array contains the current user's UID

    const q = query(
      coursesRef,
      where("enrolled_users", "array-contains", userId)
    );

    console.log(`Subscribing to enrolled courses for user: ${userId}`); // Real-time listener for user-specific courses

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const courses = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setEnrolledCourses(courses);
      },
      (e) => {
        console.error("Error fetching enrolled courses: ", e);
        setError("Failed to fetch enrolled courses data.");
      }
    );

    return () => unsubscribe();
  }, [db, userId]); // 'db' is safe to use here as it's the imported instance // --- Enrollment Handlers ---

  const handleUnenroll = useCallback(
    async (courseId, courseTitle) => {
      if (!db || !userId) return;

      console.log(
        `Attempting to unenroll user ${userId} from course: ${courseTitle}`
      );

      try {
        const docRef = doc(
          db,
          `/artifacts/${appId}/public/data/courses`,
          courseId
        ); // Atomically remove the user's ID from the 'enrolled_users' array

        await setDoc(
          docRef,
          {
            enrolled_users: arrayRemove(userId),
          },
          { merge: true }
        );

        console.log(`Successfully unenrolled from course ${courseId}.`);
      } catch (e) {
        console.error("Error unenrolling from course: ", e);
        setError("Failed to unenroll from the course.");
      }
    },
    [db, userId]
  ); // --- Mock Data Adder for Demonstration ---

  const enrollMockCourse = async () => {
    if (!db || !userId) return;

    try {
      const collectionPath = `/artifacts/${appId}/public/data/courses`;
      const coursesRef = collection(db, collectionPath); // 1. Get ALL courses (or a random selection)

      const snapshot = await getDocs(coursesRef);
      const allCourses = snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));

      if (allCourses.length === 0) {
        // If no courses exist, create a mock one first
        const mockCourse = {
          title: `New Global Course ${Math.floor(Math.random() * 100)}`,
          image_link:
            "https://placehold.co/400x200/5B21B6/FFFFFF?text=New+Course",
          category: "Tech",
          duration_weeks: 8,
          students_enrolled: 1500,
          rating: 4.6,
          price_usd: 49.99,
          owner: "global-admin", // Not owned by current user
          enrolled_users: [],
        };
        const newDocRef = doc(coursesRef);
        await setDoc(newDocRef, mockCourse); // Re-fetch the list to include the new course
        console.log(
          "No courses found. Created a new mock course. Please press 'Enroll Mock Course' again."
        );
        return;
      } // 2. Find a course the user is NOT already enrolled in

      const unEnrolledCourses = allCourses.filter(
        (c) => !c.enrolled_users || !c.enrolled_users.includes(userId)
      );

      const courseToEnroll =
        unEnrolledCourses[
          Math.floor(Math.random() * unEnrolledCourses.length)
        ] || allCourses[0]; // 3. Enroll the user using arrayUnion

      const docRef = doc(db, collectionPath, courseToEnroll._id);
      await setDoc(
        docRef,
        {
          enrolled_users: arrayUnion(userId),
        },
        { merge: true }
      );

      console.log(
        `User ${userId} enrolled in mock course: ${courseToEnroll.title}`
      );
    } catch (e) {
      console.error("Error enrolling mock course:", e);
      setError("Failed to enroll in a mock course. See console for details.");
    }
  }; // --- Render Logic ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-orange-600">
          Loading Enrollment Dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
        <div className="text-lg font-semibold text-red-700 border border-red-300 p-4 rounded-lg bg-white shadow-md">
          Error: {error}
        </div>
      </div>
    );
  }

  const userIdentifier = currentUser?.email || currentUser?.uid || "N/A";

  return (
    // Add ToastContainer here (from react-hot-toast)
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
        <header className="mb-8 p-4 bg-white rounded-xl shadow-md border-t-4 border-orange-600">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            My Course Enrollments
          </h1>

          <p className="text-lg text-gray-600">
            Viewing courses for:
            <span className="font-mono text-orange-700 break-all">
              {userIdentifier}
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Filtering data by 'enrolled\_users' field matching your User ID.
          </p>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={enrollMockCourse}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-150"
            >
              <svg
                className="w-5 h-5 mr-2 -ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Enroll Mock Course
            </button>
          </div>
        </header>

        <main>
          {enrolledCourses.length === 0 ? (
            <div className="text-center p-10 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700">
                Not Enrolled in Any Courses
              </h2>

              <p className="text-gray-500 mt-2">
                Use the "Enroll Mock Course" button to add yourself to a course
                for demonstration purposes.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrolledCourses.map((course) => (
                <EnrolledCourseCard
                  key={course._id}
                  model={course}
                  onUnenroll={handleUnenroll}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default EnnolledCourse;

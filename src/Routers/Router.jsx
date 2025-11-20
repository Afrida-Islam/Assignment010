import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import LogIn from "../Pages/Login";
import AllCourses from "../Components/AllCourses";
import CourseDetails from "../Pages/CourseDetails";
import MainLayout from "./layout/MainLayout";
import AddCourse from "../Pages/AddCourse";
import PrivateRoute from "../Routers/PrivateRoute";
import EnrolledCourse from "../Components/EnrolledCourse";
import UpdateCourse from "../Components/UpdataCourse";
import AddedCourse from "../Components/AddedCourses";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/profiledata",
        Component: Profile,
      },
      {
        path: "/Registerdata",
        Component: Register,
      },
      {
        path: "/logindata",
        Component: LogIn,
      },
      {
        path: "/courses",
        Component: AllCourses,
        loader: () => fetch("http://localhost:3000/models"),
      },
      {
        path: "/coursesdatails/:id",
        element: <CourseDetails />,
      },
      {
        path: "/auth/login",
        element: <AddCourse />,
      },
      {
        path: "/enrolled-courses",
        element: <EnrolledCourse />,
      },
      {
        path: "/my-added-courses",
        element: <AddedCourse />,
      },
      {
        path: "/update-course/:id",
        element: <UpdateCourse />,
        // FIX: The 'id' must be destructured from the 'params' object.
        loader: ({ params }) => {
          const { id } = params; // <-- This line destructures the ID from the URL
          return fetch(`http://localhost:3000/models/${id}`);
        },
      },
    ],
  },
]);

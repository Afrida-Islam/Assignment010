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
import Contact from "../Components/Contact";
import BlogPage from "../Components/blogPosts";
import PrivacyPage from "../Components/PrivacyPage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () =>
          fetch("https://assignment010serverside.vercel.app/courses"),
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/privacy",
        Component: PrivacyPage,
      },
      {
        path: "/profiledata",
        Component: Profile,
      },
      {
        path: "/Register",
        Component: Register,
      },
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/courses",
        Component: AllCourses,
        loader: () =>
          fetch("https://assignment010serverside.vercel.app/models"),
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

        loader: ({ params }) => {
          const { id } = params;
          return fetch(
            `https://assignment010serverside.vercel.app/models/${id}`
          );
        },
      },
    ],
  },
]);

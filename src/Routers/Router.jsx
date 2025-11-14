import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import LogIn from "../Pages/Login";
import AllModels from "../Components/AllModels";
import CourseDetails from "../Pages/CourseDetails";
import MainLayout from "./layout/MainLayout";
import AddCourse from "../Pages/AddCourse";
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
        Component: AllModels,
        loader: () => fetch("http://localhost:3000/models"),
      },
      {
        path: "/coursesdatails/:id",
        Component: CourseDetails,
        loader: () => fetch("http://localhost:3000/data"),
      },
      {
        path: "/dashboard/add-course",
        element: AddCourse,
      },
    ],
  },
]);

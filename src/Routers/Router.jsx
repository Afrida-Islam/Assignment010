import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import LogIn from "../Pages/Login";
// import Stepltem from "../Components/StepItem";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        path: "/profilepage",
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
      // {
      //   path: "/courses",
      //   Component: Stepltem,
      //   loader: () => fetch("http://localhost:5173/courses"),
      // },
    ],
  },
]);

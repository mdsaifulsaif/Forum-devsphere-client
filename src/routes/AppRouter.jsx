import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivetRouteUser from "../PrivetRouts/PrivetRouteforuser/PrivetRouteUser";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPost from "../pages/Dashboard/UserDashboard/AddPost";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/joinus",
        Component: Register,
      },
      {
        path: "/join",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouteUser>
        <DashboardLayout />
      </PrivetRouteUser>
    ),
    children: [
      {
        path: "/dashboard/addpost",
        element: <AddPost />,
      },
    ],
  },
]);

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <RouterProvider router={router} />
// );

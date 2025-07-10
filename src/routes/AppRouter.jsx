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
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
import MyPosts from "../pages/Dashboard/UserDashboard/MyPosts";
import AdminProfile from "../pages/Dashboard/AdminDashboard/AdminProfile";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers";
import PostDetails from "../pages/PostDetails";

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
      {
        path: "/post/:id",
        Component: PostDetails,
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
      {
        path: "/dashboard/My-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-posts",
        element: <MyPosts />,
      },
      {
        path: "/dashboard/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);

// const root = document.getElementById("root");

// ReactDOM.createRoot(root).render(
//   <RouterProvider router={router} />
// );

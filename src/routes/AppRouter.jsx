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
import MakeAnnouncement from "../pages/Dashboard/AdminDashboard/MakeAnnouncement";
import PostComments from "../pages/Dashboard/UserDashboard/PostComments";
import ReportedComments from "../pages/Dashboard/AdminDashboard/ReportedComments";
import Payment from "../pages/Payment/Payment";
import PrivateRouteAdmin from "../PrivetRouts/PrivetRoutesforAdmin/PrivateRouteAdmin";
import ForbiddenPage from "../Components/ForbiddenPage";
import DashboardRedirect from "../Components/DashboardRedirect";
import About from "../pages/About";

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
        path: "/about",
        element: <About />,
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
      {
        path: "/payment/:id",
        element: (
          <PrivetRouteUser>
            <Payment />
          </PrivetRouteUser>
        ),
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
        index: true,
        Component: DashboardRedirect,
      },
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
        path: "/dashboard/comments/:postId",
        element: <PostComments />,
      },

      {
        path: "/dashboard/admin-profile",
        // element: <AdminProfile />,
        element: (
          <PrivateRouteAdmin>
            <AdminProfile />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRouteAdmin>
            <ManageUsers />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "/dashboard/reported-comments",
        element: (
          <PrivateRouteAdmin>
            <ReportedComments />
          </PrivateRouteAdmin>
        ),
      },

      {
        path: "/dashboard/announcement",
        element: (
          <PrivateRouteAdmin>
            <MakeAnnouncement />
          </PrivateRouteAdmin>
        ),
      },
    ],
  },
  {
    path: "/forbidden",
    Component: ForbiddenPage,
  },
]);

import React, { use } from "react";
import { AuthContext } from "./../../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingPage from "../../Components/LoadingPage";

function PrivetRouteUser({ children }) {
  const location = useLocation();
  const { user, userLoadding } = use(AuthContext);

  if (userLoadding) {
    return <LoadingPage />;
  }

  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/join"></Navigate>;
}

export default PrivetRouteUser;

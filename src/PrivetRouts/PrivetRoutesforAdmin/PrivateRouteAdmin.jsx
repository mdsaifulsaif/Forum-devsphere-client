import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useUserRole from "../../Hooks/useUserRole";
import LoadingPage from "../../Components/LoadingPage";

const PrivateRouteAdmin = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default PrivateRouteAdmin;

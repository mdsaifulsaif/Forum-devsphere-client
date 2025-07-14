import { useNavigate } from "react-router";
import { useEffect } from "react";
import useUserRole from "../Hooks/useUserRole";
import LoadingPage from "./LoadingPage";

const DashboardRedirect = () => {
  const { role, isLoading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (role === "admin") {
        navigate("/dashboard/admin-profile");
      } else {
        navigate("/dashboard/my-profile");
      }
    }
  }, [isLoading, role, navigate]);

  if (isLoading) return <LoadingPage />;
  return null;
};

export default DashboardRedirect;

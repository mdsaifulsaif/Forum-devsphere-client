// src/hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import UseAxiosSecure from "./UseAxiosSecure";

const useUserRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: roleData = {}, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user.email}`);
      return res.data;
    },
  });

  const role = roleData?.role || "user"; // default fallback
  return { role, isLoading };
};

export default useUserRole;

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import LoadingPage from "../../../Components/LoadingPage";

let debounceTimer;

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ Debounce logic
  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setDebouncedSearch(searchText.trim());
    }, 500); // 500ms delay
  }, [searchText]);

  // ✅ Fetch Users based on debounced search
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${debouncedSearch}`);
      return res.data;
    },
  });

  // ✅ Toggle Admin/User Role
  const toggleRoleMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/toggle-role/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "User role changed successfully.", "success");
      queryClient.invalidateQueries(["users", debouncedSearch]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to change role.", "error");
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-[#129990] mb-4">Manage Users</h2>

      {/* 🔍 Live Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded text-sm">
          <thead>
            <tr className="bg-[#129990] text-white">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Membership</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    {user.isMember ? "Gold" : "Bronz"}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => toggleRoleMutation.mutate(user._id)}
                      className={`px-3 py-1 rounded text-white transition ${
                        user.role === "admin"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-[#129990] hover:bg-[#0e7f7f]"
                      }`}
                    >
                      {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

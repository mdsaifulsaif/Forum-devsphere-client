import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import LoadingPage from "../../../Components/LoadingPage";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  //  Fetch Users (with server-side search by username)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-by-search?search=${search}`);
      return res.data;
    },
  });

  //  Toggle Role Mutation (admin/user)
  const toggleRoleMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/toggle-role/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "User role changed successfully.", "success");
      queryClient.invalidateQueries(["users", search]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to change role.", "error");
    },
  });

  //  Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    setSearch(value);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-[#129990] mb-4">Manage Users</h2>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          name="search"
          placeholder="Search by username..."
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-[#129990] text-white px-4 py-2 rounded hover:bg-[#0e7f7f]"
        >
          Search
        </button>
      </form>

      {/* Users Table */}
      {isLoading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded">
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
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">{user.role}</td>
                  <td className="py-2 px-4">
                    {user.isMember ? "Gold" : "Free"}
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
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

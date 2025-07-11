import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { use } from "react";
import UseAxiosSecure from "./../../../Hooks/UseAxiosSecure";
import { AuthContext } from "./../../../context/AuthContext/AuthContext";

const COLORS = ["#129990", "#FF8042", "#FFBB28"];

const AdminProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  const { data: stats = {} } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tag = form.tag.value;
    if (!tag) return;

    const res = await axiosSecure.post("/tags", { tag });
    if (res.data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Tag added successfully!",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
          popup: "text-[#129990]",
        },
        buttonsStyling: false,
      });
      form.reset();
    }
  };

  const pieData = [
    { name: "Posts", value: stats.totalPosts || 0 },
    { name: "Comments", value: stats.totalComments || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Profile Info */}
      <div className="flex items-center gap-6 border p-4 rounded shadow-md">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-[#129990]">
            {user?.displayName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#129990]">
          Site Overview
        </h3>
        <PieChart width={350} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Add Tag Form */}
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#129990]">
          Add New Tag
        </h3>
        <form onSubmit={handleAddTag} className="flex gap-4">
          <input
            type="text"
            name="tag"
            required
            placeholder="Enter tag"
            className="border px-4 py-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-[#129990] text-white px-6 py-2 rounded hover:bg-[#0e7f7f]"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useContext } from "react";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  // ✅ Fetch user posts (latest first)
  const { data: posts = [] } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Fetch user data for badge
  const { isLoading, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <p>Badge login...</p>;
  }

  // ✅ Badge logic
  //   const badge = userInfo?.isMember ? "Gold" : "Bronze";

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {/* User Info */}
      <div className="flex items-center gap-4">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>

          {/* Badge */}
          <div className="mt-1 text-sm">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white ${
                userInfo.badge === "gold" ? "bg-yellow-500" : "bg-gray-400"
              }`}
            >
              {userInfo.badge} Badge
            </span>
          </div>
        </div>
      </div>

      {/* Latest 3 Posts */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-[#129990]">
          Your Recent Posts
        </h3>
        {posts.slice(0, 3).map((post) => (
          <div
            key={post._id}
            className="mb-3 border p-3 rounded hover:shadow transition"
          >
            <h4 className="text-md font-bold">{post.title}</h4>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-sm mt-1">Tags: {post.tags}</p>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-gray-500">
            You haven't posted anything yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

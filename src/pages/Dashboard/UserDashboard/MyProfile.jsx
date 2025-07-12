import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaUserCircle } from "react-icons/fa";
import LoadingPage from "../../../Components/LoadingPage";

const MyProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: userData = {}, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/postsbyuser?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (loading || userLoading || postsLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-5xl text-gray-400" />
        )}

        <div>
          <h2 className="text-xl font-bold text-[#129990]">
            {user?.displayName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>

          {/* Badge */}
          <div className="mt-1 text-sm">
            <span
              className={`inline-block px-3 py-1 rounded-full text-white ${
                userData?.isMember ? "bg-yellow-500" : "bg-gray-400"
              }`}
            >
              {userData?.isMember ? "Gold" : "Bronze"} Badge
            </span>
          </div>
        </div>
      </div>

      {/* Latest Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[#129990]">
          Your Recent Posts
        </h3>
        {posts.length > 0 ? (
          posts.slice(0, 3).map((post) => (
            <div
              key={post._id}
              className="mb-3 border p-3 rounded hover:shadow transition"
            >
              <h4 className="text-md font-bold">{post.title}</h4>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="text-sm mt-1">Tag: {post.tags}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            You haven't posted anything yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { useContext } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get my posts
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your post has been removed.", "success");
      queryClient.invalidateQueries(["myPosts"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete the post.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#129990",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto ">
      <h2 className="text-2xl font-bold text-[#129990] mb-6">My Posts</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You haven't posted anything yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full  rounded shadow text-sm">
            <thead className="bg-[#129990] text-white">
              <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2">Votes</th>
                <th className="p-2">Comments</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const voteCount = (post.upVote || 0) - (post.downVote || 0);
                return (
                  <tr key={post._id} className="border-t hover:bg-gray-50">
                    <td className="p-2 font-medium">{post.title}</td>
                    <td className="p-2 text-center">{voteCount}</td>
                    <td className="p-2 text-center">
                      <Link
                        to={`/comments/${post._id}`}
                        className="text-[#129990] underline hover:text-[#0f7f7f]"
                      >
                        View Comments
                      </Link>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPosts;

import React, { use, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegCommentDots, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import LoadingPage from "./LoadingPage";
import { AuthContext } from "./../context/AuthContext/AuthContext";

const AllPosts = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const postsPerPage = 5;

  // fetch paginated posts

  const { data: postsData = { posts: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["posts", sortBy, page],
    queryFn: async () => {
      const endpoint =
        sortBy === "popular" ? "/posts/popular" : "/posts/paginated";
      const res = await axiosSecure.get(endpoint, {
        params: { page, limit: 6 },
      });
      return res.data;
    },
  });

  const posts = postsData.posts || [];
  const totalPosts = postsData.total || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // fetch user's votes
  const { data: userVotes = [] } = useQuery({
    queryKey: ["userVotes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/votes/user/${user.email}`);
      return res.data;
    },
  });

  // vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({ postId, type }) => {
      return await axiosSecure.post("/votes", {
        userEmail: user.email,
        postId,
        type,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: data.updated ? "Vote Submitted!" : "Already Voted!",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries(["userVotes"]);
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error || "Vote failed. Try again!",
      });
    },
  });

  const handleVote = (postId, type) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required!",
        text: "Please login to vote on posts.",
      });
      return;
    }
    voteMutation.mutate({ postId, type });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#129990]">All Posts</h2>
        <button
          onClick={() =>
            setSortBy((prev) => (prev === "popular" ? "newest" : "popular"))
          }
          className="bg-[#129990] text-white px-4 py-2 rounded hover:bg-[#0e7f7f]"
        >
          Sort by {sortBy === "popular" ? "Newest" : "Popularity"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => {
          const {
            _id,
            authorName,
            authorImage,
            title,
            tags,
            createdAt,
            upVote = 0,
            downVote = 0,
            commentsCount = 0,
          } = post;

          const userVote = userVotes?.find((v) => v.postId === _id);

          return (
            <div
              key={_id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 border hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{authorName}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Title */}
              <Link to={`/post/${_id}`}>
                <h2 className="text-lg md:text-xl font-semibold text-[#129990] hover:underline">
                  {title}
                </h2>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-[#129990]/10 text-[#129990] px-3 py-1 rounded-full">
                  #{tags}
                </span>
              </div>

              {/* Footer: Vote + Comment */}
              <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      userVote?.type === "up"
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleVote(_id, "up")}
                  >
                    <FaArrowUp />
                    <span>{upVote}</span>
                  </div>

                  <div
                    className={`flex items-center gap-1 cursor-pointer ${
                      userVote?.type === "down"
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleVote(_id, "down")}
                  >
                    <FaArrowDown />
                    <span>{downVote}</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <FaRegCommentDots />
                    <span>{commentsCount}</span>
                  </div>
                </div>

                <Link
                  to={`/post/${_id}`}
                  className="text-[#129990] hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-[#129990] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;

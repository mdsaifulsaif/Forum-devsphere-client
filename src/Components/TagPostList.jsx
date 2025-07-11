import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import LoadingPage from "../Components/LoadingPage";

const TagPostList = ({ tag }) => {
  const axiosSecure = UseAxiosSecure();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["tagPosts", tag],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/tag/${tag}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="mt-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#129990] mb-4">
        Posts tagged with #{tag}
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found for this tag.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 shadow-md rounded border hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[#129990]">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500">
                by {post.authorName} |{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <Link
                to={`/post/${post._id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagPostList;

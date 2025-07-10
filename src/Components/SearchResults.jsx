import React from "react";
import { Link } from "react-router";

const SearchResults = ({ posts }) => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-[#129990]">
        Search Results
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-4 rounded shadow border hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-[#129990]">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600">Tags: #{post.tags}</p>
              <Link
                to={`/post/${post._id}`}
                className="text-sm text-[#129990] hover:underline"
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

export default SearchResults;

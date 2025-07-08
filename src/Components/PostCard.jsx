import React from "react";
import { FaRegCommentDots, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Link } from "react-router";

const PostCard = ({ post }) => {
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

  const voteScore = upVote - downVote;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 border hover:shadow-lg transition">
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
        {tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#129990]/10 text-[#129990] px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer: Votes & Comments */}
      <div className="flex justify-between items-center text-sm mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-green-600">
            <FaArrowUp />
            <span>{upVote}</span>
          </div>
          <div className="flex items-center gap-1 text-red-500">
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
};

export default PostCard;

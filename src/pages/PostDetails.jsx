// src/pages/PostDetails.jsx

import React, { useContext } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FacebookShareButton, FacebookIcon } from "react-share";
import Swal from "sweetalert2";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../context/AuthContext/AuthContext";
import LoadingPage from "../Components/LoadingPage";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const shareUrl = `${window.location.origin}/post/${id}`;

  // fetch post
  const { data: post, isLoading } = useQuery({
    queryKey: ["postDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  // vote mutation
  const voteMutation = useMutation({
    mutationFn: async (type) => {
      return await axiosSecure.post("/votes", {
        userEmail: user.email,
        postId: id,
        type,
      });
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Voted!",
        showConfirmButton: false,
        timer: 1200,
      });
      queryClient.invalidateQueries(["postDetails", id]);
    },
  });

  const handleVote = (type) => {
    if (!user) {
      Swal.fire("Login Required", "Please login to vote.", "warning");
      return;
    }
    voteMutation.mutate(type);
  };

  if (isLoading) return <LoadingPage />;

  const {
    authorImage,
    authorName,
    title,
    description,
    tags,
    createdAt,
    upVote,
    downVote,
  } = post || {};
  console.log(user);

  //   coment data send to backend
  const handleCommnet = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = e.target.comment.value;

    const commnetInfo = {
      postId: id,
      postTitle: title,
      commenterEmail: user.email,
      commenterName: user.displayName,
      userImage: user.photoURL,
      comment,
      createdAt: new Date(),
      reported: false,
      feedback: "",
      reportedBy: "",
      reportStatus: "pending",
    };

    try {
      const res = await axiosSecure.post("/comments", commnetInfo);

      if (res.data?.success) {
        Swal.fire({
          title: "Success!",
          text: res.data.message || "Comment has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
        form.reset();
      } else {
        // এমন কোনো কন্ডিশন যেটা success false পাঠায়
        throw new Error(res.data.message || "Unexpected error");
      }
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Already Commented!",
        text:
          err?.response?.data?.message ||
          err.message ||
          "You can't comment twice.",
      });
    }

    // console.log(comment);
    // try {
    //   await axiosSecure.post("/comments", commnetInfo);
    //   //   if (res) {
    //   //     //success message
    //   //     Swal.fire({
    //   //       title: "Success!",
    //   //       text: "Comment has been added successfully.",
    //   //       icon: "success",
    //   //       confirmButtonText: "OK",
    //   //       customClass: {
    //   //         confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
    //   //         popup: "text-[#129990]",
    //   //       },
    //   //       buttonsStyling: false,
    //   //     });
    //   //   }
    //   Swal.fire("Success", "Comment added successfully", "success");
    //   reset();
    // } catch (err) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Already Commented!",
    //     text: err?.response?.data?.message || "You can't comment twice.",
    //   });
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md my-5">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <img src={authorImage} className="w-12 h-12 rounded-full" alt="" />
        <div>
          <h4 className="text-lg font-semibold">{authorName}</h4>
          <p className="text-sm text-gray-500">
            Posted on: {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Title & Description */}
      <h2 className="text-2xl font-bold text-[#129990] mb-3">{title}</h2>
      <p className="text-gray-700 text-base">{description}</p>

      {/* Tags */}
      <div className="my-3">
        <span className="inline-block bg-[#129990]/10 text-[#129990] px-3 py-1 rounded-full">
          #{tags}
        </span>
      </div>

      {/* Vote + Share */}
      <div className="flex justify-between items-center mt-4 border-t pt-3">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleVote("up")}
            className="flex items-center gap-1 text-green-600"
          >
            <FaArrowUp /> {upVote}
          </button>
          <button
            onClick={() => handleVote("down")}
            className="flex items-center gap-1 text-red-500"
          >
            <FaArrowDown /> {downVote}
          </button>
        </div>
        <div className="flex gap-2">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {!user ? (
          <p className="text-sm text-red-500">Please login to comment.</p>
        ) : (
          <form onSubmit={handleCommnet} className="flex flex-col gap-2">
            <textarea
              name="comment"
              className="border p-2 rounded"
              placeholder="Write your comment..."
            ></textarea>
            <button className="bg-[#129990] text-white py-1 rounded">
              Submit
            </button>
          </form>
        )}
        {/* TODO: Add real comment list here */}
      </div>
    </div>
  );
};

export default PostDetails;

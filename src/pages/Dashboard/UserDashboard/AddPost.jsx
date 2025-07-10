import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import LoadingPage from "../../../Components/LoadingPage";
import { Link } from "react-router";

const AddPost = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch tags
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  // ✅ Fetch posts by user email
  const {
    isLoading,
    data: userPosts = [],
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/postsbyuser?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Fetch user info
  const { isLoading: userlod, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/usersbyemail?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isMember = !!userInfo.isMember;
  const postCount = userPosts.length;

  console.log("user info form databse", userInfo);

  // ✅ Post Submission
  const onSubmit = async (data) => {
    const postData = {
      ...data,
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:3000/posts", postData);

      if (res.data.insertedId) {
        // reset();
        await Swal.fire({
          icon: "success",
          title: "Post Added!",
          text: "Your post has been successfully submitted.",
          confirmButtonColor: "#129990",
        });

        queryClient.invalidateQueries(["posts", user?.email]); // 🔁 Refresh post count
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        confirmButtonColor: "#129990",
      });
    }
  };

  if (isLoading && userlod) {
    return <LoadingPage />;
  }

  // ✅ Limit check for non-member
  if (!isMember && postCount >= 5) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Post Limit Reached!
        </h2>
        <p className="mb-4">You can only post 5 times without membership.</p>
        <Link
          to={`/dashboard/payment/${userInfo._id}`}
          href="/membership"
          className="bg-[#129990] text-white px-5 py-2 rounded hover:bg-[#0e7f7f]"
        >
          Become a Member
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-[#129990] mb-6">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <input
          {...register("title", { required: true })}
          placeholder="Post Title"
          className="w-full border p-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">Title is required</p>
        )}

        {/* Description */}
        <textarea
          {...register("description", { required: true })}
          placeholder="Post Description"
          rows="4"
          className="w-full border p-2 rounded"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm">Description is required</p>
        )}

        {/* Tags */}
        <select
          {...register("tags", { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select a tag</option>
          {tags.map((tag, i) => (
            <option key={i} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tags && <p className="text-red-500 text-sm">Tag is required</p>}

        {/* Submit */}
        <input
          type="submit"
          value="Submit Post"
          className="bg-[#129990] text-white px-6 py-2 rounded cursor-pointer hover:bg-[#0f7f7f]"
        />
      </form>
    </div>
  );
};

export default AddPost;

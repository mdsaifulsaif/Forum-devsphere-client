import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import LoadingPage from "../../../Components/LoadingPage";

const AddPost = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch tags
  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  // Fetch user's post count
  const { isLoading: postLoading, data: userPosts = [] } = useQuery({
    queryKey: ["posts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/postsbyuser?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user info
  const { isLoading: userInfoLoading, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isMember = userInfo?.isMember || false;
  const postCount = userPosts.length;

  // Handle form submission
  const onSubmit = async (data) => {
    const postData = {
      title: data.title,
      description: data.description,
      tags: data.tags.value,
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/posts", postData);
      if (res.data.insertedId) {
        await Swal.fire({
          icon: "success",
          title: "Post Added!",
          text: "Your post has been successfully submitted.",
          confirmButtonColor: "#129990",
        });
        queryClient.invalidateQueries(["posts", user?.email]);
        reset();
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

  if (postLoading || userInfoLoading) return <LoadingPage />;

  // Block non-members after 5 posts
  if (!isMember && postCount >= 5) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-red-500 mb-4">
          Post Limit Reached!
        </h2>
        <p className="mb-4">You can only post 5 times without membership.</p>
        <Link
          to={`/payment/${userInfo._id}`}
          className="bg-[#129990] text-white px-5 py-2 rounded hover:bg-[#0e7f7f]"
        >
          Become a Member
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-[#129990] mb-6">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Author Photo URL */}
        <div>
          <input
            type="text"
            value={user?.photoURL || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Author Image URL"
          />
        </div>
        {/* Author Name */}
        <div>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Author Name"
          />
        </div>

        {/* Author Email */}
        <div>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Author Email"
          />
        </div>

        {/* Title */}
        <div>
          <input
            {...register("title", { required: true })}
            placeholder="Post Title"
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Post Description"
            rows="4"
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Tags - React Select */}
        <div>
          <Select
            options={tags.map((tag) => ({
              value: tag.name,
              label: tag.name,
            }))}
            onChange={(selected) => setValue("tags", selected)}
            placeholder="Select a tag"
            className="text-sm md:text-base"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">Tag selection is required</p>
          )}
        </div>

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

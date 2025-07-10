import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AddTag = () => {
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/tags", data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Tag added successfully!",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
        reset();
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to add tag",
        "error"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#129990]">Add New Tag</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Enter Tag Name"
          className="w-full border px-4 py-2 rounded outline-[#129990]"
        />
        <button
          type="submit"
          className="bg-[#129990] hover:bg-[#0e7f7f] text-white px-6 py-2 rounded"
        >
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default AddTag;

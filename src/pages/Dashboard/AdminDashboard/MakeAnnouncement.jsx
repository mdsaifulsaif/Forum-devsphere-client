import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";

import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

const MakeAnnouncement = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const announcementData = {
      ...data,
      authorName: user.displayName,
      authorImage: user.photoURL,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/announcements", announcementData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Announcement added successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "text-white bg-[#129990] px-4 py-2 rounded",
            popup: "text-[#129990]",
          },
          buttonsStyling: false,
        });
        reset();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add announcement!", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#129990] mb-4">
        Make Announcement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("title", { required: true })}
          placeholder="Enter announcement title"
          className="w-full px-4 py-2 border rounded outline-[#129990]"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Enter description"
          rows={5}
          className="w-full px-4 py-2 border rounded outline-[#129990]"
        ></textarea>

        <button
          type="submit"
          className="bg-[#129990] text-white px-6 py-2 rounded hover:bg-[#0e7f7f] transition"
        >
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;

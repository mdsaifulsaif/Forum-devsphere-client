import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import LoadingPage from "./LoadingPage";

const TagList = ({ onTagSelect }) => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: tags = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#129990]">Browse Tags</h2>
        <button
          onClick={refetch}
          className="text-sm text-[#129990] underline hover:text-[#0e7f7f]"
        >
          Refresh Tags
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => onTagSelect?.(tag.name)} // optional callback
            className="bg-[#129990]/10 text-[#129990] px-4 py-2 rounded-full hover:bg-[#129990]/20 transition"
          >
            #{tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;

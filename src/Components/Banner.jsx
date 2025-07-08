import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import bannerImg from "../assets/Images/banner.jpg";

const Banner = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [popularTags, setPopularTags] = useState([]);

  useEffect(() => {
    // optional: load from backend
    setPopularTags(["react", "mongodb", "authentication"]); // top 3 dummy popular tags
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search);
    }
  };

  const handleTagClick = (tag) => {
    setSearch(tag);
    onSearch(tag);
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[300px] md:h-[400px] flex items-center justify-center text-white relative"
      style={{
        backgroundImage: `url(${bannerImg})`, // adjust path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className="z-10 text-center px-4 max-w-2xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Explore Discussions, Tags & Ideas
        </h1>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex bg-white rounded overflow-hidden shadow-md"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tags..."
            className="flex-grow px-4 py-2 text-gray-700 outline-none"
          />
          <button
            type="submit"
            className="bg-[#129990] px-4 text-white flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-gray-300">Popular: </span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleTagClick(tag)}
              className="bg-[#129990] text-white px-3 py-1 rounded-full hover:bg-opacity-90 transition"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;

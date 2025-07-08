import React, { useEffect, useState } from "react";

const TagList = ({ onTagSelect }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Initially you can use static tags or fetch from backend
    fetch("https://your-server.com/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((err) => {
        console.error("Failed to load tags", err);
        setTags(["react", "node", "firebase", "mongodb", "auth", "dashboard"]); // fallback static
      });
  }, []);

  return (
    <div className="py-8 max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-4 text-[#129990]">Browse Tags</h2>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => onTagSelect(tag)}
            className="bg-[#129990]/10 text-[#129990] px-4 py-2 rounded-full hover:bg-[#129990]/20 transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;

import React from "react";
import Banner from "../Components/Banner";
import TagList from "../Components/TagList";
import PostCard from "../Components/PostCard";

const dummyPost = {
  _id: "abc123",
  authorName: "Md. Saiful Saif",
  authorImage: "https://i.ibb.co/album/default.png",
  title: "How to implement Firebase Auth in React?",
  tags: ["react", "firebase", "auth"],
  createdAt: "2025-07-06T10:00:00Z",
  upVote: 12,
  downVote: 2,
  commentsCount: 5,
};

function Home() {
  const handleTagSearch = (searchText) => {
    console.log("Searching for:", searchText);
    // 🔁 Call API with tag text
  };

  return (
    <div className="h-[800px]">
      <Banner onSearch={handleTagSearch} />
      <TagList onTagSelect={handleTagSearch} />
      <PostCard post={dummyPost} />
    </div>
  );
}

export default Home;

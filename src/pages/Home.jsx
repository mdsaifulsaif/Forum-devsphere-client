import React, { useState } from "react";
import Banner from "../components/Banner";
import AllPosts from "../Components/AllPosts";
import AnnouncementSection from "../Components/AnnouncementSection";
import TagList from "../Components/TagList";

const Home = () => {
  return (
    <div>
      <Banner />
      <TagList />
      <AnnouncementSection />
      <AllPosts />
    </div>
  );
};

export default Home;

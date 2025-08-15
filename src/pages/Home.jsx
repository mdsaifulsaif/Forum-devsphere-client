import React, { useState } from "react";
import Banner from "../components/Banner";
import AllPosts from "../Components/AllPosts";
import AnnouncementSection from "../Components/AnnouncementSection";
import TagList from "../Components/TagList";
import MembershipBenefits from "../Components/MembershipBenefits";
import JoinCommunityCTA from "./JoinCommunityCTA";

const Home = () => {
  return (
    <div>
      <Banner />
      <TagList />
      <AnnouncementSection />
      <AllPosts />
      <MembershipBenefits />
      <JoinCommunityCTA />
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import Banner from "../components/Banner";
// import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import AllPosts from "../Components/AllPosts";
import SearchResults from "../Components/SearchResults";
import AnnouncementSection from "../Components/AnnouncementSection";
import TagList from "../Components/TagList";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const Home = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // ✅ নতুন স্টেট

  // const handleSearch = async (searchTerm) => {
  //   if (!searchTerm.trim()) return;
  //   setSearching(true);
  //   setHasSearched(true); // ✅ সিগন্যাল দাও ইউজার সার্চ করেছে

  //   console.log("tag from form", searchTerm);

  //   try {
  //     const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
  //     console.log("Search result", res.data);
  //     setSearchResults(res.data);
  //   } catch (err) {
  //     console.error("Search failed", err);
  //     setSearchResults([]);
  //   } finally {
  //     setSearching(false); // ✅ Done searching
  //   }
  // };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setSearching(true);
    setHasSearched(true);

    console.log("Searching for:", searchTerm);

    try {
      const res = await axiosSecure.get(`/posts/search?tag=${searchTerm}`);
      console.log("Search result:", res.data);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      {/* Banner with search */}
      <Banner onSearch={handleSearch} />

      {/* Show search results if searched */}
      {hasSearched ? (
        <SearchResults posts={searchResults} loading={searching} />
      ) : (
        <AllPosts />
      )}

      {/* Tags and Announcements */}
      <TagList />
      <AnnouncementSection />
    </div>
  );
};

export default Home;

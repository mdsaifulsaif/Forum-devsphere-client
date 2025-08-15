import React, { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";

export default function TopContributors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const res = await fetch(
          "https://forum-server-psi.vercel.app/posts/popular?page=1&limit=3"
        );
        const data = await res.json();

        // Extract top authors
        const authorMap = {};
        data.posts.forEach((post) => {
          if (authorMap[post.authorName]) {
            authorMap[post.authorName].count += 1;
            authorMap[post.authorName].upVote += post.upVote || 0;
          } else {
            authorMap[post.authorName] = {
              name: post.authorName,
              image: post.authorImage,
              count: 1,
              upVote: post.upVote || 0,
            };
          }
        });

        const sortedAuthors = Object.values(authorMap).sort(
          (a, b) => b.upVote - a.upVote
        );
        setAuthors(sortedAuthors);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#129990]">
          🌟 Top Contributors
        </h2>
        <p className="text-gray-600 mt-3 text-lg sm:text-xl">
          Authors with the most popular posts and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {authors.map((author, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-16 h-16 rounded-full border-2 border-[#129990] mb-3 object-cover"
            />
            <h3 className="font-semibold text-gray-800 text-lg">
              {author.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {author.count} popular post{author.count > 1 ? "s" : ""}
            </p>
            <p className="text-green-600 text-sm mt-1 font-medium">
              Total Upvotes: {author.upVote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

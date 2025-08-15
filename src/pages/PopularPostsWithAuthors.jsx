import React, { useEffect, useState } from "react";
import LoadingPage from "../Components/LoadingPage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function TopContributors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const res = await fetch(
          "https://forum-server-psi.vercel.app/posts/popular?page=1&limit=10"
        );
        const data = await res.json();

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
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#129990]">
          🌟 Top Contributors
        </h2>
        <p className="text-gray-600 mt-3 text-lg sm:text-xl">
          Authors with the most popular posts and engagement.
        </p>
      </div>

      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 0.5s"
        transitionDuration={500}
        containerClass="max-w-6xl mx-auto"
        removeArrowOnDeviceType={[]}
        dotListClass="custom-dot-list-style"
        itemClass="px-2"
      >
        {authors.map((author, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center mx-2"
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
      </Carousel>
    </section>
  );
}

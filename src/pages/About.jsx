import { FaUsers, FaLightbulb, FaCode } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-white md:w-6xl mx-auto py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#129990] mb-4">
          About DevSphere
        </h2>
        <p className="text-gray-600  max-w-3xl mx-auto mb-12">
          DevSphere is a modern developer community where ideas, questions, and
          knowledge come together. Whether you’re a beginner learning your first
          framework or an experienced developer sharing insights, DevSphere is
          your space to connect, grow, and collaborate.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Community */}
        <div className="bg-gray-50  p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaUsers className="text-[#129990] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800  mb-2">
            Engaged Community
          </h3>
          <p className="text-gray-600 ">
            Collaborate with developers worldwide and exchange ideas that
            inspire growth.
          </p>
        </div>

        {/* Ideas */}
        <div className="bg-gray-50  p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaLightbulb className="text-[#129990] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800  mb-2">
            Share & Discover Ideas
          </h3>
          <p className="text-gray-600 ">
            Post your thoughts, explore trending tags, and discover new
            technologies.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-50  p-6 rounded-2xl shadow hover:shadow-lg transition">
          <FaCode className="text-[#129990] text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-800  mb-2">
            For All Tech Stacks
          </h3>
          <p className="text-gray-600 ">
            From JavaScript to backend frameworks, join discussions across
            diverse stacks.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router";
import { FaUsers } from "react-icons/fa";

export default function JoinCommunityCTA() {
  return (
    <section className="bg-[#129990] py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <FaUsers />
            Your ideas deserve a space to grow
          </h2>
          <p className="text-white/90 mt-3 text-lg">
            Join DevSphere today and start connecting, sharing, and growing with
            developers worldwide.
          </p>
        </div>

        {/* Sign Up Button */}
        <Link
          to="/joinus"
          className="bg-white text-[#129990] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Join Now
        </Link>
      </div>
    </section>
  );
}

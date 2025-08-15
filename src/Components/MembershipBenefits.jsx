import {
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
// import { AuthContext } from "../AuthContext/AuthContextProvider";
// Adjust path if needed
import { Link } from "react-router";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { AuthContext } from "../context/AuthContext/AuthContext";

export default function MembershipBenefits() {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure;

  // Fetch user info
  const { isLoading: userlod, data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersbyemail?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (userlod) {
    return <p className="text-center text-gray-500 py-10">Loading...</p>;
  }

  return (
    <section className="bg-white py-20 px-6">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold text-[#129990]">
          Membership Benefits
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Whether you’re here to learn, share, or connect, DevSphere offers
          plans that fit your goals.
        </p>
      </div>

      {/* Membership Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <FaUsers className="text-3xl text-[#129990]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Free Membership
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Ideal for newcomers to explore discussions, learn from others, and
            start contributing.
          </p>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Access to all public discussions
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Post up to <span className="font-semibold">
                5 discussions
              </span>{" "}
              per month
            </li>
            <li className="flex items-start">
              <FaTimesCircle className="text-red-500 mt-1 mr-2" />
              No exclusive badges or rewards
            </li>
            <li className="flex items-start">
              <FaTimesCircle className="text-red-500 mt-1 mr-2" />
              Limited resource access
            </li>
          </ul>
        </div>

        {/* Gold Plan */}
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-8 border-2 border-[#129990] relative">
          <div className="absolute top-4 right-4 bg-[#129990] text-white px-4 py-1 rounded-full flex items-center text-sm">
            <FaCrown className="mr-1" /> Gold
          </div>
          <div className="flex items-center gap-3 mb-6">
            <FaStar className="text-3xl text-[#129990]" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Gold Membership
            </h3>
          </div>
          <p className="text-gray-600 mb-6">
            Perfect for active members who want unlimited opportunities,
            exclusive perks, and recognition.
          </p>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Unlimited post creation
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Earn <span className="font-semibold">exclusive badges</span> &
              profile highlights
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Access premium guides & resources
            </li>
            <li className="flex items-start">
              <FaCheckCircle className="text-[#129990] mt-1 mr-2" />
              Priority support from moderators
            </li>
          </ul>

          {/* Upgrade Button */}
          <Link
            to={`/payment/${userInfo?._id}`}
            className="mt-8 block text-center bg-[#129990] hover:bg-[#0f837f] text-white font-semibold py-3 rounded-lg transition"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </section>
  );
}

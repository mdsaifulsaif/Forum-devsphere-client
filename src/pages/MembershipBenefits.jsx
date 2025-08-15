import { FaCheckCircle, FaTimesCircle, FaCrown } from "react-icons/fa";

export default function MembershipBenefits() {
  return (
    <section className="bg-white   px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#129990]">
          Membership Benefits
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Choose the plan that works best for you and unlock exclusive features.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Free Membership
          </h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Access to public discussions
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Post up to 5 discussions per month
            </li>
            <li className="flex items-center">
              <FaTimesCircle className="text-red-500 mr-2" />
              No exclusive badges
            </li>
            <li className="flex items-center">
              <FaTimesCircle className="text-red-500 mr-2" />
              Limited resources access
            </li>
          </ul>
        </div>

        {/* Gold Plan */}
        <div className="border-2 border-[#129990] rounded-2xl shadow-xl p-6 bg-white dark:bg-gray-800 relative">
          <div className="absolute top-4 right-4 bg-[#129990] text-white px-3 py-1 rounded-full flex items-center">
            <FaCrown className="mr-1" /> Gold
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Gold Membership
          </h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Unlimited post creation
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Exclusive badges & recognition
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Access to premium resources
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-[#129990] mr-2" />
              Priority community support
            </li>
          </ul>
          <button className="mt-6 w-full bg-[#129990] hover:bg-[#0f837f] text-white font-semibold py-3 rounded-lg transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </section>
  );
}

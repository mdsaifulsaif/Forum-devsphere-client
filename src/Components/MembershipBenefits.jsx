import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const MembershipBenefits = () => {
  const features = [
    "📌 Post unlimited questions (no limit like 5 posts)",
    "🚀 Higher visibility of your posts",
    "💬 Priority support and responses",
    "⭐ Special member badge on your profile",
    "📈 Your posts will appear higher in listings",
    "🔓 Access to member-only discussions",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-[#129990] mb-4">
        🔥 Member Benefits
      </h2>
      <ul className="space-y-3 text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <FaCheckCircle className="text-[#129990] mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembershipBenefits;

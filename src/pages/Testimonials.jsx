import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mahamud Hasan",
      role: "Full Stack Developer",
      img: "https://i.pravatar.cc/100?img=1",
      quote:
        "DevSphere has been a game-changer for me. The community is friendly, and I’ve learned so much from the shared discussions.",
    },
    {
      id: 2,
      name: "Sarah Henry",
      role: "Frontend Engineer",
      img: "https://i.pravatar.cc/100?img=2",
      quote:
        "The tagging system makes it so easy to find relevant topics. Plus, the membership perks are totally worth it!",
    },
    {
      id: 3,
      name: "Sneha Roy",
      role: "Backend Developer",
      img: "https://i.pravatar.cc/100?img=3",
      quote:
        "I’ve met so many like-minded developers here. It feels like a professional family where everyone helps each other grow.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#129990]">
          Community Voices
        </h2>
        <p className="text-gray-600 mt-3 text-base sm:text-lg">
          Hear from our members about their experiences with DevSphere.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
          >
            <FaQuoteLeft className="text-[#129990] text-3xl mb-4" />
            <p className="text-gray-600 mb-6 italic text-sm sm:text-base">
              "{t.quote}"
            </p>
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full border-2 border-[#129990] mb-3 object-cover"
            />
            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
              {t.name}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

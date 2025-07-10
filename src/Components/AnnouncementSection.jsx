import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const AnnouncementSection = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (!announcements.length) return null; // No announcement, don't show

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-[#129990]/5 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-[#129990]">
        📢 Announcements
      </h2>
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="bg-white p-4 border-l-4 border-[#129990] rounded shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={a.authorImage}
                alt={a.authorName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{a.authorName}</p>
                <p className="text-xs text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#129990]">{a.title}</h3>
            <p className="text-gray-700">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementSection;

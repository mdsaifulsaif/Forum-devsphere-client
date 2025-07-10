import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";

const NotificationIcon = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: countData = { count: 0 } } = useQuery({
    queryKey: ["announcementCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements/count");
      return res.data;
    },
  });

  return (
    <div className="relative cursor-pointer">
      <FaBell className="text-xl text-gray-600 hover:text-[#129990]" />
      {countData.count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {countData.count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;

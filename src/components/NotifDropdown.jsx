import React from "react";
import {
  BellRing,
  PackageCheck,
  BadgePercent,
  TriangleAlert,
} from "lucide-react";

const NotifDropdown = () => {
  const notifications = [
    {
      icon: <PackageCheck size={16} />,
      title: "Pesanan Berhasil",
      desc: "Pesanan Donat Gula sedang diproses.",
      time: "Baru saja",
    },
    {
      icon: <BadgePercent size={16} />,
      title: "Promo Hari Ini",
      desc: "Diskon makanan hingga 50% tersedia.",
      time: "5 menit lalu",
    },
    {
      icon: <TriangleAlert size={16} />,
      title: "Menu Hampir Expired",
      desc: "3 menu wajib diselamatkan malam ini.",
      time: "12 menit lalu",
    },
  ];

  return (
    <div className="absolute top-16 right-0 w-80 bg-white rounded-[28px] shadow-2xl p-5 border border-gray-100 z-50 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BellRing className="text-[#63714e]" size={18} />
          <h3 className="font-black text-[#63714e]">Pemberitahuan</h3>
        </div>

        <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
          3 Baru
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="bg-[#f7f8ef] rounded-2xl p-3 shadow-sm hover:bg-[#eef1e2] transition-all duration-300"
          >
            <div className="flex items-center gap-2 text-[#63714e] font-bold text-sm mb-1">
              {item.icon}
              {item.title}
            </div>

            <p className="text-xs text-[#63714e]/70">{item.desc}</p>
            <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifDropdown;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  ShoppingBag,
  MessageCircle,
  User,
} from "lucide-react";
import userAvatar from "../assets/Rectangle.png";

const SideBar = ({ activePage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      route: "/dashboard",
    },
    { id: "menu", icon: ShoppingBag, label: "List Menu", route: "/menu" },
    { id: "pesan", icon: MessageCircle, label: "Pesan", route: "/pesan" },
    { id: "profil", icon: User, label: "Profil", route: "/profil" },
  ];

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative h-[750px] bg-[#63714e]/90 backdrop-blur-md rounded-[40px] flex flex-col z-50 shadow-2xl transition-all duration-300 ease-in-out border border-white/10 ${
        isHovered ? "w-60 px-3" : "w-20 px-0"
      }`}
    >
      {/* USER */}
      <div
        className={`flex items-center mt-10 mb-12 transition-all duration-300 ${
          isHovered
            ? "bg-[#f8bc22] rounded-full py-2.5 px-4 mx-2"
            : "justify-center"
        }`}
      >
        <img
          src={userAvatar}
          alt="User"
          className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
        />
        {isHovered && (
          <span className="ml-3 font-bold text-white text-sm whitespace-nowrap">
            Klp 09 PPL
          </span>
        )}
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={`flex items-center h-20 transition-all duration-300 ${
                isHovered ? "px-4 rounded-full mx-1" : "justify-center"
              } ${
                isActive
                  ? "bg-[#f8bc22] shadow-lg scale-110"
                  : "hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-center w-10">
                <Icon
                  size={24}
                  className={isActive ? "text-[#63714e]" : "text-white"}
                />
              </div>

              {isHovered && (
                <span
                  className={`ml-3 font-bold text-sm ${
                    isActive ? "text-white" : "text-[#f8bc22]"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;

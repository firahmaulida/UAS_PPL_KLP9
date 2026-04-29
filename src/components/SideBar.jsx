import React, { useState } from "react";
import { LayoutDashboard, Home, ShoppingBag, MessageCircle, User } from "lucide-react";
import userAvatar from "../assets/Rectangle.png";
import { useNavigate } from "react-router-dom";

const SideBar = ({ activePage, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: "home", icon: Home, label: "Dashboard" },
    { id: "menu", icon: ShoppingBag, label: "List Menu" },
    { id: "pesan", icon: MessageCircle, label: "Pesan" },
    { id: "profil", icon: User, label: "Profil" },
  ];

  return (
    <nav 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Tinggi sidebar dibuat 580px agar terlihat panjang dan elegan seperti Figma
      className={`relative h-[750px] bg-[#63714e]/90 backdrop-blur-md rounded-[40px] flex flex-col z-50 shadow-2xl transition-all duration-300 ease-in-out border border-white/10 ${
        isHovered ? "w-60 px-3" : "w-20 px-0"
      }`}
    >
      <div className={`flex items-center mt-10 mb-12 transition-all duration-300 ${
        isHovered ? "bg-[#f8bc22] rounded-full py-2.5 px-4 mx-2" : "justify-center"
      }`}>
        <img src={userAvatar} alt="User" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" />
        {isHovered && <span className="ml-3 font-bold text-white text-sm whitespace-nowrap">Klp 09 PPL</span>}
      </div>

      <div className="flex flex-col gap-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id === "home" ? "/dashboard" : `/${item.id}`)}
              className={`flex items-center h-20 transition-all duration-300 ${
                isHovered ? "px-4" : "justify-center"
              }`}
            >
              {/* ICON WRAPPER */}
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
                  isActive ? "bg-[#f8bc22]" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-[#64714F]" : "text-white"}
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
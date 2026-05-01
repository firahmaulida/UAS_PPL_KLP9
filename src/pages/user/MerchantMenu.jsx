import React, { useState } from "react";
import { Bell, Search, MapPin, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import MenuDetailModal from "../../components/MenuDetailModal";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import food1 from "../../assets/chat1.png";
import food2 from "../../assets/chat2.png";
import food3 from "../../assets/chat3.png";

export const MerchantMenu = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [search, setSearch] = useState("");

  const merchantMenus = [
    {
      name: "Donat Gula",
      price: "Rp. 10.000 - Rp. 7.000",
      store: "PASTELERIA aAzicaR",
      expired: "Exp. 1 hari lagi",
      img: food2,
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 - Rp. 20.000",
      store: "PASTELERIA aAzicaR",
      expired: "Exp. 3 hari lagi",
      img: food3,
    },
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "PASTELERIA aAzicaR",
      expired: "Tak habis terjual",
      img: food1,
    },
    {
      name: "Donat Premium",
      price: "Rp. 15.000 - Rp. 8.000",
      store: "PASTELERIA aAzicaR",
      expired: "Exp. malam ini",
      img: food2,
    },
  ];

  const filtered = merchantMenus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#eef7e8]">
      <div className="fixed inset-0 z-0 flex">
        <img src={bgUtama} alt="" className="w-1/2 h-full object-cover opacity-70" />
        <img src={bgUtama} alt="" className="w-1/2 h-full object-cover opacity-60" />
      </div>

      {/* LOGO */}
      <div className="absolute top-6 left-12 z-20 px-7 py-3 bg-[#63714ed9] rounded-3xl shadow-xl">
        <h1 className="text-2xl font-black italic text-white">
          Food <span className="text-[#f8bc22]">Waste</span>
        </h1>
      </div>

      {/* TOP */}
      <div className="absolute top-6 right-12 flex items-center gap-5 z-20">
        <div className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center">
          <Bell className="text-[#63714e]" size={20} />
        </div>
        <img src={userProfil} alt="" className="w-12 h-12 rounded-full" />
      </div>

      <div className="absolute top-24 left-12 right-12 bottom-8 flex gap-8 z-10">
        <SideBar activePage="menu" />

        <section className="flex-1 overflow-y-auto space-y-5">
          {/* BACK */}
          <button
            onClick={() => navigate("/dashboarduser")}
            className="flex items-center gap-2 border border-[#63714e] px-5 py-2 rounded-full text-[#63714e] font-semibold hover:bg-[#63714e] hover:text-white transition-all"
          >
            <ArrowLeft size={16} /> Kembali
          </button>

          {/* MERCHANT HEADER */}
          <div className="bg-white/75 rounded-[34px] shadow-2xl p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-[#63714e]">PASTELERIA aAzicaR</h2>
                <p className="text-[#63714e]/70 mt-1">Bakery Food Waste Premium Partner</p>

                <div className="mt-3 space-y-1 text-sm text-[#63714e]">
                  <p className="flex items-center gap-2"><MapPin size={14}/> Jl. Lamgugop, Banda Aceh</p>
                  <p className="flex items-center gap-2"><Star size={14}/> Rating 4.8 • 124 ulasan</p>
                </div>
              </div>

              <div className="bg-[#f8bc22]/20 px-6 py-4 rounded-3xl text-center">
                <h3 className="text-3xl font-black text-[#63714e]">12+</h3>
                <p className="text-sm text-[#63714e]">Menu Rescue</p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="bg-white/80 rounded-full px-6 py-4 shadow-lg flex items-center gap-3">
            <input
              type="text"
              placeholder="Cari menu merchant ini..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-[#63714e]"
            />
            <Search size={20} className="text-[#63714e]" />
          </div>

          {/* MENU GRID */}
          <div className="bg-white/70 rounded-[34px] shadow-2xl p-6">
            <h3 className="text-2xl font-black text-[#63714e] mb-5">Semua Menu Merchant</h3>

            <div className="grid grid-cols-4 gap-4">
              {filtered.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[26px] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-3"
                >
                  <img src={item.img} alt="" className="w-full h-32 object-cover rounded-2xl" />

                  <h4 className="mt-3 font-bold text-[#63714e]">{item.name}</h4>
                  <p className="text-sm">{item.price}</p>
                  <p className="text-xs text-red-500">{item.expired}</p>
                  <p className="text-xs text-gray-500">{item.store}</p>

                  <button
                    onClick={() => setSelectedMenu(item)}
                    className="mt-3 w-full bg-[#f8bc22] text-white py-2 rounded-full text-sm font-bold"
                  >
                    Pesan Menu
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {selectedMenu && (
        <MenuDetailModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} />
      )}
    </main>
  );
};
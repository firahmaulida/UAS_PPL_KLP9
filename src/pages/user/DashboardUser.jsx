import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  MapPin,
  Package,
  Store,
  Wallet,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import MenuDetailModal from "../../components/MenuDetailModal";
import NotifDropdown from "../../components/NotifDropdown";
import StoreDetailModal from "../../components/StoreDetailModal";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import food1 from "../../assets/chat1.png";
import food2 from "../../assets/chat2.png";
import food3 from "../../assets/chat3.png";
import kiri from "../../assets/kiri.png";
import kanan from "../../assets/kanan.png";

export const DashboardUser = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showStore, setShowStore] = useState(false);

  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menus = [
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Buko",
      expired: "Tak habis terjual",
      img: food1,
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 - Rp. 7.000",
      store: "Bakery Bu Wani",
      expired: "Exp. 1 hari lagi",
      img: food2,
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 - Rp. 20.000",
      store: "Toko Roti Bersama",
      expired: "Exp. 3 hari lagi",
      img: food3,
    },
    {
      name: "Soto Ayam",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "RM Pak Bako",
      expired: "Tak habis terjual",
      img: food2,
    },
    {
      name: "Nasi Goreng",
      price: "Rp. 22.000 - Rp. 15.000",
      store: "Warung Mak Nyak",
      expired: "Exp. malam ini",
      img: food1,
    },
    {
      name: "Roti Sobek",
      price: "Rp. 18.000 - Rp. 9.000",
      store: "Bakery Family",
      expired: "Exp. besok pagi",
      img: food3,
    },
  ];

  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#eef7e8] font-sans">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 flex pointer-events-none">
        <img src={bgUtama} alt="" className="w-1/2 h-full object-cover opacity-75" />
        <img src={bgUtama} alt="" className="w-1/2 h-full object-cover opacity-60" />
      </div>

      {/* LOGO */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed9] rounded-[22px] shadow-xl">
          <h1 className="text-2xl font-black italic text-white">
            Food <span className="text-[#f8bc22]">Waste</span>
          </h1>
        </div>
      </header>

      {/* TOP RIGHT */}
      <div className="absolute top-6 right-12 flex items-center gap-5 z-30">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg text-[#63714e]"
          >
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {showNotif && <NotifDropdown />}
        </div>

        <img src={userProfil} alt="" className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* LAYOUT */}
      <div className="absolute top-24 left-12 right-12 bottom-8 flex gap-8 z-10">
        <SideBar activePage="home" />

        <section className="flex-1 overflow-y-auto pr-2 space-y-5">
          {/* SEARCH */}
          <div className="bg-white/80 rounded-full px-6 py-4 shadow-lg backdrop-blur-xl flex items-center gap-3">
            <input
              type="text"
              placeholder="Cari makanan favoritmu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-[#63714e]"
            />
            <Search className="text-[#63714e]" size={20} />
          </div>

          {/* HERO */}
          <div className="relative bg-white/70 rounded-[34px] shadow-2xl overflow-hidden px-10 py-8 text-center">
            <img src={kiri} alt="" className="absolute left-0 top-0 h-full w-40 object-cover" />
            <img src={kanan} alt="" className="absolute right-0 top-0 h-full w-40 object-cover" />

            <h2 className="relative z-10 text-3xl font-black text-[#63714e]">
              Jadilah Pahlawan Makanan!
            </h2>
            <p className="relative z-10 text-[#63714e]/70 mt-2">
              Selamatkan hidangan lezat dan bantu kurangi limbah makanan hari ini.
            </p>

            <button
              onClick={() => navigate("/menu")}
              className="relative z-10 mt-5 bg-[#f8bc22] hover:scale-105 transition-all text-white font-bold px-10 py-2 rounded-full"
            >
              Mulai Menjelajah Menu
            </button>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Package, label: "Menu Hari Ini", value: "128+" },
              { icon: ShoppingBag, label: "Pesanan Saya", value: "03" },
              { icon: Store, label: "Toko Mitra", value: "14" },
              { icon: Wallet, label: "Total Hemat", value: "Rp43k" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-white/75 rounded-[28px] shadow-lg p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f8bc22] flex items-center justify-center text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#63714e] text-xl">{item.value}</h4>
                    <p className="text-sm text-[#63714e]/70">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-[3fr_1fr] gap-5">
            {/* MENU LIST */}
            <div className="bg-white/70 rounded-[34px] shadow-2xl p-6">
              <h3 className="text-2xl font-black text-[#63714e] mb-5">
                Penyelamat Makanan Hari Ini
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {filteredMenus.map((item, index) => (
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

            {/* RIGHT PANEL */}
            <div className="space-y-5">
              {/* TOKO */}
              <div className="bg-white/75 rounded-[30px] shadow-xl p-5">
                <h3 className="text-xl font-black text-[#63714e] mb-4">Cari Toko Sekitar</h3>

                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <img src={food2} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-[#63714e]">PASTELERIA aAzicaR</p>
                      <p className="text-[11px] flex items-center gap-1">
                        <MapPin size={10} /> Lamgugop
                      </p>
                      <button
                        onClick={() => setShowStore(true)}
                        className="mt-1 bg-[#f8bc22] text-white px-3 py-1 rounded-full text-[10px]"
                      >
                        lihat toko
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* AKTIVITAS */}
              <div className="bg-white/75 rounded-[30px] shadow-xl p-5">
                <h3 className="text-xl font-black text-[#63714e] mb-4">Aktivitas Terbaru</h3>

                {[
                  "Pesanan Donat Gula berhasil diproses",
                  "Kamu menghemat Rp13.000 hari ini",
                  "2 menu baru ditambahkan di sekitar kamu",
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-2 mb-3 bg-[#f7f8ef] rounded-2xl p-3">
                    <Clock3 size={14} className="text-[#63714e] mt-1" />
                    <p className="text-xs text-[#63714e]">{act}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODALS */}
      {selectedMenu && (
        <MenuDetailModal menu={selectedMenu} onClose={() => setSelectedMenu(null)} />
      )}

      {showStore && <StoreDetailModal onClose={() => setShowStore(false)} />}
    </main>
  );
};
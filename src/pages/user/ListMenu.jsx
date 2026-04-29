import React, { useState } from "react";
import { Bell, Search } from "lucide-react";
import SideBar from "../../components/SideBar";
import MenuDetailModal from "../../components/MenuDetailModal";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import food1 from "../../assets/chat1.png";

export const ListMenu = () => {
  const [search, setSearch] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);

  const menus = [
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Menu Tak Habis Terjual",
      img: food1,
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 - Rp. 20.000",
      store: "Toko Roti Bersama",
      expired: "Exp. 3 hari lagi",
      img: food1,
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 - Rp. 7.000",
      store: "Bakery bu wani",
      expired: "Exp. 1 hari lagi",
      img: food1,
    },
    {
      name: "Soto Ayam",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Menu Tak Habis Terjual",
      img: food1,
    },
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Menu Tak Habis Terjual",
      img: food1,
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 - Rp. 7.000",
      store: "Bakery bu wani",
      expired: "Exp. 1 hari lagi",
      img: food1,
    },
    {
      name: "Soto Ayam",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Menu Tak Habis Terjual",
      img: food1,
    },
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 - Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Menu Tak Habis Terjual",
      img: food1,
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 - Rp. 20.000",
      store: "Toko Roti Bersama",
      expired: "Exp. 3 hari lagi",
      img: food1,
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 - Rp. 7.000",
      store: "Bakery bu wani",
      expired: "Exp. 1 hari lagi",
      img: food1,
    },
  ];

  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img className="w-1/2 h-full object-cover opacity-80" src={bgUtama} alt="" />
        <img className="w-1/2 h-full object-cover opacity-60" src={bgUtama} alt="" />
      </div>

      {/* LOGO */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl">
          <h1 className="text-2xl font-black italic text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* TOP RIGHT */}
      <div className="absolute top-6 right-12 flex items-center gap-6 z-30">
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg text-[#63714e]">
          <Bell size={24} />
        </button>
        <img src={userProfil} alt="" className="w-12 h-12 rounded-full object-cover" />
      </div>

      {/* MAIN */}
      <div className="absolute top-24 left-12 right-12 bottom-10 flex gap-8 z-10">
        <SideBar activePage="menu" />

        <section className="flex-1 flex flex-col gap-5">
          {/* SEARCH */}
          <div className="bg-white/70 backdrop-blur-2xl rounded-full shadow-xl px-6 py-4 flex items-center gap-4">
            <input
              type="text"
              placeholder="Cari Makanan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-[#63714e]"
            />
            <Search className="text-[#63714e]" size={20} />
          </div>

          {/* CONTAINER MENU */}
          <div className="bg-white/55 backdrop-blur-2xl rounded-[35px] shadow-2xl p-8 flex-1 overflow-y-auto">
            <h3 className="text-2xl font-black text-[#63714e] mb-6">
              Penyelamat Makanan Hari ini
            </h3>

            <div className="grid grid-cols-5 gap-5">
              {filteredMenus.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-md p-3 hover:shadow-xl transition-all"
                >
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-28 rounded-2xl object-cover mb-3"
                  />

                  <h4 className="font-bold text-[#63714e] text-sm">{item.name}</h4>
                  <p className="text-sm">{item.price}</p>
                  <p className="text-[11px] text-red-500">{item.expired}</p>
                  <p className="text-[11px] text-gray-500">{item.store}</p>

                  <button
                    onClick={() => setSelectedMenu(item)}
                    className="mt-3 w-full bg-[#f8bc22] text-white py-1.5 rounded-full text-xs font-semibold"
                  >
                    Pesan Menu
                  </button>
                </div>
              ))}
            </div>

            {filteredMenus.length === 0 && (
              <p className="text-center text-[#63714e]/60 mt-10">
                Menu tidak ditemukan
              </p>
            )}
          </div>
        </section>
      </div>

      {selectedMenu && (
        <MenuDetailModal
          menu={selectedMenu}
          onClose={() => setSelectedMenu(null)}
        />
      )}
    </main>
  );
};
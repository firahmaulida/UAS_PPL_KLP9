import { useState } from "react";
import SideBar from "../../components/SideBar";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const menus = [
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 → Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Hampir expired",
      img: "https://source.unsplash.com/300x200/?chicken",
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 → Rp. 7.000",
      store: "Bakery Bu Wani",
      expired: "Expired 1 hari lagi",
      img: "https://source.unsplash.com/300x200/?donut",
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 → Rp. 20.000",
      store: "Toko Roti Bersama",
      expired: "Hampir expired",
      img: "https://source.unsplash.com/300x200/?brownies",
    },
    {
      name: "Soto Ayam",
      price: "Rp. 27.000 → Rp. 20.000",
      store: "Warung Bu Siti",
      expired: "Expired hari ini",
      img: "https://source.unsplash.com/300x200/?soup",
    },
  ];

  // 🔥 FILTER SEARCH
  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url("/src/assets/image.png")`,
      }}
    >
      {/* SIDEBAR */}
      <div className="ml-4 mt-6">
        <SideBar activePage="home" />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          {/* LOGO (KONSISTEN) */}
          <div className="bg-[#64714F] px-5 py-2 rounded-xl text-white font-bold text-lg">
            Food <span className="text-[#F8BC22]">Waste</span>
          </div>

          {/* 🔍 SEARCH AKTIF */}
          <input
            type="text"
            placeholder="Cari Makanan"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 p-2 rounded-full border outline-none"
          />

          {/* PROFILE */}
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        </div>

        {/* HERO */}
        <div className="relative bg-white/80 rounded-2xl p-8 mb-6 text-center overflow-hidden">
          <img
            src="/src/assets/image1.png"
            alt=""
            className="absolute left-0 top-0 h-full opacity-70"
          />
          <img
            src="/src/assets/image2.png"
            alt=""
            className="absolute right-0 top-0 h-full opacity-70"
          />

          <h2 className="text-2xl font-bold text-[#64714F]">
            Jadilah Pahlawan Makanan!
          </h2>
          <p className="text-[#64714F] mt-2">
            Selamatkan hidangan lezat dari limbah hari ini.
          </p>

          <button className="mt-4 bg-[#F8BC22] text-white px-6 py-2 rounded-full">
            Mulai menjelajah menu
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex gap-6">
          {/* MENU */}
          <div className="flex-1 bg-white/80 p-4 rounded-2xl">
            <h3 className="text-[#64714F] font-semibold mb-4">
              Penyelamat Makanan Hari ini
            </h3>

            <div className="flex gap-4 overflow-x-auto">
              {filteredMenus.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[220px] bg-white rounded-xl shadow p-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="rounded-lg mb-2"
                  />

                  <h4 className="text-sm font-semibold text-[#64714F]">
                    {item.name}
                  </h4>

                  <p className="text-xs text-gray-500">{item.price}</p>

                  <p className="text-xs text-red-500">{item.expired}</p>

                  <p className="text-xs text-[#64714F] mt-1">
                    {item.store}
                  </p>

                  <button className="mt-2 w-full bg-[#F8BC22] text-white py-1 rounded-full text-sm">
                    Pesan Menu
                  </button>
                </div>
              ))}
            </div>

            {/* 🔥 EMPTY STATE */}
            {filteredMenus.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                Menu tidak ditemukan
              </p>
            )}
          </div>

          {/* TOKO */}
          <div className="w-80 bg-white/80 p-4 rounded-2xl">
            <h3 className="text-[#64714F] font-semibold mb-4">
              Cari Toko Sekitar
            </h3>

            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg" />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#64714F]">
                    PASTELERIA AZIZCA
                  </p>
                  <p className="text-xs text-gray-500">Lampung</p>
                </div>

                <button className="bg-[#F8BC22] text-white px-2 py-1 rounded text-xs">
                  Lihat Toko
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
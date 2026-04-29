import { useState } from "react";
import SideBar from "../../components/SideBar";

export default function ListMenu() {
  const [search, setSearch] = useState("");

  const menus = [
    {
      name: "Chicken Teriyaki",
      price: "Rp. 27.000 → Rp. 20.000",
      store: "Rumah Makan Pak Bako",
      expired: "Hampir expired",
      status: "buka",
      img: "https://source.unsplash.com/300x200/?chicken",
    },
    {
      name: "Brownies Coklat",
      price: "Rp. 40.000 → Rp. 20.000",
      store: "Toko Roti Bersama",
      expired: "Exp 3 hari lagi",
      status: "buka",
      img: "https://source.unsplash.com/300x200/?brownies",
    },
    {
      name: "Donat Gula",
      price: "Rp. 10.000 → Rp. 7.000",
      store: "Bakery Bu Wani",
      expired: "Exp 1 hari lagi",
      status: "buka",
      img: "https://source.unsplash.com/300x200/?donut",
    },
    {
      name: "Soto Ayam",
      price: "Rp. 27.000 → Rp. 20.000",
      store: "Warung Bu Siti",
      expired: "Hampir expired",
      status: "tutup",
      img: "https://source.unsplash.com/300x200/?soup",
    },
  ];

  const filteredMenus = menus.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url("/src/assets/image.png")`, // 🔥 samakan dengan dashboard
      }}
    >
      {/* SIDEBAR */}
      <div className="ml-4 mt-6">
        <SideBar activePage="menu" />
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          {/* LOGO (SAMA DENGAN DASHBOARD) */}
          <div className="bg-[#64714F] px-5 py-2 rounded-xl text-white font-bold text-lg">
            Food <span className="text-[#F8BC22]">Waste</span>
          </div>

          {/* SEARCH */}
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

        {/* CONTENT */}
        <div className="bg-white/80 p-6 rounded-2xl">
          <h3 className="text-[#64714F] font-semibold mb-4">
            Semua Menu Tersedia
          </h3>

          {/* GRID RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMenus.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="rounded-lg mb-2 w-full h-32 object-cover"
                />

                <h4 className="text-sm font-semibold text-[#64714F]">
                  {item.name}
                </h4>

                <p className="text-xs text-gray-500">{item.price}</p>

                {/* STATUS */}
                <p
                  className={`text-xs font-medium ${
                    item.status === "buka"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status === "buka" ? "● Buka" : "● Tutup"}
                </p>

                {/* EXPIRED */}
                <p className="text-xs text-red-500">{item.expired}</p>

                {/* STORE */}
                <p className="text-xs text-[#64714F] mt-1">
                  {item.store}
                </p>

                <button className="mt-2 w-full bg-[#F8BC22] text-white py-1 rounded-full text-sm hover:bg-yellow-500">
                  Pesan Menu
                </button>
              </div>
            ))}
          </div>

          {/* EMPTY */}
          {filteredMenus.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Menu tidak ditemukan
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
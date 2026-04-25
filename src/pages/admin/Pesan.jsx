import { useState } from "react";
import { Bell, Search } from "lucide-react";

import SideBar from "../../components/SideBar";
import bgImage from "../../assets/image.png";

import image15 from "../../assets/image.png";
import image20 from "../../assets/image.png";
import image202 from "../../assets/image.png";
import image203 from "../../assets/image.png";

const conversations = [
  {
    id: 1,
    name: "Pembeli 1",
    message: "Terima Kasih kak <3",
    time: "10 m ago",
    image: image20,
  },
  {
    id: 2,
    name: "Pembeli 2",
    message: "Terima Kasih kak <3",
    time: "10 m ago",
    image: image202,
  },
  {
    id: 3,
    name: "Pembeli 3",
    message: "Terima Kasih kak <3",
    time: "10 m ago",
    image: image203,
  },
];

const Pesan = () => {
  const [activeChat, setActiveChat] = useState(conversations[0]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#effae8]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src={bgImage}
          alt="background"
          className="w-[700px] md:w-[900px] opacity-30 blur-[1px] object-contain"
        />
      </div>

      <div className="flex min-h-screen">
        
        {/* SIDEBAR */}
        <SideBar activeMenu="pesan" />

        {/* MAIN */}
        <div className="flex-1 p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#63714e]">
              Food <span className="text-yellow-500">Waste</span>
            </h1>

            <div className="flex items-center gap-4">
              <Bell className="text-[#63714e]" size={22} />
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-5 flex items-center bg-white rounded-full px-4 py-2 w-80 shadow">
            <input
              type="text"
              placeholder="Cari Toko"
              className="flex-1 outline-none text-sm"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* CHAT LIST */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-lg h-[500px] overflow-y-auto">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChat(c)}
                  className={`flex items-center gap-3 p-3 rounded-xl mb-3 cursor-pointer transition ${
                    activeChat.id === c.id
                      ? "bg-yellow-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={c.image}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={c.name}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#63714e]">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {c.message}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {c.time}
                  </span>
                </div>
              ))}
            </div>

            {/* CHAT AREA */}
            <div className="md:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg flex flex-col">

              {/* HEADER CHAT */}
              <div className="flex items-center gap-3 mb-4 border-b pb-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <h2 className="font-semibold text-[#63714e]">
                  {activeChat.name}
                </h2>
              </div>

              {/* CHAT BODY */}
              <div className="flex-1 space-y-3 text-sm overflow-y-auto">

                <div className="flex justify-start">
                  <div className="bg-yellow-200 px-3 py-2 rounded-xl max-w-[60%]">
                    Iya kak, ambil semua berapa totalnya?
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-green-200 px-3 py-2 rounded-xl max-w-[60%]">
                    Halo Kak, Sisa Donat Gula hari ini 3 kak.
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-green-200 px-3 py-2 rounded-xl max-w-[60%]">
                    21.000 kak, kami tunggu di toko
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-green-200 px-3 py-2 rounded-xl">
                    Terima Kasih kak ❤️
                  </div>
                </div>

                <img
                  src={image15}
                  className="w-40 rounded-lg mt-3"
                  alt="produk"
                />
              </div>

              {/* INPUT CHAT (BONUS biar lebih realistis) */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />
                <button className="bg-yellow-400 px-4 py-2 rounded-full text-white">
                  Kirim
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesan;
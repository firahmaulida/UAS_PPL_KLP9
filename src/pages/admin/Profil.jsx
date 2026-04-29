import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

import bgImage from "../../assets/image.png";
import SideBar from "../../components/SideBar";

const Profil = () => {
  const [status, setStatus] = useState("buka");
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#effae8] overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src={bgImage}
          alt="background"
          className="w-[800px] opacity-30 blur-sm"
        />
      </div>

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <SideBar activePage="profil" />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#63714e]">
              Food <span className="text-yellow-500">Waste</span>
            </h1>

            <div className="flex items-center gap-4">
              <Bell className="text-[#63714e]" size={22} />
              <div className="w-10 h-10 rounded-full bg-gray-300" />
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg flex items-center gap-6">

            {/* AVATAR */}
            <div className="w-24 h-24 rounded-full bg-gray-300" />

            {/* INFO */}
            <div>
              <h2 className="text-2xl font-bold text-[#63714e]">
                Pemilik Toko KLP 09 PPL
              </h2>

              <p className="text-gray-500 mt-1">
                klp09.ppl@gmail.com
              </p>

              {/* STATUS TOGGLE */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setStatus("buka")}
                  className={`px-5 py-2 rounded-full text-white font-medium transition ${
                    status === "buka"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                >
                  Buka
                </button>

                <button
                  onClick={() => setStatus("tutup")}
                  className={`px-5 py-2 rounded-full text-white font-medium transition ${
                    status === "tutup"
                      ? "bg-yellow-400"
                      : "bg-gray-400"
                  }`}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="grid md:grid-cols-2 gap-6 mt-7">

            {/* MENU */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg">

              <h3 className="text-lg font-semibold mb-5 text-[#63714e]">
                Menu
              </h3>

              {/* EDIT PROFILE */}
              <div
                onClick={() => navigate("/edit-profil")}
                className="flex justify-between items-center py-3 border-b cursor-pointer hover:text-yellow-500 transition"
              >
                <div className="flex items-center gap-3">
                  <User size={18} />
                  Edit Profil
                </div>
                <span>→</span>
              </div>

              {/* CHANGE PASSWORD */}
              <div
                onClick={() => navigate("/ganti-password")}
                className="flex justify-between items-center py-3 border-b cursor-pointer hover:text-yellow-500 transition"
              >
                <div className="flex items-center gap-3">
                  <Lock size={18} />
                  Ganti Password
                </div>
                <span>→</span>
              </div>

              {/* SETTINGS */}
              <div
                onClick={() => navigate("/pengaturan")}
                className="flex justify-between items-center py-3 cursor-pointer hover:text-yellow-500 transition"
              >
                <div className="flex items-center gap-3">
                  <Settings size={18} />
                  Pengaturan
                </div>
                <span>→</span>
              </div>

              {/* LOGOUT */}
              <button className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
                <LogOut size={18} />
                Keluar
              </button>

            </div>

            {/* HISTORY */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg">

              <h3 className="text-lg font-semibold mb-5 text-[#63714e]">
                Riwayat Pesanan Terakhir
              </h3>

              <div className="flex gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl bg-gray-300" />
                <div>
                  <p className="font-semibold">Donat Gula</p>
                  <small className="text-gray-500">
                    Firah Shania
                  </small>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-300" />
                <div>
                  <p className="font-semibold">Ayam Teriyaki</p>
                  <small className="text-gray-500">
                    Kiya Caesar Tasya
                  </small>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
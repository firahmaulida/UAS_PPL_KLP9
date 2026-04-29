import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import LogoutModal from "../../components/LogoutModal";
import {
  Bell,
  User,
  Lock,
  Settings,
  LogOut,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

// Assets
import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import food1 from "../../assets/chat1.png";

export const ProfilUser = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const riwayatPesanan = [
    {
      id: 1,
      nama: "Donat Gula",
      toko: "PASTELERIA d'Acacia",
      img: food1,
    },
  ];

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img className="w-1/2 h-full object-cover opacity-80" src={bgUtama} alt="" />
        <img className="w-1/2 h-full object-cover opacity-60" src={bgUtama} alt="" />
      </div>

      {/* LOGO */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* TOP RIGHT */}
      <div className="absolute top-6 right-12 flex items-center gap-6 z-30">
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-[#63714e]">
          <Bell size={24} strokeWidth={2.5} />
        </button>

        <div className="p-0.5 bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden">
          <img
            src={userProfil}
            alt="User"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="absolute top-24 left-12 right-12 bottom-10 flex items-start gap-8 z-10">
        {/* SIDEBAR */}
        <div className="h-full">
          <SideBar activePage="profil" />
        </div>

        {/* CONTENT */}
        <section className="flex-1 flex gap-6">
          {/* LEFT PANEL */}
          <div className="flex-1 flex flex-col gap-5">
            {/* IDENTITAS */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[38px] shadow-2xl border border-white/40 h-36 px-10 flex items-center gap-6">
              <img
                src={userProfil}
                alt="User"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <div>
                <h2 className="text-4xl font-black text-[#63714e] leading-none">
                  KLP 09 PPL
                </h2>
                <p className="text-lg text-[#63714e]/75 font-medium mt-2">
                  klp09.ppl@gmail.com
                </p>
              </div>
            </div>

            {/* MENU PROFIL */}
            <div className="bg-white/55 backdrop-blur-2xl rounded-[38px] shadow-2xl border border-white/40 px-8 py-8 h-90 flex flex-col justify-between">
              <div className="space-y-5">
                {/* EDIT PROFIL */}
                <button
                  onClick={() => navigate("/editprofil")}
                  className="w-full flex items-center justify-between border-b border-gray-300 pb-4 hover:translate-x-1 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <User size={18} className="text-[#f8bc22]" />
                    <span className="font-semibold text-[#63714e] text-lg">
                      Edit Profil
                    </span>
                  </div>
                  <ChevronRight className="text-[#f8bc22]" size={17} />
                </button>

                {/* GANTI PASSWORD */}
                <button
                  onClick={() => navigate("/gantipassword")}
                  className="w-full flex items-center justify-between border-b border-gray-300 pb-4 hover:translate-x-1 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Lock size={18} className="text-[#f8bc22]" />
                    <span className="font-semibold text-[#63714e] text-lg">
                      Ganti Password
                    </span>
                  </div>
                  <ChevronRight className="text-[#f8bc22]" size={17} />
                </button>

                {/* PENGATURAN */}
                <button
                  onClick={() => navigate("/pengaturan")}
                  className="w-full flex items-center justify-between border-b border-gray-300 pb-4 hover:translate-x-1 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Settings size={18} className="text-[#f8bc22]" />
                    <span className="font-semibold text-[#63714e] text-lg">
                      Pengaturan
                    </span>
                  </div>
                  <ChevronRight className="text-[#f8bc22]" size={17} />
                </button>
              </div>

              {/* LOGOUT */}
              <button
                onClick={() => setShowLogout(true)}
                className="w-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all"
              >
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-72 bg-white/55 backdrop-blur-2xl rounded-[38px] shadow-2xl border border-white/40 px-6 py-6 h-fit">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardList className="text-[#63714e]" size={19} />
              <h3 className="text-lg font-black text-[#63714e]">
                Riwayat Pesananmu
              </h3>
            </div>

            {riwayatPesanan.length > 0 ? (
              <div className="space-y-4">
                {riwayatPesanan.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/80 rounded-3xl p-3 flex items-center gap-3 shadow-md hover:scale-[1.02] transition-all"
                  >
                    <img
                      src={item.img}
                      alt={item.nama}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />

                    <div>
                      <h4 className="font-bold text-[#63714e] text-sm">
                        {item.nama}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{item.toko}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-[#63714e]/50 text-sm font-medium">
                Belum ada riwayat pesanan
              </div>
            )}
          </div>
        </section>
      </div>

      {/* MODAL LOGOUT */}
      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onLogout={() => navigate("/")}
        />
      )}
    </main>
  );
};
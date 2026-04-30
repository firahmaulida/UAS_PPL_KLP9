import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Bell,
  ChevronDown,
  User,
  Lock,
  Settings,
  LogOut,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import food1 from "../../assets/image.png";

/* ─── Dummy log aktivitas admin ────────────────────────────── */
const adminLogs = [
  {
    id: 1,
    aksi: "Hapus Menu",
    detail: "Chicken Teriyaki – Pak Baka",
    img: food1,
    waktu: "2 mnt lalu",
  },
  {
    id: 2,
    aksi: "Setujui Toko",
    detail: "Bakery Bu Wani",
    img: food1,
    waktu: "1 jam lalu",
  },
  {
    id: 3,
    aksi: "Balas Pesan",
    detail: "Pembeli #1042",
    img: food1,
    waktu: "3 jam lalu",
  },
  {
    id: 4,
    aksi: "Edit Menu",
    detail: "Brownies Coklat",
    img: food1,
    waktu: "Kemarin",
  },
];

/* ─── Backdrop modal ───────────────────────────────────────── */
function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {children}
    </div>
  );
}

/* ─── Logout modal ─────────────────────────────────────────── */
function LogoutModal({ onClose, onLogout }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-80 mx-4 p-7 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f8bc22]/10 flex items-center justify-center">
          <LogOut size={28} className="text-[#f8bc22]" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">Keluar Akun?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Kamu akan keluar dari sesi admin. Pastikan semua pekerjaan sudah
          tersimpan.
        </p>
        <div className="flex gap-3 w-full pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex-1 py-2.5 rounded-xl bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black text-sm transition-colors"
          >
            Keluar
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export const ProfilAdmin = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [tokoStatus, setTokoStatus] = useState("buka");
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "Edit Profil", route: "/admin/edit-profil" },
    { icon: Lock, label: "Ganti Password", route: "/admin/ganti-password" },
    { icon: Settings, label: "Pengaturan", route: "/admin/pengaturan" },
  ];

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-80"
        />
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-60"
        />
      </div>

      {/* ── Logo ── */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* ── Top-right ── */}
      <div className="absolute top-6 right-12 flex items-center gap-4 z-30">
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-[#63714e]">
          <Bell size={24} strokeWidth={2.5} />
        </button>
        <div className="p-0.5 bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden flex items-center gap-2 pr-3">
          <img
            src={userProfil}
            alt=""
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-bold text-[#63714e]">Admin</span>
          <ChevronDown size={14} className="text-[#63714e]/60" />
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="absolute top-24 left-12 right-12 bottom-4 flex items-stretch gap-4 z-10 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
          <SideBarAdmin activePage="profilAdmin" />
        </div>

        {/* Content */}
        <section className="flex-1 flex gap-4 overflow-hidden">
          {/* ── Left panel ── */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Identitas + Status Toko */}
            <div className="bg-white/60 backdrop-blur-2xl shadow-2xl border border-white/40 px-8 py-5 flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={userProfil}
                  alt="Admin"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#f8bc22] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                  ADMIN
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-black text-[#63714e] leading-none">
                  Admin PPL
                </h2>
                <p className="text-sm text-[#63714e]/70 font-medium mt-1">
                  admin.ppl@foodwaste.id
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">
                    Aktif
                  </span>
                </div>
              </div>

              {/* Status Toko toggle */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-bold text-[#63714e]/60 uppercase tracking-wider">
                  Status Toko
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTokoStatus("buka")}
                    className={`px-5 py-2 rounded-full text-sm font-black transition-all ${
                      tokoStatus === "buka"
                        ? "bg-[#f8bc22] text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    Buka
                  </button>
                  <button
                    onClick={() => setTokoStatus("tutup")}
                    className={`px-5 py-2 rounded-full text-sm font-black transition-all ${
                      tokoStatus === "tutup"
                        ? "bg-[#63714e] text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    Tutup
                  </button>
                </div>
                <span
                  className={`text-[10px] font-black px-3 py-1 rounded-full ${
                    tokoStatus === "buka"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {tokoStatus === "buka"
                    ? "● Toko Sedang Buka"
                    : "● Toko Sedang Tutup"}
                </span>
              </div>
            </div>

            {/* Menu profil */}
            <div className="flex-1 bg-white/55 backdrop-blur-2xl shadow-2xl border border-white/40 px-8 py-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map(({ icon: Icon, label, route }, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(route)}
                    className={`w-full flex items-center justify-between py-4 hover:translate-x-1 transition-all ${
                      i < menuItems.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon size={17} className="text-[#f8bc22]" />
                      <span className="font-semibold text-[#63714e] text-sm">
                        {label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[#f8bc22]" />
                  </button>
                ))}
              </div>

              {/* Logout */}
              <button
                onClick={() => setShowLogout(true)}
                className="w-full mt-4 bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black py-3 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all"
              >
                <LogOut size={17} />
                Keluar
              </button>
            </div>
          </div>

          {/* ── Right panel — log aktivitas ── */}
          <div className="w-72 bg-white/55 backdrop-blur-2xl shadow-2xl border border-white/40 px-6 py-6 flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <ClipboardList size={18} className="text-[#63714e]" />
              <h3 className="text-base font-black text-[#63714e]">
                Log Aktivitas Admin
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {adminLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white/80 rounded-2xl p-3 flex items-center gap-3 shadow-sm hover:scale-[1.02] transition-all"
                >
                  <img
                    src={log.img}
                    alt={log.aksi}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <h4 className="font-black text-[#63714e] text-xs leading-tight">
                      {log.aksi}
                    </h4>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                      {log.detail}
                    </p>
                    <p className="text-[9px] text-[#63714e]/50 font-bold mt-1">
                      {log.waktu}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Logout modal */}
      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onLogout={() => navigate("/")}
        />
      )}
    </main>
  );
};

export default ProfilAdmin;

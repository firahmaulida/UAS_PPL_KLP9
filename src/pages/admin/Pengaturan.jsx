import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin"; // Menggunakan SideBarAdmin
// Impor modal jika sudah ada, jika tidak, bagian modal bisa disesuaikan
// import SettingConfirmModal from "../../components/SettingConfirmModal";
// import SettingSuccessModal from "../../components/SettingSuccessModal";

import {
  Bell,
  ArrowLeft,
  BellRing,
  Moon,
  Languages,
  Shield,
  Save,
  UserCog,
  BadgeCheck,
  Database,
  MapPin,
} from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

const PengaturanAdmin = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State Pengaturan
  const [settings, setSettings] = useState({
    notifApp: true,
    notifEmail: false,
    darkMode: false,
    autoSave: true,
    location: true,
    bahasa: "Indonesia",
  });

  const toggleSwitch = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // Simulasi simpan data
    setShowConfirm(false);
    setShowSuccess(true);
    // Jika tidak pakai modal, bisa langsung alert/toast
    // alert("Pengaturan Berhasil Disimpan!");
  };

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      {/* BACKGROUND DEKORASI */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img
          className="w-1/2 h-full object-cover opacity-80"
          src={bgUtama}
          alt=""
        />
        <img
          className="w-1/2 h-full object-cover opacity-60"
          src={bgUtama}
          alt=""
        />
      </div>

      {/* HEADER LOGO */}
      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* TOP RIGHT PROFILE */}
      <div className="absolute top-6 right-12 flex items-center gap-6 z-30">
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-[#63714e]">
          <Bell size={24} strokeWidth={2.5} />
        </button>
        <div className="p-0.5 bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden">
          <img
            src={userProfil}
            alt="Admin"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="absolute top-24 left-12 right-12 bottom-10 flex items-stretch gap-8 z-10">
        {/* SIDEBAR ADMIN */}
        <div className="h-full">
          <SideBarAdmin activePage="profilAdmin" />
        </div>

        {/* CONTENT AREA */}
        <section className="flex-1 flex gap-6 overflow-hidden">
          {/* LEFT PANEL: SETTINGS FORM */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#63714e]">
                  Pengaturan Sistem
                </h2>
                <p className="text-xs text-[#63714e]/70">
                  Kelola preferensi admin dan sistem aplikasi
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/profil")}
                className="px-5 py-2 rounded-full border border-[#63714e] text-[#63714e] text-sm flex items-center gap-2 hover:bg-[#63714e]/10 transition-all bg-white/50 backdrop-blur-sm"
              >
                <ArrowLeft size={15} /> Kembali
              </button>
            </div>

            {/* SCROLLABLE SETTINGS */}
            <div className="flex-1 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-6 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="space-y-3 mb-6">
                <h3 className="text-[#63714e] font-bold text-sm ml-2 mb-1">
                  Notifikasi & Tampilan
                </h3>
                <SettingRow
                  icon={<BellRing size={16} />}
                  title="Notifikasi Aplikasi"
                >
                  <Switch
                    active={settings.notifApp}
                    onClick={() => toggleSwitch("notifApp")}
                  />
                </SettingRow>

                <SettingRow icon={<Moon size={16} />} title="Mode Gelap">
                  <Switch
                    active={settings.darkMode}
                    onClick={() => toggleSwitch("darkMode")}
                  />
                </SettingRow>

                <SettingRow
                  icon={<Languages size={16} />}
                  title="Bahasa Sistem"
                >
                  <select
                    value={settings.bahasa}
                    onChange={(e) =>
                      setSettings({ ...settings, bahasa: e.target.value })
                    }
                    className="bg-[#7d8767] text-white rounded-xl px-3 py-1.5 outline-none text-sm"
                  >
                    <option>Indonesia</option>
                    <option>English</option>
                  </select>
                </SettingRow>
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                className="mt-auto w-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all text-sm"
              >
                <Save size={16} /> Simpan Perubahan
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: SUMMARY */}
          <div className="w-72 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-6 overflow-y-auto">
            <h3 className="text-base font-bold text-[#63714e] mb-4">
              Ringkasan Admin
            </h3>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative">
                <img
                  src={userProfil}
                  alt="Admin"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-3"
                />
                <div className="absolute bottom-4 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
              </div>
              <h2 className="text-xl font-black text-[#63714e]">
                Admin PPL 09
              </h2>
              <p className="text-xs text-[#63714e]/70">admin@email.com</p>
            </div>

            <div className="space-y-3">
              <InfoCard
                icon={<UserCog size={16} />}
                title="Status Notif"
                value={settings.notifApp ? "Aktif" : "Nonaktif"}
              />
              <InfoCard
                icon={<Moon size={16} />}
                title="Tema Sistem"
                value={settings.darkMode ? "Mode Gelap" : "Mode Terang"}
              />
              <InfoCard
                icon={<BadgeCheck size={16} />}
                title="Auto Save"
                value={settings.autoSave ? "On" : "Off"}
              />
              <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-[10px] text-red-400 font-bold uppercase mb-2">
                  Zona Berbahaya
                </p>
                <button className="w-full text-left text-xs text-red-600 font-bold hover:underline">
                  Logout Semua Perangkat
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* MODAL HANDLERS (Opsional) */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[30px] shadow-2xl text-center max-w-sm">
            <h3 className="text-xl font-bold text-[#63714e] mb-2">
              Simpan Perubahan?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Pastikan semua pengaturan sudah sesuai dengan preferensi sistem.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border border-gray-200 rounded-2xl text-gray-400 font-bold"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-[#f8bc22] text-white rounded-2xl font-bold"
              >
                Ya, Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[30px] shadow-2xl text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BadgeCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#63714e] mb-2">Berhasil!</h3>
            <p className="text-gray-500 text-sm mb-6">
              Pengaturan admin telah berhasil diperbarui.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 bg-[#63714e] text-white rounded-2xl font-bold"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

// Helper Components
const SettingRow = ({ icon, title, children }) => (
  <div className="bg-[#f7f8ef] rounded-2xl px-4 py-3 flex justify-between items-center shadow-sm border border-white/50">
    <div className="flex items-center gap-3 text-[#63714e] font-semibold text-sm">
      <span className="p-2 bg-white rounded-lg shadow-sm text-[#eb9f29]">
        {icon}
      </span>
      {title}
    </div>
    {children}
  </div>
);

const Switch = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-12 h-6 rounded-full relative transition-all duration-300 ${
      active ? "bg-[#7d8767]" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-md transition-all duration-300 ${
        active ? "right-1" : "left-1"
      }`}
    />
  </button>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white/50 rounded-2xl p-3 shadow-sm border border-white/80">
    <div className="flex items-center gap-2 text-[#63714e] font-bold text-xs mb-1">
      {icon}
      {title}
    </div>
    <p className="text-[11px] text-[#63714e]/70 font-medium">{value}</p>
  </div>
);

export default PengaturanAdmin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SettingConfirmModal from "../../components/SettingConfirmModal";
import SettingSuccessModal from "../../components/SettingSuccessModal";
import {
  Bell,
  ArrowLeft,
  BellRing,
  Moon,
  Languages,
  Shield,
  Trash2,
  Save,
  UserCog,
  BadgeCheck,
} from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

export const Pengaturan = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [settings, setSettings] = useState({
    notif: true,
    darkmode: false,
    bahasa: "Indonesia",
    privasi: "Publik",
  });

  const toggleSwitch = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

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
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
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
        <SideBar activePage="profil" />

        <section className="flex-1 flex gap-6">
          {/* LEFT PANEL */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-black text-[#63714e]">Pengaturan Akun</h2>
                <p className="text-sm text-[#63714e]/70">
                  Kelola preferensi dan privasi akun Anda
                </p>
              </div>

              <button
                onClick={() => navigate("/profil")}
                className="px-6 py-2 rounded-full border border-[#63714e] text-[#63714e] flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-8 space-y-5">
              <SettingRow icon={<BellRing size={18} />} title="Notifikasi Aktif">
                <Switch active={settings.notif} onClick={() => toggleSwitch("notif")} />
              </SettingRow>

              <SettingRow icon={<Moon size={18} />} title="Mode Gelap">
                <Switch active={settings.darkmode} onClick={() => toggleSwitch("darkmode")} />
              </SettingRow>

              <SettingRow icon={<Languages size={18} />} title="Bahasa">
                <select
                  value={settings.bahasa}
                  onChange={(e) => setSettings({ ...settings, bahasa: e.target.value })}
                  className="bg-[#7d8767] text-white rounded-xl px-4 py-2 outline-none"
                >
                  <option>Indonesia</option>
                  <option>English</option>
                </select>
              </SettingRow>

              <SettingRow icon={<Shield size={18} />} title="Privasi Akun">
                <select
                  value={settings.privasi}
                  onChange={(e) => setSettings({ ...settings, privasi: e.target.value })}
                  className="bg-[#7d8767] text-white rounded-xl px-4 py-2 outline-none"
                >
                  <option>Publik</option>
                  <option>Privat</option>
                </select>
              </SettingRow>

              <SettingRow icon={<Trash2 size={18} />} title="Hapus Riwayat Pesanan">
                <button className="bg-red-500 text-white px-4 py-2 rounded-xl">
                  Hapus
                </button>
              </SettingRow>

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full mt-6 bg-[#f8bc22] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={17} />
                Simpan Pengaturan
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-80 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 h-fit">
            <h3 className="text-lg font-bold text-[#63714e] mb-6">Ringkasan Preferensi</h3>

            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={userProfil}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />
              <h2 className="text-2xl font-black text-[#63714e]">KLP 09 PPL</h2>
              <p className="text-sm text-[#63714e]/70">User Preferences Active</p>
            </div>

            <div className="space-y-4">
              <InfoCard
                icon={<UserCog size={18} />}
                title="Notifikasi"
                value={settings.notif ? "Aktif" : "Nonaktif"}
              />

              <InfoCard
                icon={<Moon size={18} />}
                title="Tema"
                value={settings.darkmode ? "Gelap" : "Terang"}
              />

              <InfoCard
                icon={<Languages size={18} />}
                title="Bahasa"
                value={settings.bahasa}
              />

              <InfoCard
                icon={<BadgeCheck size={18} />}
                title="Privasi"
                value={settings.privasi}
              />
            </div>
          </div>
        </section>
      </div>

      {/* POPUP */}
      {showConfirm && (
        <SettingConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SettingSuccessModal onDone={() => navigate("/profil")} />
      )}
    </main>
  );
};

const SettingRow = ({ icon, title, children }) => (
  <div className="bg-[#f7f8ef] rounded-2xl px-5 py-4 flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-3 text-[#63714e] font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Switch = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-14 h-7 rounded-full relative transition-all ${
      active ? "bg-[#7d8767]" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${
        active ? "right-1" : "left-1"
      }`}
    />
  </button>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-[#f7f8ef] rounded-2xl p-4 shadow-sm">
    <div className="flex items-center gap-3 text-[#63714e] font-bold mb-1">
      {icon}
      {title}
    </div>
    <p className="text-sm text-[#63714e]/70">{value}</p>
  </div>
);
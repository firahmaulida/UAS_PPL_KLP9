import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import PasswordConfirmModal from "../../components/PasswordConfirmModal";
import PasswordSuccessModal from "../../components/PasswordSuccessModal";
import {
  Bell,
  ArrowLeft,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  BadgeCheck,
} from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

export const GantiPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [passwordData, setPasswordData] = useState({
    lama: "",
    baru: "",
    konfirmasi: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      {/* BACKGROUND */}
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
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="absolute top-24 left-12 right-12 bottom-10 flex items-stretch gap-8 z-10">
        {/* SIDEBAR */}
        <div className="h-full">
          <SideBar activePage="profil" />
        </div>

        {/* CONTENT */}
        <section className="flex-1 flex gap-6 overflow-hidden">
          {/* FORM KIRI */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* JUDUL + TOMBOL */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#63714e]">
                  Ganti Password
                </h2>
                <p className="text-xs text-[#63714e]/70">
                  Perbarui keamanan akun Anda
                </p>
              </div>
              <button
                onClick={() => navigate("/profil")}
                className="px-5 py-2 rounded-full border border-[#63714e] text-[#63714e] text-sm flex items-center gap-2 hover:bg-[#63714e]/10 transition-all"
              >
                <ArrowLeft size={15} />
                Kembali
              </button>
            </div>

            {/* FORM */}
            <div className="flex-1 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <PasswordField
                  label="Password Lama"
                  name="lama"
                  value={passwordData.lama}
                  onChange={handleChange}
                  show={showPassword}
                />
                <PasswordField
                  label="Password Baru"
                  name="baru"
                  value={passwordData.baru}
                  onChange={handleChange}
                  show={showPassword}
                />
                <PasswordField
                  label="Konfirmasi Password"
                  name="konfirmasi"
                  value={passwordData.konfirmasi}
                  onChange={handleChange}
                  show={showPassword}
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#63714e] flex items-center gap-2 hover:opacity-70 transition-all"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                </button>
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold py-3 rounded-2xl shadow-lg transition-all text-sm"
              >
                Simpan Password Baru
              </button>
            </div>
          </div>

          {/* PANEL KANAN */}
          <div className="w-72 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-6 overflow-y-auto">
            <h3 className="text-base font-bold text-[#63714e] mb-4">
              Tips Keamanan
            </h3>

            <div className="space-y-3">
              <SecurityItem
                icon={<ShieldCheck size={16} />}
                title="Gunakan kombinasi unik"
                text="Campurkan huruf besar, kecil, angka, dan simbol."
              />
              <SecurityItem
                icon={<KeyRound size={16} />}
                title="Minimal 8 karakter"
                text="Password yang lebih panjang lebih aman digunakan."
              />
              <SecurityItem
                icon={<BadgeCheck size={16} />}
                title="Jangan gunakan data pribadi"
                text="Hindari nama, tanggal lahir, atau nomor telepon."
              />
            </div>
          </div>
        </section>
      </div>

      {/* MODALS */}
      {showConfirm && (
        <PasswordConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <PasswordSuccessModal onDone={() => navigate("/profil")} />
      )}
    </main>
  );
};

const PasswordField = ({ label, name, value, onChange, show }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#63714e]/70 px-1">
        {label}
      </label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-inner">
        <LockKeyhole size={16} className="text-white" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-white text-sm placeholder:text-white/70"
        />
      </div>
    </div>
  );
};

const SecurityItem = ({ icon, title, text }) => {
  return (
    <div className="bg-[#f7f8ef] rounded-2xl p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-1 text-[#63714e] font-bold text-sm">
        {icon}
        {title}
      </div>
      <p className="text-xs text-[#63714e]/70 leading-relaxed">{text}</p>
    </div>
  );
};

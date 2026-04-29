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
          {/* FORM KIRI */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-black text-[#63714e]">Ganti Password</h2>
                <p className="text-sm text-[#63714e]/70">Perbarui keamanan akun Anda</p>
              </div>

              <button
                onClick={() => navigate("/profil")}
                className="px-6 py-2 rounded-full border border-[#63714e] text-[#63714e] flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-8">
              <div className="space-y-6">
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
                  className="text-sm text-[#63714e] flex items-center gap-2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                </button>

                <button
                  onClick={() => setShowConfirm(true)}
                  className="w-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold py-4 rounded-2xl shadow-lg transition-all"
                >
                  Simpan Password Baru
                </button>
              </div>
            </div>
          </div>

          {/* PANEL KANAN */}
          <div className="w-80 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 h-fit">
            <h3 className="text-lg font-bold text-[#63714e] mb-6">Tips Keamanan</h3>

            <div className="space-y-5">
              <SecurityItem
                icon={<ShieldCheck size={18} />}
                title="Gunakan kombinasi unik"
                text="Campurkan huruf besar, kecil, angka, dan simbol."
              />

              <SecurityItem
                icon={<KeyRound size={18} />}
                title="Minimal 8 karakter"
                text="Password yang lebih panjang lebih aman digunakan."
              />

              <SecurityItem
                icon={<BadgeCheck size={18} />}
                title="Jangan gunakan data pribadi"
                text="Hindari nama, tanggal lahir, atau nomor telepon."
              />
            </div>
          </div>
        </section>
      </div>

      {/* POPUP */}
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
        <PasswordSuccessModal
          onDone={() => navigate("/profil")}
        />
      )}
    </main>
  );
};

const PasswordField = ({ label, name, value, onChange, show }) => {
  return (
    <div>
      <label className="block text-[#63714e] font-semibold mb-2">{label}</label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-4 flex items-center gap-3 shadow-inner">
        <LockKeyhole size={17} className="text-white" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-white placeholder:text-white/70"
        />
      </div>
    </div>
  );
};

const SecurityItem = ({ icon, title, text }) => {
  return (
    <div className="bg-[#f7f8ef] rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2 text-[#63714e] font-bold">
        {icon}
        {title}
      </div>
      <p className="text-sm text-[#63714e]/70 leading-relaxed">{text}</p>
    </div>
  );
};
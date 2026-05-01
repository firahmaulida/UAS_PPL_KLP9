import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SaveConfirmModal from "../../components/SaveConfirmModal";
import SaveSuccessModal from "../../components/SaveSuccessModal";
import { Bell, ArrowLeft, Save, User, Mail, Phone } from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

export const EditProfil = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nama: "KLP 09 PPL",
    email: "klp09.ppl@gmail.com",
    phone: "08123456789",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
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
          {/* LEFT - FORM */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* JUDUL + TOMBOL */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#63714e]">
                  Edit Profil
                </h2>
                <p className="text-xs text-[#63714e]/70">
                  Kelola informasi akun Anda
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/profil")}
                  className="px-5 py-2 rounded-full border border-[#63714e] text-[#63714e] text-sm flex items-center gap-2 hover:bg-[#63714e]/10 transition-all"
                >
                  <ArrowLeft size={15} />
                  Kembali
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-5 py-2 rounded-full bg-[#f8bc22] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#e4aa16] transition-all"
                >
                  <Save size={15} />
                  Simpan
                </button>
              </div>
            </div>

            {/* FORM INFORMASI AKUN */}
            <div className="flex-1 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 flex flex-col overflow-hidden">
              <h3 className="text-base font-bold text-[#63714e] mb-5">
                Informasi Akun
              </h3>

              {/* FOTO PROFIL */}
              <div className="flex items-center gap-5 mb-6">
                <img
                  src={userProfil}
                  alt=""
                  className="w-20 h-20 rounded-2xl object-cover shadow-md"
                />
                <div>
                  <p className="text-sm font-bold text-[#63714e]">
                    Foto Profil
                  </p>
                  <button className="text-xs text-[#f8bc22] underline font-semibold mt-1">
                    Ganti Foto
                  </button>
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="flex flex-col gap-4">
                <InputField
                  icon={<User size={16} />}
                  label="Nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                />
                <InputField
                  icon={<Mail size={16} />}
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  icon={<Phone size={16} />}
                  label="No. Telepon"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* RIGHT - LIVE PREVIEW */}
          <div className="w-72 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 flex flex-col items-center">
            <h3 className="text-base font-bold text-[#63714e] mb-6 self-start">
              Live Preview
            </h3>

            <img
              src={userProfil}
              alt=""
              className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
            />
            <h2 className="text-xl font-black text-[#63714e] text-center">
              {formData.nama}
            </h2>
            <p className="text-xs text-[#63714e]/70 mt-1 text-center">
              {formData.email}
            </p>
            <p className="text-xs text-[#63714e]/70 mt-1 text-center">
              {formData.phone}
            </p>
          </div>
        </section>
      </div>

      {/* MODALS */}
      {showConfirm && (
        <SaveConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && <SaveSuccessModal onDone={() => navigate("/profil")} />}
    </main>
  );
};

const InputField = ({ icon, label, name, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#63714e]/70 px-1">
        {label}
      </label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex items-center gap-3">
        <div className="text-white">{icon}</div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-white text-sm"
        />
      </div>
    </div>
  );
};

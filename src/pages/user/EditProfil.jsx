import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SaveConfirmModal from "../../components/SaveConfirmModal";
import SaveSuccessModal from "../../components/SaveSuccessModal";
import { Bell, ArrowLeft, Save, User, Mail, Phone, Store, MapPin, FileText } from "lucide-react";

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
    toko: "Green Grocery",
    alamat: "Jl. Sustainability No. 42",
    deskripsi: "Dedicated to reducing food waste and improving sustainability.",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img className="w-1/2 h-full object-cover opacity-80" src={bgUtama} alt="" />
        <img className="w-1/2 h-full object-cover opacity-60" src={bgUtama} alt="" />
      </div>

      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      <div className="absolute top-6 right-12 flex items-center gap-6 z-30">
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg text-[#63714e]">
          <Bell size={24} />
        </button>

        <img src={userProfil} alt="" className="w-12 h-12 rounded-full object-cover" />
      </div>

      <div className="absolute top-24 left-12 right-12 bottom-10 flex gap-8 z-10">
        <SideBar activePage="profil" />

        <section className="flex-1 flex gap-6">
          <div className="flex-1 space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-[#63714e]">Edit Profil</h2>
                <p className="text-sm text-[#63714e]/70">Kelola informasi akun dan bisnis Anda</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/profil")}
                  className="px-6 py-2 rounded-full border border-[#63714e] text-[#63714e] flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Kembali
                </button>

                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-6 py-2 rounded-full bg-[#f8bc22] text-white font-bold flex items-center gap-2"
                >
                  <Save size={16} />
                  Simpan
                </button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-8">
              <h3 className="text-lg font-bold text-[#63714e] mb-6">Informasi Akun</h3>

              <div className="flex items-center gap-5 mb-7">
                <img src={userProfil} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                <button className="text-sm text-[#63714e] underline font-semibold">Ganti Foto</button>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <InputField icon={<User size={16} />} name="nama" value={formData.nama} onChange={handleChange} />
                <InputField icon={<Mail size={16} />} name="email" value={formData.email} onChange={handleChange} />
                <InputField icon={<Phone size={16} />} name="phone" value={formData.phone} onChange={handleChange} className="col-span-2" />
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-8">
              <h3 className="text-lg font-bold text-[#63714e] mb-6">Informasi Bisnis</h3>

              <div className="space-y-5">
                <InputField icon={<Store size={16} />} name="toko" value={formData.toko} onChange={handleChange} />
                <InputField icon={<MapPin size={16} />} name="alamat" value={formData.alamat} onChange={handleChange} />

                <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex gap-3 items-start">
                  <FileText size={16} className="text-white mt-1" />
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-transparent outline-none text-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 bg-white/60 backdrop-blur-2xl rounded-[35px] shadow-2xl p-7 h-fit">
            <h3 className="text-lg font-bold text-[#63714e] mb-6">Live Preview</h3>

            <div className="flex flex-col items-center text-center">
              <img src={userProfil} alt="" className="w-24 h-24 rounded-full object-cover mb-4" />
              <h2 className="text-2xl font-black text-[#63714e]">{formData.nama}</h2>
              <p className="text-sm text-[#63714e]/70">{formData.email}</p>

              <div className="mt-5 space-y-2 text-sm text-[#63714e]/80">
                <p>{formData.toko}</p>
                <p>{formData.alamat}</p>
                <p>{formData.phone}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showConfirm && (
        <SaveConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && (
        <SaveSuccessModal
          onDone={() => navigate("/profil")}
        />
      )}
    </main>
  );
};

const InputField = ({ icon, name, value, onChange, className = "" }) => {
  return (
    <div className={`bg-[#7d8767] rounded-2xl px-4 py-3 flex items-center gap-3 ${className}`}>
      <div className="text-white">{icon}</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-white"
      />
    </div>
  );
};
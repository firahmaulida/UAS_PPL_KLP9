import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Bell,
  ChevronDown,
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Store,
  MapPin,
  FileText,
  Camera,
} from "lucide-react";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";

/* ─── Backdrop ─────────────────────────────────────────────── */
function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {children}
    </div>
  );
}

/* ─── Confirm Modal ────────────────────────────────────────── */
function ConfirmModal({ onClose, onConfirm }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-80 mx-4 p-7 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f8bc22]/10 flex items-center justify-center">
          <Save size={28} className="text-[#f8bc22]" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">Simpan Perubahan?</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Informasi profil admin akan diperbarui. Pastikan semua data sudah
          benar.
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
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black text-sm transition-colors"
          >
            Ya, Simpan
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

/* ─── Success Modal ────────────────────────────────────────── */
function SuccessModal({ onDone }) {
  return (
    <Backdrop>
      <div className="bg-white rounded-[28px] shadow-2xl w-80 mx-4 p-7 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <Save size={28} className="text-green-500" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">Profil Disimpan!</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Informasi profil admin berhasil diperbarui.
        </p>
        <button
          type="button"
          onClick={onDone}
          className="w-full py-2.5 rounded-xl bg-[#63714e] hover:bg-[#4f5c3c] text-white font-black text-sm transition-colors"
        >
          Selesai
        </button>
      </div>
    </Backdrop>
  );
}

/* ─── Input Field ──────────────────────────────────────────── */
function InputField({ icon, label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-[#63714e]/70 px-1">
        {label}
      </label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-inner">
        <div className="text-white">{icon}</div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-white text-sm placeholder:text-white/50"
        />
      </div>
    </div>
  );
}

/* ─── Textarea Field ───────────────────────────────────────── */
function TextareaField({ icon, label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-[#63714e]/70 px-1">
        {label}
      </label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex items-start gap-3 shadow-inner">
        <div className="text-white mt-0.5">{icon}</div>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="w-full bg-transparent outline-none text-white text-sm placeholder:text-white/50 resize-none"
        />
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export const EditProfilAdmin = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatar, setAvatar] = useState(userProfil);

  const [formData, setFormData] = useState({
    nama: "Admin PPL",
    email: "admin.ppl@foodwaste.id",
    phone: "08123456789",
    toko: "Food Waste Admin",
    alamat: "Jl. Sustainability No. 42, Medan",
    deskripsi:
      "Dedicated to reducing food waste and improving sustainability across all partner stores.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

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
          {/* ── Left — Form ── */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#63714e]">
                  Edit Profil Admin
                </h2>
                <p className="text-xs text-[#63714e]/70 mt-0.5">
                  Kelola informasi akun dan bisnis
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/admin/profil")}
                  className="px-5 py-2 rounded-full border border-[#63714e] text-[#63714e] text-sm font-bold flex items-center gap-2 hover:bg-[#63714e]/10 transition-all"
                >
                  <ArrowLeft size={15} />
                  Kembali
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="px-5 py-2 rounded-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  <Save size={15} />
                  Simpan
                </button>
              </div>
            </div>

            {/* Scrollable form area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* ─ Informasi Akun ─ */}
              <div className="bg-white/60 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/40 px-7 py-6">
                <h3 className="text-sm font-black text-[#63714e] mb-5">
                  Informasi Akun
                </h3>

                {/* Avatar */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="Admin"
                      className="w-20 h-20 rounded-2xl object-cover shadow-md border-4 border-white"
                    />
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#f8bc22] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#e4aa16] transition-colors">
                      <Camera size={14} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImage}
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#63714e]">
                      Foto Profil Admin
                    </p>
                    <p className="text-[10px] text-[#63714e]/60 mt-0.5">
                      Klik ikon kamera untuk mengganti foto
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    icon={<User size={15} />}
                    label="Nama Admin"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<Mail size={15} />}
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                  <div className="col-span-2 md:col-span-1">
                    <InputField
                      icon={<Phone size={15} />}
                      label="No. Telepon"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* ─ Informasi Bisnis ─ */}
              <div className="bg-white/60 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/40 px-7 py-6">
                <h3 className="text-sm font-black text-[#63714e] mb-5">
                  Informasi Bisnis
                </h3>

                <div className="space-y-3">
                  <InputField
                    icon={<Store size={15} />}
                    label="Nama Toko"
                    name="toko"
                    value={formData.toko}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<MapPin size={15} />}
                    label="Alamat Toko"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                  />
                  <TextareaField
                    icon={<FileText size={15} />}
                    label="Deskripsi Bisnis"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right — Live Preview ── */}
          <div className="w-64 bg-white/55 backdrop-blur-2xl rounded-[28px] shadow-2xl border border-white/40 px-6 py-6 flex flex-col overflow-hidden">
            <h3 className="text-sm font-black text-[#63714e] mb-5">
              Live Preview
            </h3>

            {/* Avatar preview */}
            <div className="flex flex-col items-center text-center mb-5">
              <div className="relative mb-3">
                <img
                  src={avatar}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 bg-[#f8bc22] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                  ADMIN
                </span>
              </div>
              <h4 className="text-base font-black text-[#63714e] leading-tight">
                {formData.nama || "—"}
              </h4>
              <p className="text-[10px] text-[#63714e]/60 mt-0.5">
                {formData.email || "—"}
              </p>
              <p className="text-[10px] text-[#63714e]/60">
                {formData.phone || "—"}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 flex-1 overflow-y-auto">
              <div className="flex items-start gap-2">
                <Store size={12} className="text-[#f8bc22] mt-0.5" />
                <p className="text-[10px] text-[#63714e] font-semibold leading-tight">
                  {formData.toko || "—"}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={12} className="text-[#f8bc22] mt-0.5" />
                <p className="text-[10px] text-[#63714e]/70 leading-tight">
                  {formData.alamat || "—"}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <FileText size={12} className="text-[#f8bc22] mt-0.5" />
                <p className="text-[10px] text-[#63714e]/70 leading-tight line-clamp-4">
                  {formData.deskripsi || "—"}
                </p>
              </div>
            </div>

            {/* Hint */}
            <div className="mt-4 px-3 py-2.5 bg-[#f8bc22]/10 rounded-xl">
              <p className="text-[9px] text-[#63714e]/70 font-semibold text-center leading-relaxed">
                Preview diperbarui otomatis saat kamu mengedit form
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Modals ── */}
      {showConfirm && (
        <ConfirmModal
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            setShowSuccess(true);
          }}
        />
      )}

      {showSuccess && <SuccessModal onDone={() => navigate("/admin/profil")} />}
    </main>
  );
};

export default EditProfilAdmin;

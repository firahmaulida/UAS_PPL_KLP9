import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarAdmin from "../../components/SideBarAdmin";
import {
  Bell,
  ChevronDown,
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
          <LockKeyhole size={28} className="text-[#f8bc22]" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">
          Konfirmasi Perubahan
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Apakah kamu yakin ingin mengganti password? Kamu perlu login ulang
          setelah perubahan.
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
          <BadgeCheck size={32} className="text-green-500" />
        </div>
        <h2 className="font-black text-[#63714e] text-lg">
          Password Diperbarui!
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Password admin berhasil diganti. Gunakan password baru saat login
          berikutnya.
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

/* ─── Password strength helper ─────────────────────────────── */
function getStrength(password) {
  if (password.length === 0) return null;
  if (password.length > 10)
    return {
      label: "Kuat",
      color: "bg-green-500",
      width: "w-full",
      text: "text-green-600",
    };
  if (password.length > 5)
    return {
      label: "Sedang",
      color: "bg-yellow-400",
      width: "w-2/3",
      text: "text-yellow-600",
    };
  return {
    label: "Lemah",
    color: "bg-red-400",
    width: "w-1/3",
    text: "text-red-500",
  };
}

/* ─── Password Field ───────────────────────────────────────── */
function PasswordField({ label, name, value, onChange, show }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-[#63714e]/70 px-1">
        {label}
      </label>
      <div className="bg-[#7d8767] rounded-2xl px-4 py-3 flex items-center gap-3 shadow-inner">
        <LockKeyhole size={15} className="text-white" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Masukkan ${label.toLowerCase()}...`}
          className="w-full bg-transparent outline-none text-white text-sm placeholder:text-white/50"
        />
      </div>
    </div>
  );
}

/* ─── Security Tip Item ────────────────────────────────────── */
function SecurityItem({ icon, title, text }) {
  return (
    <div className="bg-[#f7f8ef] rounded-2xl p-3.5 shadow-sm">
      <div className="flex items-center gap-2 mb-1 text-[#63714e] font-bold text-sm">
        {icon}
        {title}
      </div>
      <p className="text-xs text-[#63714e]/70 leading-relaxed">{text}</p>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export const GantiPasswordAdmin = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.lama || !form.baru || !form.konfirmasi) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (form.baru !== form.konfirmasi) {
      setError("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    setShowConfirm(true);
  };

  const strength = getStrength(form.baru);

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
          {/* ── Form panel ── */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#63714e]">
                  Ganti Password
                </h2>
                <p className="text-xs text-[#63714e]/70 mt-0.5">
                  Perbarui keamanan akun admin
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/profil")}
                className="px-5 py-2 rounded-full border border-[#63714e] text-[#63714e] text-sm font-bold flex items-center gap-2 hover:bg-[#63714e]/10 transition-all"
              >
                <ArrowLeft size={15} />
                Kembali
              </button>
            </div>

            {/* Form card */}
            <div className="flex-1 bg-white/60 backdrop-blur-2xl shadow-2xl border border-white/40 px-8 py-7 flex flex-col justify-between overflow-hidden">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 h-full justify-between"
              >
                <div className="space-y-4">
                  <PasswordField
                    label="Password Lama"
                    name="lama"
                    value={form.lama}
                    onChange={handleChange}
                    show={show}
                  />

                  <div className="space-y-1.5">
                    <PasswordField
                      label="Password Baru"
                      name="baru"
                      value={form.baru}
                      onChange={handleChange}
                      show={show}
                    />
                    {/* Strength bar */}
                    {strength && (
                      <div className="px-1">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                          />
                        </div>
                        <p
                          className={`text-[10px] font-bold mt-1 ${strength.text}`}
                        >
                          Kekuatan: {strength.label}
                        </p>
                      </div>
                    )}
                  </div>

                  <PasswordField
                    label="Konfirmasi Password Baru"
                    name="konfirmasi"
                    value={form.konfirmasi}
                    onChange={handleChange}
                    show={show}
                  />

                  {/* Error */}
                  {error && (
                    <p className="text-xs text-red-500 font-bold px-1">
                      {error}
                    </p>
                  )}

                  {/* Show toggle */}
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-xs text-[#63714e] flex items-center gap-2 hover:opacity-70 transition-all"
                  >
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                    {show ? "Sembunyikan Password" : "Tampilkan Password"}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-black py-3 rounded-2xl shadow-lg transition-all text-sm"
                >
                  Simpan Password Baru
                </button>
              </form>
            </div>
          </div>

          {/* ── Tips panel ── */}
          <div className="w-72 bg-white/55 backdrop-blur-2xl shadow-2xl border border-white/40 px-6 py-6 flex flex-col overflow-hidden">
            <h3 className="text-base font-black text-[#63714e] mb-4">
              Tips Keamanan
            </h3>
            <div className="space-y-3 overflow-y-auto">
              <SecurityItem
                icon={<ShieldCheck size={15} />}
                title="Gunakan kombinasi unik"
                text="Campurkan huruf besar, kecil, angka, dan simbol agar lebih aman."
              />
              <SecurityItem
                icon={<KeyRound size={15} />}
                title="Minimal 8 karakter"
                text="Password yang lebih panjang jauh lebih sulit ditebak."
              />
              <SecurityItem
                icon={<BadgeCheck size={15} />}
                title="Jangan pakai data pribadi"
                text="Hindari nama, tanggal lahir, atau nomor telepon sebagai password."
              />
              <SecurityItem
                icon={<LockKeyhole size={15} />}
                title="Ganti secara berkala"
                text="Disarankan mengganti password admin setiap 3 bulan sekali."
              />
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

export default GantiPasswordAdmin;

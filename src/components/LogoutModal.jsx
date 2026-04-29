import React from "react";
import { CircleAlert } from "lucide-react";

const LogoutModal = ({ onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-[35px] shadow-2xl px-8 py-10 text-center">
        <h2 className="text-3xl font-black text-[#63714e] mb-3">
          Yakin Keluar Akun
        </h2>

        <p className="text-sm text-black leading-snug mb-8">
          Anda perlu masuk lagi jika ingin
          <br />
          melanjutkan aktivitas sebelumnya
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#d8422e] rounded-full flex items-center justify-center shadow-lg">
            <CircleAlert size={50} color="white" strokeWidth={2.8} />
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold px-10 py-2.5 rounded-2xl shadow-md transition-all"
          >
            Batal
          </button>

          <button
            onClick={onLogout}
            className="bg-[#f8bc22] hover:bg-[#e4aa16] text-white font-bold px-10 py-2.5 rounded-2xl shadow-md transition-all"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
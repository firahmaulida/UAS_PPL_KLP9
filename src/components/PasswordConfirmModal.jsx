import React from "react";
import { CircleAlert } from "lucide-react";

const PasswordConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-[35px] shadow-2xl px-8 py-10 text-center">
        <h2 className="text-3xl font-black text-[#63714e] mb-3">
          Ganti Password?
        </h2>

        <p className="text-sm text-black leading-snug mb-8">
          Pastikan password baru yang Anda isi
          <br />
          sudah sesuai dan aman digunakan
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#d8422e] rounded-full flex items-center justify-center shadow-lg">
            <CircleAlert size={50} color="white" strokeWidth={2.8} />
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <button onClick={onClose} className="bg-[#f8bc22] text-white font-bold px-8 py-2.5 rounded-2xl">
            Kembali
          </button>

          <button onClick={onConfirm} className="bg-[#f8bc22] text-white font-bold px-8 py-2.5 rounded-2xl">
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmModal;
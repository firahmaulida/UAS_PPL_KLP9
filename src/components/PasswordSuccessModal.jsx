import React from "react";
import { CircleCheckBig } from "lucide-react";

const PasswordSuccessModal = ({ onDone }) => {
  return (
    <div className="fixed inset-0 bg-black/25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-[35px] shadow-2xl px-8 py-10 text-center">
        <h2 className="text-3xl font-black text-[#63714e] mb-3">
          Password Berhasil Diganti
        </h2>

        <p className="text-sm text-black leading-snug mb-8">
          Password akun Anda telah berhasil
          <br />
          diperbarui dan siap digunakan
        </p>

        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#5f8b4c] rounded-full flex items-center justify-center shadow-lg">
            <CircleCheckBig size={50} color="white" strokeWidth={2.8} />
          </div>
        </div>

        <button onClick={onDone} className="bg-[#f8bc22] text-white font-bold px-10 py-2.5 rounded-2xl">
          Oke
        </button>
      </div>
    </div>
  );
};

export default PasswordSuccessModal;
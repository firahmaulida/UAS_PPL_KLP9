import React from "react";
import { useNavigate } from "react-router-dom";

const MenuDetailModal = ({ menu, onClose }) => {
  const navigate = useNavigate();

  if (!menu) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="bg-white w-[430px] rounded-[35px] shadow-2xl px-10 py-8">
        <h2 className="text-3xl font-black text-[#63714e] text-center mb-6">
          {menu.name}
        </h2>

        <img
          src={menu.img}
          alt=""
          className="w-full h-48 object-cover rounded-3xl mb-5"
        />

        <h3 className="font-bold text-[#63714e] text-lg">
          {menu.name} <span className="font-medium">({menu.store})</span>
        </h3>

        <p className="text-2xl font-black text-[#63714e] mt-2">{menu.price}</p>
        <p className="text-sm text-[#63714e]/70 mb-4">Hemat 30 %</p>

        <p className="text-sm leading-relaxed text-gray-700 mb-4">
          Donat empuk dengan taburan gula halus klasik yang lembut dan manis.
          Cocok untuk teman minum kopi dan teh.
        </p>

        <p className="text-sm text-black mb-1">
          <span className="font-bold">Produksi:</span> 10 April 2026
        </p>

        <p className="text-sm text-black mb-6">
          <span className="font-bold text-red-500">Kadaluwarsa:</span> Berlaku untuk konsumsi besok pagi hingga pukul 10.00 WIB.
        </p>

        <div className="flex justify-between gap-5">
          <button
            onClick={onClose}
            className="flex-1 bg-[#f8bc22] text-white font-bold py-3 rounded-2xl"
          >
            Kembali
          </button>

          <button
            onClick={() => navigate("/pesan")}
            className="flex-1 bg-[#f8bc22] text-white font-bold py-3 rounded-2xl"
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuDetailModal;
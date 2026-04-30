import React from "react";
import { MapPin, Clock3, Star, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import food2 from "../assets/chat2.png";

const StoreDetailModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleVisitMenu = () => {
    onClose();
    navigate("/merchantmenu");
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-40">
      <div className="bg-white rounded-4xl shadow-2xl w-130 overflow-hidden animate-fadeIn">
        
        {/* HEADER IMAGE */}
        <div className="relative h-44">
          <img src={food2} alt="store" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"></div>
        </div>

        {/* BODY */}
        <div className="p-8">
          {/* STORE TITLE */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-3xl bg-[#f8bc22] flex items-center justify-center text-white shadow-md">
              <Store size={24} />
            </div>

            <div>
              <h2 className="text-[28px] font-black text-[#63714e] leading-none">
                PASTELERIA aAzicaR
              </h2>
              <p className="text-sm text-gray-500 mt-1">Bakery Food Waste Partner</p>
            </div>
          </div>

          {/* STORE INFO */}
          <div className="space-y-3 text-sm text-[#63714e] mb-6 border-y border-gray-100 py-5">
            <p className="flex items-center gap-2">
              <MapPin size={15} /> Jl. Lamgugop, Banda Aceh
            </p>

            <p className="flex items-center gap-2">
              <Clock3 size={15} /> Buka setiap hari • 08.00 - 22.00 WIB
            </p>

            <p className="flex items-center gap-2">
              <Star size={15} /> Rating 4.8 dari 124 ulasan pelanggan
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-[#f7f8ef] rounded-3xl p-5 mb-7">
            <h4 className="font-bold text-[#63714e] mb-2 text-base">Tentang Merchant</h4>
            <p className="text-sm text-[#63714e]/80 leading-relaxed">
              Merchant bakery premium yang menyediakan berbagai makanan rescue
              berkualitas dengan harga hemat. Cocok untuk pelanggan yang ingin
              menikmati hidangan lezat sambil berkontribusi mengurangi food waste.
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex gap-4">
            <button
              onClick={handleVisitMenu}
              className="flex-1 bg-[#f8bc22] hover:bg-[#e8ae17] transition-all text-white py-3 rounded-full font-bold shadow-md"
            >
              Kunjungi Menu
            </button>

            <button
              onClick={onClose}
              className="flex-1 border border-[#63714e] text-[#63714e] py-3 rounded-full font-bold hover:bg-[#63714e] hover:text-white transition-all"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailModal;
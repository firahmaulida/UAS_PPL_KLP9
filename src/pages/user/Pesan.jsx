import React, { useState } from "react";
import SideBar from "../../components/SideBar";
// Import Ikon dari Lucide
import { Bell, Search, Send, Plus, MessageCircle } from "lucide-react";

// Import Assets (Pastikan path folder assets benar)
import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import chat1 from "../../assets/chat1.png";

export const PesanUser = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [inputText, setInputText] = useState("");

  const conversations = [
    { id: 1, name: "Bakery Corner", msg: "Terima kasih kak <3", time: "10 m ago", img: chat1 },
    { id: 2, name: "Donut Shop", msg: "Pesanan sedang diproses", time: "1 h ago", img: chat1 },
    { id: 3, name: "Coffee Bean", msg: "Siap kak, ditunggu ya", time: "2 h ago", img: chat1 },
  ];

  const activeChat = conversations.find((c) => c.id === selectedId);

  return (
    <main 
      className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans"
      onClick={() => setSelectedId(null)}
    >
      {/* --- 1. BACKGROUND (Full Screen) --- */}
      <div className="fixed inset-0 z-0 flex w-full h-full pointer-events-none">
        <img className="w-1/2 h-full object-cover opacity-80" src={bgUtama} alt="" />
        <img className="w-1/2 h-full object-cover opacity-60" src={bgUtama} alt="" />
      </div>

      {/* --- 2. HEADER LOGO (Pojok Atas) --- */}
      <header className="absolute top-6 left-12 z-30" onClick={(e) => e.stopPropagation()}>
        <div className="px-7 py-3 bg-[#63714ed1] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-xl border border-white/20">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      {/* --- 3. TOP RIGHT (Bell & Profile) --- */}
      <div className="absolute top-6 right-12 flex items-center gap-6 z-30" onClick={(e) => e.stopPropagation()}>
        <button className="w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all text-[#63714e]">
          <Bell size={24} strokeWidth={2.5} />
        </button>
        <div className="p-0.5 bg-white rounded-full shadow-lg border border-gray-100 overflow-hidden">
          <img src={userProfil} alt="User" className="w-12 h-12 rounded-full object-cover" />
        </div>
      </div>

      {/* --- 4. KONTEN UTAMA (Sidebar & Chat Box) --- 
          Posisi left-12 agar lurus sejajar dengan Logo di atasnya.
          Menggunakan items-stretch agar tinggi Sidebar & Chat selalu sama.
      */}
      <div className="absolute top-24 left-12 right-12 bottom-10 flex items-stretch gap-10 z-10">
        
        {/* Sidebar (Diletakkan lurus di bawah Logo) */}
        <div onClick={(e) => e.stopPropagation()} className="h-full">
          <SideBar activePage="pesan" />
        </div>

        {/* Panel List Obrolan */}
        <section 
          className="w-90 bg-white/40 backdrop-blur-2xl rounded-4xl shadow-xl border border-white/40 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="relative flex items-center bg-white rounded-full px-5 py-3 shadow-sm border border-gray-100 group">
              <input 
                type="text" 
                placeholder="Cari Toko..." 
                className="bg-transparent outline-none text-sm flex-1 text-gray-700"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search size={18} className="text-gray-400 group-focus-within:text-[#63714e]" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 scrollbar-hide">
            {conversations.map((c) => (
              <button 
                key={c.id} 
                onClick={() => setSelectedId(c.id)}
                className={`w-full flex items-center p-4 rounded-[2.5rem] transition-all border-2 ${
                  selectedId === c.id ? "bg-white border-[#f8bc22] shadow-lg scale-[1.02]" : "bg-white/30 border-transparent hover:bg-white/60"
                }`}
              >
                <img src={c.img} alt="" className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" />
                <div className="ml-4 text-left">
                  <h4 className="text-[#63714e] font-black text-sm leading-tight">{c.name}</h4>
                  <p className="text-[10px] text-gray-500 font-medium mt-1 truncate w-32">{c.msg}</p>
                </div>
                <span className="text-[9px] text-gray-400 font-bold mb-1">{c.time}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Panel Detail Chat */}
        <section 
          className="flex-1 bg-white/80 backdrop-blur-3xl rounded-4xl shadow-2xl border border-white/50 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {activeChat ? (
            <>
              {/* Header Chat */}
              <div className="px-10 py-6 border-b border-gray-100 flex items-center gap-4 bg-white/40">
                <img src={activeChat.img} alt="" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                <div>
                  <h3 className="text-[#63714e] font-extrabold text-lg">{activeChat.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>

              {/* Chat Content Area */}
              <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                <div className="flex items-end gap-3">
                  <img src={activeChat.img} alt="" className="w-8 h-8 rounded-full shadow-sm" />
                  <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-none shadow-sm max-w-sm border border-gray-100">
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">Halo Kak, Sisa Stok Donat Gula hari ini sisa 3 kak.</p>
                  </div>
                </div>

                <div className="flex items-end gap-3 self-end">
                  <div className="bg-[#f8bc2235] p-4 rounded-2xl rounded-br-none shadow-sm max-w-sm">
                    <p className="text-sm text-gray-800 font-bold italic">Iya kak, ambil semua berapa totalnya?</p>
                  </div>
                  <img src={userProfil} alt="" className="w-8 h-8 rounded-full shadow-sm" />
                </div>

                <div className="ml-12 bg-[#63714e] p-4 rounded-3xl rounded-bl-none max-w-sm shadow-lg text-white font-bold">
                   21.000 kak, kami tunggu di toko ya!
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-6 bg-white/40 border-t border-gray-100">
                <div className="flex items-center gap-4 bg-white rounded-3xl px-6 py-3 shadow-inner border border-gray-100">
                  <Plus size={22} className="text-gray-400 cursor-pointer hover:text-[#63714e]" />
                  <input 
                    type="text" 
                    placeholder="Tulis pesan..." 
                    className="flex-1 text-sm outline-none bg-transparent text-gray-800"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button className={`p-3 rounded-2xl transition-all shadow-md ${inputText ? 'bg-[#63714e] text-white' : 'bg-gray-100 text-gray-300'}`}>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Tampilan Default saat belum ada obrolan yang dipilih */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-5">
              <div className="w-24 h-24 bg-[#63714e]/10 rounded-full flex items-center justify-center shadow-inner">
                <MessageCircle size={48} className="text-[#63714e] opacity-30" />
              </div>
              <h2 className="text-2xl font-black text-[#63714e]">Pesan Anda</h2>
              <p className="text-sm text-gray-400 max-w-60 font-medium leading-relaxed">
                Pilih salah satu toko di samping untuk memulai diskusi.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
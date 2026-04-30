import React, { useState } from "react";
import {
  Bell,
  Search,
  Send,
  Plus,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

import SideBarAdmin from "../../components/SideBarAdmin";

import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import chat1 from "../../assets/image.png";

/* ─── Dummy data ───────────────────────────────────────────── */
const conversations = [
  {
    id: 1,
    name: "Firah Maulida",
    msg: "Terima kasih kak sudah order!",
    time: "10 m ago",
    img: chat1,
    role: "Pembeli",
    messages: [
      {
        from: "them",
        text: "Halo Admin, stok Donat Gula hari ini sisa 3 kak.",
      },
      { from: "me", text: "Oke, sudah diupdate di sistem ya, terima kasih!" },
      { from: "them", text: "Siap Admin, terima kasih kak <3" },
    ],
  },
  {
    id: 2,
    name: "Rasya Tazkiya",
    msg: "Brownies mau kita diskon 50%",
    time: "1 j ago",
    img: chat1,
    role: "Pembeli",
    messages: [
      {
        from: "them",
        text: "Admin, boleh kami turunkan harga Brownies jadi 50%?",
      },
      { from: "me", text: "Boleh, silakan update melalui halaman List Menu." },
    ],
  },
  {
    id: 3,
    name: "Caesar",
    msg: "Menu kami sudah diperpanjang",
    time: "2 j ago",
    img: chat1,
    role: "Pembeli",
    messages: [
      {
        from: "them",
        text: "Admin, expired date Soto Ayam sudah kami perpanjang.",
      },
      { from: "me", text: "Baik, kami sudah melihat perubahan di sistem." },
      { from: "them", text: "Terima kasih Admin!" },
    ],
  },
];

/* ─── Main Component ───────────────────────────────────────── */
export const PesanAdmin = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [allConversations, setAllConversations] = useState(conversations);

  const activeChat = allConversations.find((c) => c.id === selectedId);

  const filtered = allConversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.msg.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const sendMessage = () => {
    if (!inputText.trim() || !selectedId) return;
    setAllConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              msg: inputText,
              messages: [...c.messages, { from: "me", text: inputText }],
            }
          : c,
      ),
    );
    setInputText("");
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
          <SideBarAdmin activePage="pesanAdmin" />
        </div>

        {/* ── Chat list panel ── */}
        <section className="w-72 bg-white/40 backdrop-blur-2xl rounded-[28px] shadow-xl border border-white/40 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-4">
            <h2 className="text-base font-black text-[#63714e] mb-3 px-1">
              Pesan Masuk
            </h2>
            <div className="flex items-center bg-white rounded-full px-4 py-2.5 shadow-sm border border-gray-100 gap-2">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Cari toko atau pembeli..."
                className="bg-transparent outline-none text-xs flex-1 text-gray-700"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-[20px] transition-all border-2 text-left ${
                  selectedId === c.id
                    ? "bg-white border-[#f8bc22] shadow-md scale-[1.01]"
                    : "bg-white/30 border-transparent hover:bg-white/60"
                }`}
              >
                <div className="relative">
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                      c.role === "Pembeli"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-[#63714e]/10 text-[#63714e]"
                    }`}
                  >
                    {c.role}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[#63714e] font-black text-xs truncate leading-tight">
                      {c.name}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-bold ml-1">
                      {c.time}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">
                    {c.msg}
                  </p>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-8">
                Tidak ada pesan ditemukan.
              </p>
            )}
          </div>
        </section>

        {/* ── Chat detail panel ── */}
        <section className="flex-1 bg-white/80 backdrop-blur-3xl rounded-[28px] shadow-2xl border border-white/50 flex flex-col overflow-hidden">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white/40">
                <div className="flex items-center gap-4">
                  <img
                    src={activeChat.img}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                  />
                  <div>
                    <h3 className="text-[#63714e] font-black text-base leading-tight">
                      {activeChat.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          activeChat.role === "Pembeli"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-[#63714e]/10 text-[#63714e]"
                        }`}
                      >
                        {activeChat.role}
                      </span>
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[9px] text-green-600 font-bold uppercase tracking-widest">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-8 py-6 flex flex-col gap-4 overflow-y-auto">
                {activeChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex items-end gap-3 ${msg.from === "me" ? "self-end flex-row-reverse" : ""}`}
                  >
                    <img
                      src={msg.from === "me" ? userProfil : activeChat.img}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shadow-sm"
                    />
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-sm text-sm font-medium leading-relaxed shadow-sm ${
                        msg.from === "me"
                          ? "bg-[#63714e] text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-5 bg-white/40 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-inner border border-gray-100">
                  <Plus
                    size={20}
                    className="text-gray-400 cursor-pointer hover:text-[#63714e]"
                  />
                  <input
                    type="text"
                    placeholder="Tulis balasan..."
                    className="flex-1 text-sm outline-none bg-transparent text-gray-800"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className={`p-2.5 rounded-xl transition-all shadow-sm ${
                      inputText.trim()
                        ? "bg-[#f8bc22] text-white hover:bg-[#e4aa16]"
                        : "bg-gray-100 text-gray-300"
                    }`}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-16 gap-5">
              <div className="w-24 h-24 bg-[#63714e]/10 rounded-full flex items-center justify-center">
                <MessageCircle
                  size={44}
                  className="text-[#63714e] opacity-30"
                />
              </div>
              <h2 className="text-2xl font-black text-[#63714e]">
                Kotak Pesan
              </h2>
              <p className="text-sm text-gray-400 max-w-56 leading-relaxed">
                Pilih percakapan di sebelah kiri untuk membaca dan membalas
                pesan.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PesanAdmin;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
import chat1 from "../../assets/chat1.png";

export const PesanAdmin = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [allConversations, setAllConversations] = useState([]);
  const bottomRef = useRef(null);

  const API = "http://localhost:3000/api";

  const currentUser =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(localStorage.getItem("userData")) ||
    {};

  const currentUserId = currentUser.id || null;

  const fetchAdminRooms = async () => {
    if (!currentUserId) return;

    try {
      const res = await axios.get(`${API}/chat?toko_id=${currentUserId}`);

      const data = res.data.map((item) => ({
        id: item.id,
        user_id: item.user_id,
        toko_id: item.toko_id,
        name: item.nama_pengguna || "Pengguna",
        msg: item.last_message || "Belum ada pesan",
        time: item.last_time
          ? new Date(item.last_time).toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        img: item.user_foto
          ? `http://localhost:3000/uploads/${item.user_foto}`
          : chat1,
        messages:
          allConversations.find((x) => x.id === item.id)?.messages || [],
      }));

      setAllConversations(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdminRooms();
    const interval = setInterval(fetchAdminRooms, 2000);
    return () => clearInterval(interval);
  }, [currentUserId, allConversations]);

  const fetchMessages = async (chatId) => {
    const res = await axios.get(`${API}/chat/${chatId}`);

    const msgs = res.data.map((m) => ({
      from: m.sender_id === currentUserId ? "me" : "them",
      text: m.message,
    }));

    setAllConversations((prev) =>
      prev.map((item) =>
        item.id === chatId ? { ...item, messages: msgs } : item,
      ),
    );

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (!selectedId) return;

    fetchMessages(selectedId);
    const interval = setInterval(() => fetchMessages(selectedId), 1500);
    return () => clearInterval(interval);
  }, [selectedId]);

  const sendMessage = async () => {
    if (!inputText.trim() || !selectedId) return;

    await axios.post(`${API}/chat`, {
      chat_id: selectedId,
      sender_id: currentUserId,
      message: inputText,
    });

    setInputText("");
    fetchMessages(selectedId);
    fetchAdminRooms();
  };

  const filtered = allConversations.filter((c) =>
    c.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const activeChat = allConversations.find((c) => c.id === selectedId);

  return (
    <main className="relative w-screen h-screen bg-[#effae8] overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 flex pointer-events-none">
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-70"
        />
        <img
          src={bgUtama}
          alt=""
          className="w-1/2 h-full object-cover opacity-55"
        />
      </div>

      <header className="absolute top-6 left-12 z-30">
        <div className="px-7 py-3 bg-[#63714ed1] rounded-3xl shadow-xl">
          <h1 className="text-2xl font-black italic text-white">
            Food <span className="text-[#eb9f29]">Waste</span>
          </h1>
        </div>
      </header>

      <div className="absolute top-24 left-12 right-12 bottom-4 flex gap-4 z-10 overflow-hidden">
        <SideBarAdmin activePage="pesanAdmin" />

        <section className="w-80 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl flex flex-col overflow-hidden">
          <div className="p-4">
            <h2 className="text-lg font-black text-[#63714e] mb-3">
              Pesan Masuk
            </h2>
            <div className="flex items-center bg-white rounded-full px-4 py-3 gap-2">
              <Search size={15} className="text-gray-400" />
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari pembeli..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className="w-full flex items-center gap-3 p-3 rounded-3xl bg-white hover:bg-gray-50"
              >
                <img src={c.img} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex-1 text-left">
                  <h4 className="font-black text-sm text-[#63714e]">
                    {c.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{c.msg}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex-1 bg-white/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {activeChat ? (
            <>
              <div className="px-8 py-5 border-b font-black text-[#63714e]">
                {activeChat.name}
              </div>
              <div className="flex-1 px-8 py-6 overflow-y-auto flex flex-col gap-4">
                {activeChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-5 py-3 rounded-3xl max-w-md text-sm ${msg.from === "me" ? "bg-[#63714e] text-white" : "bg-white shadow"}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef}></div>
              </div>
              <div className="p-5 border-t bg-white/50 flex gap-3">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Tulis balasan..."
                  className="flex-1 bg-white rounded-2xl px-5 py-3 outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#f8bc22] text-white px-5 rounded-2xl"
                >
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Pilih percakapan
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PesanAdmin;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Bell, Search, Send, Plus, MessageCircle, Store } from "lucide-react";
import SideBarAdmin from "../../components/SideBarAdmin";
import NotifDropdown from "../../components/NotifDropdown";
import bgUtama from "../../assets/image.png";
import userProfil from "../../assets/Rectangle.png";
import chat1 from "../../assets/chat1.png";
import NotificationBell from "../../components/NotificationBell";

const API = "http://localhost:3000/api";

const getCurrentAdminId = () => {
  try {
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("userData")) ||
      {};
    return user.id || null;
  } catch {
    return null;
  }
};

export const PesanAdmin = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  const adminId = getCurrentAdminId();

  const fetchRooms = async () => {
    if (!adminId) return;
    try {
      const res = await axios.get(`${API}/chat/admin/${adminId}`);
      const data = res.data.data || [];

      const rooms = Array.isArray(data)
        ? data.map((item) => ({
            id: item.id,
            user_id: item.user_id,
            toko_id: item.toko_id,
            name: item.nama_lengkap || "Pengguna",
            msg: item.last_message || "Belum ada pesan",
            time: item.last_time
              ? new Date(item.last_time).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "recent",
            img: item.user_foto
              ? `http://localhost:3000/uploads/${item.user_foto}`
              : chat1,
            unread_count: item.unread_count || 0
          }))
        : [];

      setChats(rooms);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 2500);
    return () => clearInterval(interval);
  }, [adminId]);

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`${API}/chat/user/messages/${chatId}`);
      const newMessages = res.data.data || [];
      setMessages(newMessages);

      // Cek apakah ada pesan dari lawan yang belum dibaca
      const hasUnread = newMessages.some(m => Number(m.sender_id) !== Number(adminId) && !m.is_read);
      if (hasUnread) {
        axios.put(`${API}/chat/read/${chatId}`, { user_id: adminId }).catch(console.error);
      }

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedChat) return;

    fetchMessages(selectedChat.id);
    const interval = setInterval(() => fetchMessages(selectedChat.id), 1500);
    return () => clearInterval(interval);
  }, [selectedChat, adminId]);

  
  const sendMessage = async () => {
    if (!inputText.trim() || !selectedChat) return;

    const text = inputText.trim();
    setInputText("");

    try {
      await axios.post(`${API}/chat/admin/send`, {
        chat_id: selectedChat.id,
        admin_id: adminId,
        message: text,
      });

      fetchMessages(selectedChat.id);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

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

      <div className="absolute top-6 right-12 flex items-center gap-5 z-30">
        <NotificationBell />
        <img
          src={userProfil}
          alt=""
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
      </div>

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

          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 scrollbar-hide">
            {loading && (
              <p className="text-center text-xs text-gray-400 py-6">
                Memuat pesan...
              </p>
            )}
            {filteredChats.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChat(c)}
                className={`w-full flex items-center gap-3 p-4 rounded-[2.5rem] transition-all border-2 text-left ${selectedChat?.id === c.id ? "bg-white border-[#f8bc22] shadow-md scale-[1.01]" : "bg-white/30 border-transparent hover:bg-white/60"}`}
              >
                <img src={c.img} alt="" className="w-11 h-11 rounded-full" />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between">
                    <h4 className="font-black text-sm text-[#63714e] truncate">
                      {c.name}
                    </h4>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-gray-400">{c.time}</span>
                      {c.unread_count > 0 && selectedChat?.id !== c.id && (
                         <span className="bg-[#f8bc22] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                           {c.unread_count}
                         </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.msg}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex-1 bg-white/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {selectedChat ? (
            <>
              <div className="px-8 py-5 border-b bg-white/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f8bc22] flex items-center justify-center text-white">
                  <Store size={20} />
                </div>
                <div>
                  <h3 className="font-black text-[#63714e]">
                    {selectedChat.name}
                  </h3>
                  <p className="text-xs text-green-600 font-bold">
                    Pengguna
                  </p>
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
                {messages.map((m, i) => {
                  const isMe = Number(m.sender_id) === Number(adminId);
                  return (
                    <div key={i} className={`flex items-end gap-3 w-full ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                      <img 
                        src={isMe ? userProfil : (selectedChat.img || chat1)} 
                        className="w-8 h-8 rounded-full shadow-sm object-cover" 
                      />

                      <div className={`p-3 rounded-2xl max-w-[75%] shadow-sm ${
                        isMe
                          ? "bg-[#dcf8c6] text-gray-800 rounded-br-none" 
                          : "bg-white border text-gray-800 rounded-bl-none"
                      }`}>
                        <p className="text-sm">{m.message}</p>
                        {isMe && (
                          <div className="flex justify-end mt-1">
                            <span className={`text-[10px] ${m.is_read ? "text-blue-500" : "text-gray-400"}`}>
                              {m.is_read ? "✓✓" : "✓"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef}></div>
              </div>

              <div className="p-5 border-t bg-white/50">
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3">
                  <Plus size={18} className="text-gray-400" />
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Tulis balasan..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputText.trim()}
                    className={`p-3 rounded-2xl transition-all shadow-md ${inputText.trim() ? 'bg-[#f8bc22] text-white' : 'bg-gray-100 text-gray-300'}`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-400">
              <MessageCircle size={40} />
              <p>Pilih percakapan</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PesanAdmin;

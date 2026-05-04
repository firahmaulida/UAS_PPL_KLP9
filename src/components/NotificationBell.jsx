import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const NotificationBell = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [notifCount, setNotifCount] = useState(0);
  const [notifData, setNotifData] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const loadNotif = async () => {
    if (!currentUser?.id) return;

    try {
      const countRes = await fetch(
        `http://localhost:3000/api/notifikasi/count/${currentUser.id}`,
      );
      const countJson = await countRes.json();
      setNotifCount(countJson.total || 0);

      const notifRes = await fetch(
        `http://localhost:3000/api/notifikasi/${currentUser.id}`,
      );
      const notifJson = await notifRes.json();
      setNotifData(notifJson);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadNotif();

    const interval = setInterval(() => {
      loadNotif();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const bukaNotif = async () => {
    setShowNotif(!showNotif);

    if (!showNotif) {
      await fetch(
        `http://localhost:3000/api/notifikasi/read/${currentUser.id}`,
        {
          method: "PUT",
        },
      );
      setNotifCount(0);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={bukaNotif}
        className="relative w-11 h-11 bg-[#f8bc22] rounded-full flex items-center justify-center shadow-lg text-[#63714e]"
      >
        <Bell size={23} strokeWidth={2.5} />

        {notifCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 px-1 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
            {notifCount}
          </span>
        )}
      </button>

      {showNotif && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-[25px] shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
          <div className="flex items-center justify-between px-5 py-4 bg-[#63714e] text-white">
            <h3 className="font-bold text-sm">Notifikasi</h3>
            <button onClick={() => setShowNotif(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifData.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">
                Belum ada notifikasi.
              </div>
            ) : (
              notifData.map((item) => (
                <div
                  key={item.id}
                  className={`px-5 py-4 border-b text-left ${
                    item.is_read === 0 ? "bg-[#f7f8ef]" : "bg-white"
                  }`}
                >
                  <h4 className="text-sm font-bold text-[#63714e]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

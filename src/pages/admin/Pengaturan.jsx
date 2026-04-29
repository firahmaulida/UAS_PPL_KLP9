import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

const Pengaturan = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    notifApp: true,
    notifEmail: false,
    autoSave: true,
    location: true,
    darkMode: false,
  });

  const toggle = (key) => {
    setState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const ToggleRow = ({ title, desc, value, onClick }) => {
    return (
      <div className="flex items-center justify-between py-4">
        <div>
          <p className="text-[#455538] font-semibold">{title}</p>
          {desc && (
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
          )}
        </div>

        <button
          onClick={onClick}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
            value ? "bg-[#455538]" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transform transition-all duration-300 ${
              value ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#effae8]">

      <SideBar activePage="settings" />

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#455538]">
              Pengaturan
            </h1>
            <p className="text-gray-600 text-sm">
              Kelola akun, sistem, dan preferensi aplikasi
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-[#455538] text-[#455538] rounded-full hover:bg-[#455538] hover:text-white transition"
          >
            ← Kembali
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PROFILE */}
          <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center text-center">

            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />

            <h2 className="text-lg font-bold text-[#455538]">
              Klp 09 PPL
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              admin@email.com
            </p>

            <button
              onClick={() => navigate("/edit-profil")}
              className="w-full bg-[#F8BC22] text-white py-2 rounded-2xl font-semibold hover:opacity-90"
            >
              Edit Profil
            </button>
          </div>

          {/* SETTINGS AREA */}
          <div className="lg:col-span-2 space-y-6">

            {/* NOTIFIKASI */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-[#455538] mb-2">
                Notifikasi
              </h2>

              <ToggleRow
                title="Notifikasi Aplikasi"
                desc="Pemberitahuan dari sistem"
                value={state.notifApp}
                onClick={() => toggle("notifApp")}
              />

              <div className="border-t" />

              <ToggleRow
                title="Email Notifikasi"
                desc="Update penting via email"
                value={state.notifEmail}
                onClick={() => toggle("notifEmail")}
              />
            </div>

            {/* PREFERENSI */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-[#455538] mb-2">
                Preferensi
              </h2>

              <ToggleRow
                title="Auto Save Data"
                desc="Simpan otomatis setiap perubahan"
                value={state.autoSave}
                onClick={() => toggle("autoSave")}
              />

              <div className="border-t" />

              <ToggleRow
                title="Akses Lokasi"
                desc="Digunakan untuk optimasi sistem"
                value={state.location}
                onClick={() => toggle("location")}
              />
            </div>

            {/* TAMPILAN */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-[#455538] mb-2">
                Tampilan
              </h2>

              <ToggleRow
                title="Mode Gelap"
                desc="Kurangi kelelahan mata"
                value={state.darkMode}
                onClick={() => toggle("darkMode")}
              />
            </div>

            {/* KEAMANAN */}
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-[#455538] mb-4">
                Keamanan
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/ganti-password")}
                  className="bg-[#455538] text-white py-3 rounded-2xl font-semibold hover:opacity-90"
                >
                  Ganti Password
                </button>

                <button className="border border-red-500 text-red-500 py-3 rounded-2xl font-semibold hover:bg-red-50">
                  Logout Semua Device
                </button>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6">
              <h2 className="text-red-600 font-bold mb-2">
                Danger Zone
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Tindakan ini akan menonaktifkan akun secara sementara atau permanen.
              </p>

              <button className="bg-red-500 text-white px-6 py-2 rounded-2xl hover:opacity-90">
                Nonaktifkan Akun
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Pengaturan;
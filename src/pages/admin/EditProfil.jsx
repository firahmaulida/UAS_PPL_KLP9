import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

import userAvatar from "../../assets/Rectangle.png";
import peopleImg from "../../assets/people.png";
import emailImg from "../../assets/email.png";
import phoneImg from "../../assets/lock.png";
import tokoImg from "../../assets/toko.png";

const EditProfil = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Klp 09 PPL",
    email: "admin@email.com",
    phone: "08123456789",
    store: "Green Grocery",
    address: "Jl. Sustainability No. 42",
    desc: "Dedicated to reducing food waste and improving sustainability.",
  });

  const [avatar, setAvatar] = useState(userAvatar);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleSave = () => {
    alert("Profil berhasil disimpan 🚀");
    console.log(profile);
  };

  return (
    <div className="flex min-h-screen bg-[#effae8]">

      {/* SIDEBAR */}
      <SideBar activePage="profil" />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#455538]">
              Edit Profil Admin
            </h1>
            <p className="text-sm text-gray-600">
              Manage your profile and business information
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profil")}
              className="px-4 py-2 rounded-full border text-[#455538]"
            >
              ← Kembali
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-[#F8BC22] text-white font-semibold"
            >
              Simpan
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT FORM */}
          <section className="lg:col-span-2 space-y-6">

            {/* PROFILE CARD */}
            <div className="bg-white/80 rounded-3xl p-6 shadow">

              <h2 className="font-bold text-[#455538] mb-4">
                Informasi Akun
              </h2>

              {/* AVATAR */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={avatar}
                  className="w-24 h-24 rounded-2xl border-4 border-white shadow"
                />

                <label className="text-blue-600 text-sm cursor-pointer">
                  Ganti Foto
                  <input type="file" hidden onChange={handleImage} />
                </label>
              </div>

              {/* INPUT GRID */}
              <div className="grid md:grid-cols-2 gap-4">

                <Input icon={peopleImg} name="name" value={profile.name} onChange={handleChange} placeholder="Nama" />
                <Input icon={emailImg} name="email" value={profile.email} onChange={handleChange} placeholder="Email" />
                <Input icon={phoneImg} name="phone" value={profile.phone} onChange={handleChange} placeholder="No HP" />

              </div>
            </div>

            {/* BUSINESS CARD */}
            <div className="bg-white/80 rounded-3xl p-6 shadow">

              <h2 className="font-bold text-[#455538] mb-4">
                Informasi Bisnis
              </h2>

              <div className="space-y-4">

                <Input icon={tokoImg} name="store" value={profile.store} onChange={handleChange} placeholder="Nama Toko" />

                <Input icon={tokoImg} name="address" value={profile.address} onChange={handleChange} placeholder="Alamat Toko" />

                <textarea
                  name="desc"
                  value={profile.desc}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-4 rounded-2xl bg-[#63714ecc] text-white outline-none"
                  placeholder="Deskripsi bisnis"
                />

              </div>
            </div>

          </section>

          {/* RIGHT PREVIEW */}
          <aside className="bg-white/80 rounded-3xl p-6 shadow h-fit">

            <h2 className="font-bold text-[#455538] mb-4">
              Live Preview
            </h2>

            <div className="text-center">

              <img
                src={avatar}
                className="w-20 h-20 mx-auto rounded-full border mb-3"
              />

              <h3 className="font-bold text-[#455538]">
                {profile.name}
              </h3>

              <p className="text-sm text-gray-600">
                {profile.email}
              </p>

              <div className="mt-4 text-xs text-gray-500 space-y-1">
                <p>🏪 {profile.store}</p>
                <p>📍 {profile.address}</p>
                <p>📞 {profile.phone}</p>
              </div>

            </div>

            <div className="mt-6 p-3 bg-[#eef26b]/40 rounded-xl text-xs text-[#455538]">
              Live preview update otomatis saat kamu edit form
            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-[#63714ecc] text-white p-4 rounded-2xl">
    <img src={icon} className="w-5 h-5" />
    <input
      {...props}
      className="bg-transparent w-full outline-none text-white"
    />
  </div>
);

export default EditProfil;
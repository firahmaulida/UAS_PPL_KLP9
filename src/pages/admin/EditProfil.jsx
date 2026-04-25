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
    store: "Toko Food Waste",
  });

  const [avatar, setAvatar] = useState(userAvatar);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil berhasil diupdate 🚀");
    console.log(profile);
  };

  const field =
    "w-full h-14 flex items-center gap-3 px-5 rounded-2xl bg-[#63714ecc] text-white";

  const input =
    "flex-1 bg-transparent outline-none text-white placeholder-white text-sm";

  return (
    <div className="flex w-full h-screen bg-[#effae8]">

      {/* SIDEBAR */}
      <div className="p-4">
        <SideBar activePage="profil" />
      </div>

      {/* CONTENT */}
      <main className="flex-1 flex items-center justify-center">

        <section className="w-[500px] bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-8">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-2xl font-bold text-[#63714e]">
              Edit Profil
            </h1>

            {/* BACK BUTTON */}
            <button
              onClick={() => navigate("/profil")}
              className="text-sm text-[#63714e] hover:text-[#4f5c3d] font-medium"
            >
              ← Kembali
            </button>

          </div>

          {/* AVATAR */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={avatar}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#63714e]"
              alt="profile"
            />

            <label className="text-sm text-blue-600 mt-2 cursor-pointer">
              Ganti Foto
              <input type="file" hidden onChange={handleImage} />
            </label>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* NAME */}
            <div className={field}>
              <img src={peopleImg} className="w-5 h-5" />
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                className={input}
                placeholder="Nama"
              />
            </div>

            {/* EMAIL */}
            <div className={field}>
              <img src={emailImg} className="w-5 h-5" />
              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
                className={input}
                placeholder="Email"
              />
            </div>

            {/* PHONE */}
            <div className={field}>
              <img src={phoneImg} className="w-5 h-5" />
              <input
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className={input}
                placeholder="No HP"
              />
            </div>

            {/* STORE */}
            <div className={field}>
              <img src={tokoImg} className="w-5 h-5" />
              <input
                name="store"
                value={profile.store}
                onChange={handleChange}
                className={input}
                placeholder="Nama Toko"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-[#F8BC22] hover:bg-yellow-500 text-white py-3 rounded-2xl font-semibold transition"
            >
              Simpan Perubahan
            </button>

          </form>

        </section>

      </main>
    </div>
  );
};

export default EditProfil;
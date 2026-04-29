import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";

const GantiPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkStrength = (password) => {
    if (password.length > 10) return "Kuat 💪";
    if (password.length > 5) return "Sedang ⚡";
    if (password.length > 0) return "Lemah ⚠️";
    return "-";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    alert("Password berhasil diubah 🚀");
    console.log(form);
  };

  return (
    <div className="flex min-h-screen bg-[#effae8]">

      {/* SIDEBAR */}
      <SideBar activePage="security" />

      {/* CONTENT */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-2xl font-bold text-[#455538]">
              Ganti Password
            </h1>
            <p className="text-sm text-gray-600">
              Update keamanan akun admin kamu
            </p>
          </div>

          <button
            onClick={() => navigate("/profil")}
            className="px-4 py-2 rounded-full border text-[#455538]"
          >
            ← Kembali
          </button>

        </div>

        {/* CARD */}
        <div className="max-w-2xl bg-white/80 rounded-3xl shadow p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* OLD PASSWORD */}
            <Input
              label="Password Lama"
              name="oldPassword"
              type={show ? "text" : "password"}
              value={form.oldPassword}
              onChange={handleChange}
            />

            {/* NEW PASSWORD */}
            <div>
              <Input
                label="Password Baru"
                name="newPassword"
                type={show ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
              />

              <p className="text-xs mt-1 text-gray-500">
                Strength: {checkStrength(form.newPassword)}
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <Input
              label="Konfirmasi Password"
              name="confirmPassword"
              type={show ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
            />

            {/* SHOW PASSWORD */}
            <label className="flex items-center gap-2 text-sm text-[#455538]">
              <input
                type="checkbox"
                onChange={() => setShow(!show)}
              />
              Tampilkan password
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#F8BC22] hover:bg-yellow-500 text-white py-3 rounded-2xl font-semibold"
            >
              Simpan Password Baru
            </button>

          </form>

        </div>
      </main>
    </div>
  );
};

/* INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 p-3 rounded-2xl bg-[#63714ecc] text-white outline-none"
    />
  </div>
);

export default GantiPassword;
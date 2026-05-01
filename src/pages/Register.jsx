import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import semua gambar lokal
import bgLeft from "../assets/image.png";
import bgRight from "../assets/image.png";
import peopleImg from "../assets/people.png";
import bawaImg from "../assets/bawah.png";
import lockImg from "../assets/lock.png";
import eyeImg from "../assets/eye.png";
import emailImg from "../assets/email.png";
import tokoImg from "../assets/toko.png";

// Icon SVG inline — tidak perlu file asset tambahan
const PhoneIcon = () => (
  <svg
    aria-hidden="true"
    className="w-6 h-6 opacity-90 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.5 5.5l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const AddressIcon = () => (
  <svg
    aria-hidden="true"
    className="w-6 h-6 opacity-90 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const Register = () => {
  const navigate = useNavigate();
  const roleSelectId = useId();
  const namaLengkapId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();
  const noTelpId = useId();
  const namaTokoId = useId();
  const alamatTokoId = useId();

  const [role, setRole] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [namaToko, setNamaToko] = useState("");
  const [alamatToko, setAlamatToko] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roleOptions = [
    { value: "pengguna", label: "Pengguna" },
    { value: "admin", label: "Admin" },
  ];

const handleSubmit = async (event) => {
  event.preventDefault();

  if (!role || !namaLengkap || !email || !password) {
    alert("Semua field wajib diisi!");
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role,
        namaLengkap,
        email,
        password,
        namaToko: role === "admin" ? namaToko : null,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registrasi berhasil!');
      console.log(data);

      if (role === "admin") {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }

      
    } else {
      alert(data.message || 'Registrasi gagal');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Tidak bisa konek ke server');
  }
};


  const handleRoleSelect = (value) => {
    console.log("PILIH ROLE:", value);
    setRole(value);
    setDropdownOpen(false);
  };

  const selectedLabel =
    roleOptions.find((o) => o.value === role)?.label || "Pilih Role";

  const isAdmin = role === "admin";

  // Shared field style
  const fieldClass =
    "relative w-full h-14 rounded-2xl flex items-center px-6 gap-4";
  const bgField = { backgroundColor: "rgba(99, 113, 78, 0.80)" };
  const inputClass =
    "flex-1 bg-transparent text-white placeholder-white text-sm outline-none font-poppins";

  return (
    <main className="relative w-screen h-screen bg-green-50 overflow-hidden flex items-center justify-center">
      {/* Background kiri */}
      <img
        className="absolute top-0 left-0 h-full w-auto object-cover pointer-events-none select-none opacity-80"
        alt=""
        src={bgLeft}
        aria-hidden="true"
      />
      {/* Background kanan */}
      <img
        className="absolute top-0 right-0 h-full w-auto object-cover pointer-events-none select-none opacity-60"
        alt=""
        src={bgRight}
        aria-hidden="true"
      />

      {/* Card Register */}
      <section
        aria-labelledby="register-title"
        className="relative z-10 w-full max-w-lg mx-4 bg-white bg-opacity-75 rounded-3xl shadow-lg px-12 py-10 overflow-y-auto"
        style={{ maxHeight: "90vh" }}
      >
        <h1
          id="register-title"
          className="text-center text-4xl font-semibold text-green-800 leading-tight mb-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Daftar Akun
        </h1>
        <p
          className="text-center text-sm mb-8"
          style={{
            color: "rgba(66, 84, 37, 0.80)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Create your new Account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Pilih Role — custom dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full h-14 flex items-center gap-4 px-6 rounded-2xl text-white text-sm font-medium"
              style={{
                backgroundColor: "rgba(99, 113, 78, 0.80)",
                fontFamily: "'Poppins', sans-serif",
              }}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-labelledby={roleSelectId}
            >
              <img
                src={peopleImg}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 object-contain opacity-90"
              />
              <span id={roleSelectId} className="flex-1 text-left">
                {selectedLabel}
              </span>
              <img
                src={bawaImg}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain opacity-90"
              />
            </button>

            {dropdownOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-1 w-full rounded-2xl shadow-lg overflow-hidden"
                style={{ backgroundColor: "#64714F" }}
              >
                {roleOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={role === option.value}
                    onClick={() => handleRoleSelect(option.value)}
                    className="px-6 py-3 text-sm text-white cursor-pointer hover:bg-yellow-400 flex items-center gap-3 transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <img
                      src={peopleImg}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 object-contain opacity-80"
                    />
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Nama Lengkap */}
          <div className={fieldClass} style={bgField}>
            <img
              src={peopleImg}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain opacity-90"
            />
            <label htmlFor={namaLengkapId} className="sr-only">
              Nama Lengkap
            </label>
            <input
              id={namaLengkapId}
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              placeholder="Nama Lengkap"
              autoComplete="name"
              className={inputClass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Email */}
          <div className={fieldClass} style={bgField}>
            <img
              src={emailImg}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain opacity-90"
            />
            <label htmlFor={emailInputId} className="sr-only">
              Email
            </label>
            <input
              id={emailInputId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              className={inputClass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* No. Telepon */}
          <div className={fieldClass} style={bgField}>
            <PhoneIcon />
            <label htmlFor={noTelpId} className="sr-only">
              Nomor Telepon
            </label>
            <input
              id={noTelpId}
              type="tel"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
              placeholder="No. Telepon"
              autoComplete="tel"
              inputMode="numeric"
              className={inputClass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Kata Sandi */}
          <div className={fieldClass} style={bgField}>
            <img
              src={lockImg}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 object-contain opacity-90"
            />
            <label htmlFor={passwordInputId} className="sr-only">
              Kata Sandi
            </label>
            <input
              id={passwordInputId}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kata Sandi"
              autoComplete="new-password"
              className={inputClass}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={
                showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
              aria-pressed={showPassword}
            >
              <img
                src={eyeImg}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 object-contain opacity-80"
              />
            </button>
          </div>

          {/* Field khusus Admin: Nama Toko & Alamat Toko */}
          {isAdmin && (
            <>
              {/* Nama Toko */}
              <div className={fieldClass} style={bgField}>
                <img
                  src={tokoImg}
                  alt=""
                  aria-hidden="true"
                  className="w-6 h-6 object-contain opacity-90"
                />
                <label htmlFor={namaTokoId} className="sr-only">
                  Nama Toko
                </label>
                <input
                  id={namaTokoId}
                  type="text"
                  value={namaToko}
                  onChange={(e) => setNamaToko(e.target.value)}
                  placeholder="Nama Toko"
                  autoComplete="organization"
                  className={inputClass}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>

              {/* Alamat Toko */}
              <div className={fieldClass} style={bgField}>
                <AddressIcon />
                <label htmlFor={alamatTokoId} className="sr-only">
                  Alamat Toko
                </label>
                <input
                  id={alamatTokoId}
                  type="text"
                  value={alamatToko}
                  onChange={(e) => setAlamatToko(e.target.value)}
                  placeholder="Alamat Toko"
                  autoComplete="street-address"
                  className={inputClass}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>
            </>
          )}

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-72 h-14 mx-auto mt-4 rounded-2xl text-white text-xl font-medium shadow-md transition-colors"
            style={{
              backgroundColor: "#F8BC22",
              fontFamily: "'Poppins', sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#e0a91e")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#F8BC22")
            }
          >
            Daftar
          </button>
        </form>

        {/* Sudah punya akun */}
        <p
          className="text-center text-xs text-gray-600 mt-12"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Sudah punya akun?{" "}
          <Link to="/login" className="font-bold text-gray-800 no-underline">
            Masuk
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;

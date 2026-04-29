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

export const Login = () => {
  const roleSelectId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();
  const rememberMeId = useId();

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "pengguna", label: "Pengguna" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  const handleRoleSelect = (value) => {
    setRole(value);
    setDropdownOpen(false);
  };

  const selectedLabel =
    roleOptions.find((o) => o.value === role)?.label || "Pilih Role";

  const navigate = useNavigate();

  return (
    <main className="relative w-screen h-screen bg-green-50 overflow-hidden flex items-center justify-center">
      {/* Background kiri */}
      <img
        className="absolute top-0 left-0 h-full w-auto max-w-none object-cover pointer-events-none select-none opacity-80"
        alt=""
        src={bgLeft}
        aria-hidden="true"
      />
      {/* Background kanan */}
      <img
        className="absolute top-0 right-0 h-full w-auto max-w-none object-cover pointer-events-none select-none opacity-60"
        alt=""
        src={bgRight}
        aria-hidden="true"
      />

      {/* Card login */}
      <section
        aria-labelledby="login-title"
        className="relative z-10 w-full max-w-lg mx-4 bg-white bg-opacity-75 rounded-3xl shadow-lg px-12 py-10"
      >
        <h1
          id="login-title"
          className="text-center text-4xl font-semibold text-green-800 leading-tight mb-1"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Selamat Datang
        </h1>
        <p
          className="text-center text-sm text-green-700 text-opacity-80 mb-8"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Login in your Account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Pilih Role — custom dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full h-14 flex items-center gap-4 px-6 rounded-2xl text-white text-sm font-medium bg-[#63714ecc] bg-opacity-85"
              style={{ fontFamily: "'Poppins', sans-serif" }}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              {/* Icon people */}
              <img
                src={peopleImg}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 rounded-full object-cover  opacity-90"
              />
              <span className="flex-1 text-left">{selectedLabel}</span>
              {/* Icon bawah (chevron) */}
              <img
                src={bawaImg}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 rounded object-cover opacity-90"
              />
            </button>

            {dropdownOpen && (
              <ul
                role="listbox"
                className="absolute z-20 mt-1 w-full bg-[#64714F] rounded-2xl shadow-lg overflow-hidden focus:outline-none"
              >
                {roleOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={role === option.value}
                    onClick={() => handleRoleSelect(option.value)}
                    className="px-6 py-3 text-sm text-white cursor-pointer hover:bg-yellow-400 flex items-center gap-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    <img
                      src={peopleImg}
                      alt=""
                      aria-hidden="true"
                      className="w-5 h-5 rounded-full object-cover opacity-70"
                    />
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email / Username */}
          <div className="relative w-full h-14 bg-[#63714ecc] bg-opacity-85 rounded-2xl flex items-center px-6 gap-4">
            <img
              src={peopleImg}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 rounded-full object-cover opacity-90"
            />
            <label htmlFor={emailInputId} className="sr-only">
              Email atau Username
            </label>
            <input
              id={emailInputId}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email / Username"
              autoComplete="username"
              className="flex-1 bg-transparent text-white placeholder-white text-sm outline-none"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Kata Sandi */}
          <div className="relative w-full h-14 bg-[#63714ecc] bg-opacity-85 rounded-2xl flex items-center px-6 gap-4">
            <img
              src={lockImg}
              alt=""
              aria-hidden="true"
              className="w-6 h-6 rounded object-cover opacity-90"
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
              autoComplete="current-password"
              className="flex-1 bg-transparent text-white placeholder-white text-sm outline-none"
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
                className="w-6 h-6 rounded object-cover opacity-80"
              />
            </button>
          </div>

          {/* Remember me & Lupa Kata Sandi */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <input
                id={rememberMeId}
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-gray-300 cursor-pointer accent-green-700"
              />
              <label
                htmlFor={rememberMeId}
                className="text-xs text-gray-600 cursor-pointer"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Ingatkan saya
              </label>
            </div>
            <a
              href="#"
              className="text-xs text-blue-600 underline"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Lupa Kata Sandi
            </a>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-72 h-14 mx-auto mt-2 bg-yellow-400 rounded-2xl text-white text-xl font-medium shadow-md hover:bg-yellow-500 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Masuk
          </button>
        </form>

        {/* Daftar */}
        <p
          className="text-center text-xs text-gray-600 mt-12"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Belum punya akun?{" "}
          <Link to="/register" className="font-bold text-gray-800 no-underline">
            Daftar
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;

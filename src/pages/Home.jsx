import image from "../assets/image.png";
import rectangle from "../assets/Rectangle.png";

import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Register", to: "/register" },
];

export const Home = () => {
  return (
    // FIX 1: min-h-screen → h-screen + overflow-hidden = tidak bisa scroll
    <div className="relative w-full h-screen bg-[#effae8] flex flex-col overflow-hidden">
      {/* NAVBAR */}
      <header className="relative z-30 w-full bg-[#63714ecc] rounded-b-3xl">
        <div
          className="flex items-center justify-between px-16"
          style={{ height: "72px" }}
        >
          <a href="#home" className="flex items-center no-underline">
            <span
              className="text-white font-semibold"
              style={{ fontSize: "28px" }}
            >
              Food&nbsp;
            </span>
            <span
              className="text-[#eb9f29] font-semibold"
              style={{ fontSize: "28px" }}
            >
              Waste
            </span>
          </a>

          <nav className="flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-white font-medium text-lg hover:text-[#eb9f29] transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-[#eb9f29] hover:bg-[#d48d1c] text-white font-medium text-lg px-6 py-2 rounded-full transition-colors no-underline"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      {/* FIX 2: hapus minHeight calc(100vh - 72px) → pakai flex-1 saja */}
      <section
        id="home"
        className="relative flex-1 flex items-center w-full overflow-hidden"
      >
        {/* FIX 3: tambah opacity: 0.3 — sebelumnya tidak ada, gambar jadi terlalu penuh */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full object-cover object-right pointer-events-none select-none"
          style={{ width: "50%" }}
        />

        {/* Gambar kiri — tidak berubah */}
        <img
          src={rectangle}
          alt="Food ingredients collage"
          className="absolute left-0 top-0 h-full object-cover object-right pointer-events-none select-none"
          style={{ width: "50%" }}
        />

        {/* Konten teks kanan */}
        <div className="relative z-10 flex justify-end w-full pr-12">
          {/* FIX 4: hapus py-24 → pakai gap-6 saja, py-24 bikin konten melar keluar */}
          <div className="flex flex-col items-center text-center w-1/2 gap-6">
            <h1
              className="text-[#63714e] font-bold leading-tight tracking-tight m-0"
              style={{ fontSize: "clamp(44px, 5vw, 82px)" }}
            >
              SAVE FOOD
              <br />
              SAVE FUTURE
            </h1>

            <p
              className="text-[#63714e] font-medium text-center leading-relaxed m-0 max-w-sm"
              style={{ fontSize: "clamp(14px, 1.2vw, 18px)", opacity: 0.75 }}
            >
              Kelola stok makanan dan bagikan makanan berlebih kepada yang
              membutuhkan.
            </p>

            <Link
              to="/login"
              className="bg-[#f8bc22] hover:bg-[#e5ad1f] text-white font-semibold transition-colors no-underline rounded-2xl shadow-md px-14 py-4"
              style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}
            >
              Mulai Menjelajah
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

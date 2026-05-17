import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// --- KELOMPOK ADMIN (Admin & Tasya) ---
import DashboardAdmin from "./pages/admin/dashboard";
import ListMenuAdmin from "./pages/admin/ListMenu";
import ProfilAdmin from "./pages/admin/Profil";
import PesanAdmin from "./pages/admin/Pesan";
import EditProfilAdmin from "./pages/admin/EditProfil";
import GantiPasswordAdmin from "./pages/admin/GantiPassword";
import PengaturanAdmin from "./pages/admin/Pengaturan";

// --- KELOMPOK USER (Gabungan Shania & Kiya) ---
import { PesanUser } from "./pages/user/Pesan";
import { ProfilUser } from "./pages/user/Profil";
import { EditProfil } from "./pages/user/EditProfil";
import { GantiPassword } from "./pages/user/GantiPassword";
import { Pengaturan } from "./pages/user/Pengaturan";
import { DashboardUser } from "./pages/user/DashboardUser"; // Dari Kiya // Dari Shania (HEAD)
import ListMenu from "./pages/user/ListMenu";
import { MerchantMenu } from "./pages/user/MerchantMenu"; // Dari Kiya

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTE UMUM */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- ROUTES ADMIN --- */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/list-menu" element={<ListMenuAdmin />} />
        <Route path="/admin/profil" element={<ProfilAdmin />} />
        <Route path="/admin/pesan" element={<PesanAdmin />} />
        <Route path="/admin/edit-profil" element={<EditProfilAdmin />} />
        <Route path="/admin/ganti-password" element={<GantiPasswordAdmin />} />
        <Route path="/admin/pengaturan" element={<PengaturanAdmin />} />

        {/* --- ROUTES USER (Kiya & Shania) --- */}
        <Route path="/dashboarduser" element={<DashboardUser />} />
        <Route path="/menu" element={<ListMenu />} />
        <Route path="/merchantmenu" element={<MerchantMenu />} />
        <Route path="/pesan" element={<PesanUser />} />
        <Route path="/profil" element={<ProfilUser />} />
        <Route path="/editprofil" element={<EditProfil />} />
        <Route path="/gantipassword" element={<GantiPassword />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </Router>
  );
}

export default App;

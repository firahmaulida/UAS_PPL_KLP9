import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ADMIN (Gabungan HEAD & Tasya)
import DashboardAdmin from "./pages/admin/dashboard";
import ListMenuAdmin from "./pages/admin/ListMenu";
import ProfilAdmin from "./pages/admin/Profil";
import PesanAdmin from "./pages/admin/Pesan";
import EditProfilAdmin from "./pages/admin/EditProfil";
import GantiPasswordAdmin from "./pages/admin/GantiPassword";
import PengaturanAdmin from "./pages/admin/Pengaturan";

// USER (Punya Kiya)
import { PesanUser } from "./pages/user/Pesan";
import { ProfilUser } from "./pages/user/Profil";
import { EditProfil as EditProfilUser } from "./pages/user/EditProfil";
import { GantiPassword as GantiPasswordUser } from "./pages/user/GantiPassword";
import { Pengaturan as PengaturanUser } from "./pages/user/Pengaturan";

// USER (Punya Shania)
import Dashboard from "./pages/user/Dashboard";
import ListMenu from "./pages/user/ListMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- ROUTES ADMIN --- */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/list-menu" element={<ListMenuAdmin />} />
        {/* Rute Admin dari Tasya */}
        <Route path="/admin/profil" element={<ProfilAdmin />} />
        <Route path="/admin/pesan" element={<PesanAdmin />} />
        <Route path="/admin/edit-profil" element={<EditProfilAdmin />} />
        <Route path="/admin/ganti-password" element={<GantiPasswordAdmin />} />
        <Route path="/admin/pengaturan" element={<PengaturanAdmin />} />

        {/* --- ROUTES USER --- */}
        {/* Shania */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<ListMenu />} />

        {/* Kiya */}
        <Route path="/pesan" element={<PesanUser />} />
        <Route path="/profil" element={<ProfilUser />} />
        <Route path="/editprofil" element={<EditProfilUser />} />
        <Route path="/gantipassword" element={<GantiPasswordUser />} />
        <Route path="/pengaturan" element={<PengaturanUser />} />
      </Routes>
    </Router>
  );
}

export default App;

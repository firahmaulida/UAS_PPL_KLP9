import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ADMIN
import DashboardAdmin from "./pages/admin/dashboard";
import ListMenuAdmin from "./pages/admin/ListMenu";

// USER (punya kiya)
import { PesanUser } from "./pages/user/Pesan";
import { ProfilUser } from "./pages/user/Profil";
import { EditProfil } from "./pages/user/EditProfil";
import { GantiPassword } from "./pages/user/GantiPassword";
import { Pengaturan } from "./pages/user/Pengaturan";

// USER (punya shania)
import Dashboard from "./pages/user/Dashboard";
import ListMenu from "./pages/user/ListMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/list-menu" element={<ListMenuAdmin />} />

        {/* USER - SHANIA */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<ListMenu />} />

        {/* USER - KIYA */}
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

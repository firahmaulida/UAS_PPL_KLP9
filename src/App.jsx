import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { PesanUser } from "./pages/user/Pesan"; 
import { ProfilUser } from "./pages/user/Profil"; 
import { EditProfil } from "./pages/user/EditProfil";
import { GantiPassword } from "./pages/user/GantiPassword";
import { Pengaturan } from "./pages/user/Pengaturan";
import { DashboardUser } from "./pages/user/DashboardUser";
import { ListMenu } from "./pages/user/ListMenu";
import { MerchantMenu } from "./pages/user/MerchantMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Gunakan huruf kecil di path agar rapi: /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/pesan" element={<PesanUser />} /> {/* Pastikan path sesuai */}
        <Route path="/profil" element={<ProfilUser />} /> {/* Tambahkan route untuk profil */}
        <Route path="/editprofil" element={<EditProfil />} /> 
        <Route path="/gantipassword" element={<GantiPassword />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
        <Route path="/dashboarduser" element={<DashboardUser />} />
        <Route path="/menu" element={<ListMenu />} />
        <Route path="/merchantmenu" element={<MerchantMenu />} />
      </Routes>
    </Router>
  );
}

export default App;

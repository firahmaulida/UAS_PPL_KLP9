import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Sudah diperbaiki namanya
import Profil from "./pages/admin/Profil";
import Pesan from "./pages/admin/Pesan";
import EditProfil from "./pages/admin/EditProfil";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Gunakan huruf kecil di path agar rapi: /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/pesan" element={<Pesan />} />
        <Route path="/edit-profil" element={<EditProfil />} />
      </Routes>
    </Router>
  );
}

export default App;

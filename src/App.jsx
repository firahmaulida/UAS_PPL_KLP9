import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Sudah diperbaiki namanya
import DashboardAdmin from "./pages/admin/dashboard";
import ListMenuAdmin from "./pages/admin/ListMenu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Gunakan huruf kecil di path agar rapi: /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/list-menu" element={<ListMenuAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;

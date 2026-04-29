import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Dashboard from "./pages/user/Dashboard";
import ListMenu from "./pages/user/ListMenu";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Gunakan huruf kecil di path agar rapi: /register */}
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<ListMenu />} />
      </Routes>
    </Router>
  );
}

export default App;

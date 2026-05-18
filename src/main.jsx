import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./tailwind.css"; 

// Hapus state localStorage yang rusak ("undefined") agar JSON.parse tidak error (White Screen)
if (localStorage.getItem("user") === "undefined") localStorage.removeItem("user");
if (localStorage.getItem("userData") === "undefined") localStorage.removeItem("userData");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

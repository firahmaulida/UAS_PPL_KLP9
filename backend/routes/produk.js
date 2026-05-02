const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua produk (JANGAN DIUBAH)
router.get("/", (req, res) => {
  db.query(`
    SELECT produk.*, users.nama_toko 
    FROM produk
    LEFT JOIN users ON produk.id_toko = users.id
  `, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk" });
    }
    res.json(result);
  });
});

// TAMBAHAN BARU (AMAN)
router.get("/toko/:id_toko", (req, res) => {
  const { id_toko } = req.params;

  db.query(`
    SELECT produk.*, users.nama_toko 
    FROM produk
    LEFT JOIN users ON produk.id_toko = users.id
    WHERE produk.id_toko = ?
  `, [id_toko], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk" });
    }
    res.json(result);
  });
});

module.exports = router;
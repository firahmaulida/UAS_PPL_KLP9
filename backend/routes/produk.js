const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");

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


// ➕ CREATE PRODUK (ADD MENU)
const multer = require("multer");

const storage = multer.diskStorage({
    
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
    filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
    },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  const { nama_produk, harga, deskripsi, id_toko, expired_date, harga_diskon } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO produk (nama_produk, harga, deskripsi, id_toko, image, expired_date, harga_diskon)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [ nama_produk, harga, deskripsi, id_toko, image, expired_date || null, harga_diskon || null],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Produk berhasil ditambahkan" });
    }
  );
});

// ❌ DELETE PRODUK
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM produk WHERE id_produk = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal hapus produk" });
    }

    res.json({
      message: "Produk berhasil dihapus"
    });
  });
});

// ✏️ UPDATE PRODUK
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { nama_produk, harga, deskripsi, expired_date, harga_diskon } = req.body;

  const image = req.file ? req.file.filename : null;

  if (!nama_produk || !harga) {
    return res.status(400).json({ message: "Nama dan harga wajib diisi" });
  }

  let sql = `
    UPDATE produk 
    SET nama_produk = ?, harga = ?, deskripsi = ?, expired_date = ?, harga_diskon = ?
  `;

  const params = [
    nama_produk,
    harga,
    deskripsi || null,
    expired_date || null,
    harga_diskon || null
  ];

  // ✅ kalau ada gambar baru
  if (image) {
    sql += `, image = ?`;
    params.push(image);
  }

  sql += ` WHERE id_produk = ?`;
  params.push(id);

  // ✅ pakai params (INI YANG TADI SALAH)
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update produk" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json({
      message: "Produk berhasil diupdate"
    });
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM produk WHERE id_produk = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.json(result[0]);
  });
});

module.exports = router;
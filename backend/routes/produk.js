const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
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

/* =========================
   GET ALL PRODUK
========================= */
router.get("/", (req, res) => {
  const sql = `
    SELECT produk.*, users.nama_toko
    FROM produk
    LEFT JOIN users ON produk.id_toko = users.id
    ORDER BY produk.id_produk DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk" });
    }
    res.json(result);
  });
});

/* =========================
   GET PRODUK PER TOKO
========================= */
router.get("/toko/:id_toko", (req, res) => {
  const { id_toko } = req.params;

  const sql = `
    SELECT produk.*, users.nama_toko
    FROM produk
    LEFT JOIN users ON produk.id_toko = users.id
    WHERE produk.id_toko = ?
    ORDER BY produk.id_produk DESC
  `;

  db.query(sql, [id_toko], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk toko" });
    }
    res.json(result);
  });
});

/* =========================
   ADD PRODUK
========================= */
router.post("/", upload.single("image"), (req, res) => {
  const {
    nama_produk,
    harga,
    deskripsi,
    id_toko,
    production_date,
    expired_date,
    harga_diskon,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO produk
    (nama_produk, harga, deskripsi, id_toko, image, created_at, expired_date, harga_diskon)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nama_produk,
      harga,
      deskripsi || null,
      id_toko,
      image,
      production_date || null,
      expired_date || null,
      harga_diskon || null,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal tambah produk" });
      }

      res.json({ message: "Produk berhasil ditambahkan" });
    },
  );
});

/* =========================
   DELETE PRODUK
========================= */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM produk WHERE id_produk = ?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal hapus produk" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  });
});

/* =========================
   UPDATE PRODUK
========================= */
router.put("/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;

  const {
    nama_produk,
    harga,
    deskripsi,
    production_date,
    expired_date,
    harga_diskon,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  let sql = `
    UPDATE produk
    SET nama_produk = ?, harga = ?, deskripsi = ?, created_at = ?, expired_date = ?, harga_diskon = ?
  `;

  const params = [
    nama_produk,
    harga,
    deskripsi || null,
    production_date || null,
    expired_date || null,
    harga_diskon || null,
  ];

  if (image) {
    sql += ", image = ?";
    params.push(image);
  }

  sql += " WHERE id_produk = ?";
  params.push(id);

  db.query(sql, params, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update produk" });
    }

    res.json({ message: "Produk berhasil diupdate" });
  });
});

/* =========================
   GET DETAIL PRODUK
========================= */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM produk WHERE id_produk = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal ambil detail produk" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      res.json(result[0]);
    },
  );
});

module.exports = router;

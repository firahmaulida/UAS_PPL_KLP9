const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET COUNT UNREAD */
router.get("/count/:user_id", (req, res) => {
  const { user_id } = req.params;

  db.query(
    "SELECT COUNT(*) as total FROM notifications WHERE user_id = ? AND is_read = 0",
    [user_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Gagal hitung notif" });
      }
      res.json(result[0]);
    },
  );
});

/* GET ALL NOTIF */
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;

  db.query(
    "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
    [user_id],
    (err, notifResult) => {
      if (err) {
        return res.status(500).json({ message: "Gagal ambil notif" });
      }

      // Cek apakah user ini adalah admin/toko yang punya produk expired <= 3 hari
      db.query(
        "SELECT id_produk, nama_produk, expired_date FROM produk WHERE id_toko = ? AND DATEDIFF(expired_date, NOW()) <= 3 AND DATEDIFF(expired_date, NOW()) >= -30 ORDER BY expired_date ASC",
        [user_id],
        (err, produkResult) => {
          if (err) return res.json(notifResult);

          const dynamicNotifs = produkResult.map(p => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const exp = new Date(p.expired_date);
            exp.setHours(0, 0, 0, 0);
            const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
            
            let title = "Peringatan Stok Expired";
            let msg = `Produk "${p.nama_produk}" akan expired dalam ${diffDays} hari!`;
            
            if (diffDays < 0) {
               title = "Produk Kadaluarsa";
               msg = `Produk "${p.nama_produk}" telah kadaluarsa! Segera hapus atau perbarui.`;
            } else if (diffDays === 0) {
               title = "Produk Expired Hari Ini";
               msg = `Produk "${p.nama_produk}" expired hari ini!`;
            }

            return {
              id: "dyn_" + p.id_produk,
              user_id: user_id,
              title: title,
              message: msg,
              is_read: 0,
              created_at: new Date().toISOString(),
              type: "stock"
            };
          });

          res.json([...dynamicNotifs, ...notifResult]);
        }
      );
    },
  );
});

/* MARK READ */
router.put("/read/:user_id", (req, res) => {
  const { user_id } = req.params;

  db.query(
    "UPDATE notifications SET is_read = 1 WHERE user_id = ?",
    [user_id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Gagal update notif" });
      }
      res.json({ message: "Notif dibaca" });
    },
  );
});

module.exports = router;

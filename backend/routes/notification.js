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
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Gagal ambil notif" });
      }
      res.json(result);
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

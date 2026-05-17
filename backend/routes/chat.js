const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   GET ROOM CHAT
========================= */
router.get("/", (req, res) => {
  const { user_id, toko_id } = req.query;

  let sql = `
    SELECT 
      chat_rooms.*,
      u_user.nama_lengkap AS nama_pengguna,
      u_user.foto AS user_foto,
      u_toko.nama_toko AS nama_toko,
      u_toko.foto AS toko_foto
    FROM chat_rooms
    LEFT JOIN users u_user ON chat_rooms.user_id = u_user.id
    LEFT JOIN users u_toko ON chat_rooms.toko_id = u_toko.id
  `;

  const params = [];

  if (user_id) {
    sql += " WHERE chat_rooms.user_id = ?";
    params.push(user_id);
  }

  if (toko_id) {
    sql += user_id
      ? " AND chat_rooms.toko_id = ?"
      : " WHERE chat_rooms.toko_id = ?";
    params.push(toko_id);
  }

  sql += " ORDER BY chat_rooms.last_time DESC";

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal ambil room chat" });
    }
    res.json(result);
  });
});

/* =========================
   GET OR CREATE ROOM
========================= */
router.post("/get-or-create", (req, res) => {
  const { user_id, toko_id } = req.body;

  const findSql =
    "SELECT * FROM chat_rooms WHERE user_id = ? AND toko_id = ? LIMIT 1";

  db.query(findSql, [user_id, toko_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal cek room" });
    }

    if (result.length > 0) {
      return res.json({ chat_id: result[0].id });
    }

    const createSql = `
      INSERT INTO chat_rooms (user_id, toko_id, created_at, last_message, last_time)
      VALUES (?, ?, NOW(), 'Memulai percakapan...', NOW())
    `;

    db.query(createSql, [user_id, toko_id], (err2, created) => {
      if (err2) {
        return res.status(500).json({ message: "Gagal buat room" });
      }

      /* notif ke merchant bahwa ada pelanggan memulai chat */
      db.query(
        "INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)",
        [
          toko_id,
          "Pelanggan Baru Memulai Chat",
          "Ada pelanggan yang baru memulai percakapan dengan toko Anda.",
          "chat",
        ],
      );

      res.json({ chat_id: created.insertId });
    });
  });
});

/* =========================
   GET DETAIL MESSAGE
========================= */
router.get("/:chat_id", (req, res) => {
  const { chat_id } = req.params;

  const sql = `
    SELECT * FROM messages
    WHERE chat_id = ?
    ORDER BY created_at ASC
  `;

  db.query(sql, [chat_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal ambil isi chat" });
    }
    res.json(result);
  });
});

/* =========================
   SEND MESSAGE + AUTO NOTIFICATION
========================= */
router.post("/", (req, res) => {
  const { chat_id, sender_id, message } = req.body;

  const sql =
    "INSERT INTO messages (chat_id, sender_id, message, created_at) VALUES (?, ?, ?, NOW())";

  db.query(sql, [chat_id, sender_id, message], (err) => {
    if (err) {
      return res.status(500).json({ message: "Gagal kirim pesan" });
    }

    db.query(
      "UPDATE chat_rooms SET last_message = ?, last_time = NOW() WHERE id = ?",
      [message, chat_id],
    );

    /* =========================
       INSERT AUTO NOTIFICATION
    ========================= */
    db.query("SELECT * FROM chat_rooms WHERE id = ?", [chat_id], (e, room) => {
      if (!e && room.length > 0) {
        const r = room[0];

        let targetUserId = null;
        let notifTitle = "";
        let notifMessage = message;

        if (parseInt(sender_id) === parseInt(r.user_id)) {
          targetUserId = r.toko_id;
          notifTitle = "Pesan Baru dari Pelanggan";
        } else {
          targetUserId = r.user_id;
          notifTitle = "Balasan Pesan dari Merchant";
        }

        db.query(
          "INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)",
          [targetUserId, notifTitle, notifMessage, "chat"],
        );
      }
    });

    res.json({ message: "Pesan berhasil dikirim" });
  });
});

module.exports = router;

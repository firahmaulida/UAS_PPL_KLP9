const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const sql = `
    SELECT chat_rooms.*, users.nama_lengkap AS nama
    FROM chat_rooms
    LEFT JOIN users ON chat_rooms.user_id = users.id
    ORDER BY chat_rooms.last_time DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.get("/:chat_id", (req, res) => {
  const { chat_id } = req.params;

  const sql = `
    SELECT * FROM messages
    WHERE chat_id = ?
    ORDER BY created_at ASC
  `;

  db.query(sql, [chat_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { chat_id, sender_id, message } = req.body;

  console.log("DATA MASUK:", req.body);
  const sql = `
    INSERT INTO messages (chat_id, sender_id, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [chat_id, sender_id, message], (err, result) => {
    if (err) return res.status(500).json(err);

    

    // 🔥 UPDATE CHAT ROOM (INI YANG PENTING)
    db.query(
      `UPDATE chat_rooms 
       SET last_message = ?, last_time = NOW() 
       WHERE id = ?`,
      [message, chat_id]
    );

    res.json({
      message: "Pesan berhasil dikirim"
    });
  });
});

module.exports = router;
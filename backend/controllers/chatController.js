

// const Chat = require('../models/Chat');

// ======================================
// USER SEND MESSAGE (NEW SYSTEM)
// ======================================
exports.sendMessageUser = (req, res) => {
  const db = require("../db");
  const { user_id, toko_id, message } = req.body;

  const userId = Number(user_id);
  const tokoId = Number(toko_id);
  const msg = String(message || "").trim();

  if (!userId || !tokoId || !msg) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  // Atomic Insert or Update
  db.query(
    "INSERT INTO chat_rooms (user_id, toko_id, last_message, last_time, created_at) VALUES (?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE last_message = ?, last_time = NOW()",
    [userId, tokoId, msg, msg],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Gagal memproses room" });
      }

      // Selalu SELECT id setelahnya agar akurat (karena insertId bisa 0 pada operasi UPDATE)
      db.query(
        "SELECT id FROM chat_rooms WHERE user_id = ? AND toko_id = ?",
        [userId, tokoId],
        (err, rows) => {
          if (err || rows.length === 0) {
            return res.status(500).json({ success: false, message: "DB Error fetching room" });
          }
          const chat_id = rows[0].id;

          // Masukkan pesan ke tabel messages
          db.query(
            "INSERT INTO messages (chat_id, sender_id, message, created_at) VALUES (?, ?, ?, NOW())",
            [chat_id, userId, msg],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Gagal kirim pesan" });
              }

              // 🔔 INSERT NOTIFIKASI KE ADMIN/TOKO
              db.query(
                "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
                [tokoId, "Pesan Baru", "Ada pesan baru dari pembeli"]
              );

              res.json({ success: true, message: "Pesan dikirim", chat_id });
            }
          );
        }
      );
    }
  );
};

// ======================================
// GET MESSAGES BY CHAT_ID
// ======================================
exports.getMessagesByChatId = (req, res) => {
  const db = require("../db");
  const { chat_id } = req.params;

  db.query(
    `SELECT * FROM messages 
      WHERE chat_id = ?
      ORDER BY created_at ASC`,
    [chat_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil pesan",
        });
      }

      res.json({
        success: true,
        data: results,
      });
    }
  );
};

// ======================================
// GET CHAT LIST USER
// ======================================
exports.getChatByUser = (req, res) => {
  const db = require("../db");
  const { user_id } = req.params;

  db.query(
    `SELECT 
      cr.*,
      COALESCE(u.nama_toko, u.nama_lengkap) as nama_lengkap,
      u.nama_toko,
      u.foto as user_foto,
      (SELECT COUNT(*) FROM messages m WHERE m.chat_id = cr.id AND m.sender_id != ? AND m.is_read = 0) as unread_count
     FROM chat_rooms cr
     JOIN users u ON cr.toko_id = u.id
     WHERE cr.user_id = ?
     ORDER BY cr.last_time DESC`,
    [user_id, user_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil chat",
        });
      }

      res.json({
        success: true,
        data: results,
      });
    }
  );
};

// ======================================
// ADMIN SEND MESSAGE
// ======================================
exports.sendMessageAdmin = (req, res) => {
  const db = require("../db");
  const { chat_id, admin_id, message } = req.body;

  if (!chat_id || !admin_id || !message) {
    return res.status(400).json({
      success: false,
      message: "Data tidak lengkap",
    });
  }

  // INSERT MESSAGE
  db.query(
    `INSERT INTO messages (chat_id, sender_id, message, created_at)
     VALUES (?, ?, ?, NOW())`,
    [chat_id, admin_id, message],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Gagal kirim pesan",
        });
      }

      // UPDATE LAST MESSAGE
      db.query(
        `UPDATE chat_rooms 
         SET last_message = ?, last_time = NOW()
         WHERE id = ?`,
        [message, chat_id]
      );

      // 🔔 INSERT NOTIFIKASI KE PENGGUNA
      db.query(
        `SELECT user_id FROM chat_rooms WHERE id = ?`,
        [chat_id],
        (err, resRoom) => {
          if (!err && resRoom.length > 0) {
            db.query(
              "INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)",
              [resRoom[0].user_id, "Balasan Toko", "Anda mendapat balasan pesan dari toko"]
            );
          }
        }
      );

      res.json({
        success: true,
        message: "Admin berhasil kirim pesan",
      });
    }
  );
};

// ======================================
// GET CHAT UNTUK ADMIN
// ======================================
exports.getChatByAdmin = (req, res) => {
  const db = require("../db");
  const { toko_id } = req.params;

  db.query(
    `SELECT 
      cr.*,
      u.nama_lengkap,
      u.foto as user_foto,
      (SELECT COUNT(*) FROM messages m WHERE m.chat_id = cr.id AND m.sender_id != ? AND m.is_read = 0) as unread_count
     FROM chat_rooms cr
     JOIN users u ON cr.user_id = u.id
     WHERE cr.toko_id = ?
     ORDER BY cr.last_time DESC`,
    [toko_id, toko_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Gagal mengambil chat admin",
        });
      }

      res.json({
        success: true,
        data: results,
      });
    }
  );
};

// ======================================
// MARK MESSAGES AS READ
// ======================================
exports.markMessagesAsRead = (req, res) => {
  const db = require("../db");
  const { chat_id } = req.params;
  const { user_id } = req.body;

  db.query(
    "UPDATE messages SET is_read = 1 WHERE chat_id = ? AND sender_id != ?",
    [chat_id, user_id],
    (err) => {
      if (err) {
         console.error(err);
         return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
};

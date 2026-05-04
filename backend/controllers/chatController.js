

const Chat = require('../models/Chat');

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

  // 🔥 PAKAI INSERT ON DUPLICATE (ANTI DOUBLE ROOM)
  db.query(
    `INSERT INTO chat_rooms 
     (user_id, toko_id, last_message, last_time, created_at)
     VALUES (?, ?, ?, NOW(), NOW())
     ON DUPLICATE KEY UPDATE 
     last_message = VALUES(last_message),
     last_time = NOW()`,
    [userId, tokoId, msg],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Gagal membuat / update room",
        });
      }

      // 🔍 AMBIL CHAT_ID
      db.query(
        "SELECT id FROM chat_rooms WHERE user_id = ? AND toko_id = ?",
        [userId, tokoId],
        (err, roomResult) => {
          if (err || roomResult.length === 0) {
            return res.status(500).json({
              success: false,
              message: "Gagal mengambil chat room",
            });
          }

          const chat_id = roomResult[0].id;

          // 💬 INSERT MESSAGE
          db.query(
            `INSERT INTO messages (chat_id, sender_id, message, created_at)
             VALUES (?, ?, ?, NOW())`,
            [chat_id, userId, msg],
            (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  success: false,
                  message: "Gagal kirim pesan",
                });
              }

              res.json({
                success: true,
                message: "Pesan berhasil dikirim",
                chat_id,
              });
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
      u.nama_lengkap
     FROM chat_rooms cr
     JOIN users u ON cr.user_id = u.id
     WHERE cr.user_id = ?
     ORDER BY cr.last_time DESC`,
    [user_id],
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
      u.nama_lengkap
     FROM chat_rooms cr
     JOIN users u ON cr.user_id = u.id
     WHERE cr.toko_id = ?
     ORDER BY cr.last_time DESC`,
    [toko_id],
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

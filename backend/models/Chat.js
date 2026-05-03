const db = require('../db');

const Chat = {
  // kirim pesan
  sendMessage: (data, callback) => {
    const sql = `
      INSERT INTO chat_messages 
      (sender_id, receiver_id, message)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [data.sender_id, data.receiver_id, data.message],
      callback
    );
  },

  // ambil chat antara 2 user
  getMessages: (senderId, receiverId, callback) => {
    const sql = `
      SELECT * FROM chat_messages
      WHERE 
      (sender_id = ? AND receiver_id = ?)
      OR
      (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;

    db.query(
      sql,
      [senderId, receiverId, receiverId, senderId],
      callback
    );
  }
};

module.exports = Chat;
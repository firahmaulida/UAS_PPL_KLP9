const Chat = require('../models/Chat');

exports.sendMessage = (req, res) => {
  const data = req.body;

  Chat.sendMessage(data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Gagal mengirim pesan'
      });
    }

    res.json({
      message: 'Pesan berhasil dikirim'
    });
  });
};

exports.getMessages = (req, res) => {
  const { senderId, receiverId } = req.params;

  Chat.getMessages(senderId, receiverId, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Gagal mengambil chat'
      });
    }

    res.json(results);
  });
};
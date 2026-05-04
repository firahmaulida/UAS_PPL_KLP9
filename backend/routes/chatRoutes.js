const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

// ==========================
// LEGACY (BIARKAN - ADMIN LAMA)
// ==========================
// router.post('/chat', chatController.sendMessage);
// router.get('/chat/:senderId/:receiverId', chatController.getMessages);

// ==========================
// NEW SYSTEM (USER CHAT)
// ==========================

// USER KIRIM PESAN
router.post('/user/send', chatController.sendMessageUser);

// USER LIHAT LIST CHAT
router.get('/user/:user_id', chatController.getChatByUser);

// USER LIHAT ISI CHAT
router.get('/user/messages/:chat_id', chatController.getMessagesByChatId);
router.post('/admin/send', chatController.sendMessageAdmin);

// 🔥 TAMBAHKAN INI
router.get('/admin/:toko_id', chatController.getChatByAdmin);

module.exports = router;
const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test API
app.get('/', (req, res) => {
  res.send('API berjalan 🚀');
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' });
});

// Routes - PASTIKAN INI
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);  // 👈 Ini yang membuat endpoint menjadi /api/login dan /api/register

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error('❌ Gagal konek ke database:', err);
  } else {
    console.log('✅ Berhasil konek ke MySQL');
  }
});

const produkRoutes = require('./routes/produk');
app.use('/api/produk', produkRoutes);

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('🔥 ERROR SERVER:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan di server' });
});

// Route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ message: 'Route tidak ditemukan' });
});

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
  console.log(`📝 Register: POST http://localhost:${PORT}/api/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/login`);
});

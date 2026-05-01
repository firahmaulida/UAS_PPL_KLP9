const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test API (biar tahu server hidup)
app.get('/', (req, res) => {
  res.send('API berjalan 🚀');
});

// ✅ Test route API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API OK' });
});

// ✅ Routes
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// ✅ CEK KONEKSI DATABASE
db.connect((err) => {
  if (err) {
    console.error('❌ Gagal konek ke database:', err);
  } else {
    console.log('✅ Berhasil konek ke MySQL');
  }
});

// ✅ HANDLE ERROR GLOBAL (PENTING)
app.use((err, req, res, next) => {
  console.error('🔥 ERROR SERVER:', err.stack);
  res.status(500).json({ message: 'Terjadi kesalahan di server' });
});

// ✅ HANDLE ROUTE TIDAK ADA
app.use((req, res) => {
  res.status(404).json({ message: 'Route tidak ditemukan' });
});

// ✅ JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
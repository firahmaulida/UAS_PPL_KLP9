const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

// 1. MIDDLEWARE
app.use(cors());
app.use(express.json());

// Menjadikan folder 'uploads' bisa diakses publik (untuk gambar produk)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 2. IMPORT ROUTES (Disatukan agar tidak bentrok)
const authRoutes = require("./routes/auth");
const produkRoutes = require("./routes/produk");
const chatRoutes = require("./routes/chatRoutes");
const profileRoutes = require("./routes/profile");
const notificationRoutes = require("./routes/notification");

// 3. DAFTARKAN ROUTES (Menggunakan path yang rapi)
// Sekarang semua URL akan seragam dan tidak bertabrakan
app.use("/api/auth", authRoutes); // Contoh: /api/auth/login
app.use("/api", authRoutes); // Alias: /api/login dan /api/register
app.use("/api/produk", produkRoutes); // Contoh: /api/produk/ (untuk ambil data)
app.use("/api/chat", chatRoutes); // Contoh: /api/chat/ (untuk pesan)
app.use("/api/profile", profileRoutes);
app.use("/api/notifikasi", notificationRoutes);

app.get("/api/profile/test", (req, res) => {
  res.json({ message: "Profile route aktif (server.js)" });
});

// 4. TEST KONEKSI API & DATABASE
app.get("/", (req, res) => {
  res.send("API Food Waste berjalan 🚀");
});

// DATABASE
db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database MySQL:", err);
  } else {
    console.log("✅ Berhasil konek ke MySQL (Database: foodwaste)");
    
    // SETUP TABEL OTOMATIS
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(50) NOT NULL,
        nama_lengkap VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        no_telp VARCHAR(20),
        nama_toko VARCHAR(255),
        foto VARCHAR(255),
        alamat TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS produk (
        id_produk INT AUTO_INCREMENT PRIMARY KEY,
        nama_produk VARCHAR(255) NOT NULL,
        harga INT NOT NULL,
        deskripsi TEXT,
        id_toko INT NOT NULL,
        image VARCHAR(255),
        created_at DATE,
        expired_date DATE,
        harga_diskon INT
      );
      
      CREATE TABLE IF NOT EXISTS chat_rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        toko_id INT NOT NULL,
        user_id INT NOT NULL,
        last_message TEXT,
        last_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chat_id INT NOT NULL,
        sender_id INT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chat_rooms(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Execute multiple statements (Requires multipleStatements: true in db.js)
    // Since we don't know if multipleStatements is true, we will execute them sequentially.
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(50) NOT NULL,
        nama_lengkap VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        no_telp VARCHAR(20),
        nama_toko VARCHAR(255),
        foto VARCHAR(255),
        alamat TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS produk (
        id_produk INT AUTO_INCREMENT PRIMARY KEY,
        nama_produk VARCHAR(255) NOT NULL,
        harga INT NOT NULL,
        deskripsi TEXT,
        id_toko INT NOT NULL,
        image VARCHAR(255),
        created_at DATE,
        expired_date DATE,
        harga_diskon INT
      )`,
      `CREATE TABLE IF NOT EXISTS chat_rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        toko_id INT NOT NULL,
        user_id INT NOT NULL,
        last_message TEXT,
        last_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        chat_id INT NOT NULL,
        sender_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    queries.forEach(q => {
      db.query(q, (err) => {
        if (err) console.error("Error creating table:", err.message);
      });
    });
  }
});

// 5. ERROR HANDLER (Jika ada kesalahan di server)
app.use((err, req, res, next) => {
  console.error("🔥 ERROR SERVER:", err.stack);
  res.status(500).json({ message: "Terjadi kesalahan di server" });
});

// 6. ROUTE TIDAK DITEMUKAN
app.use((req, res) => {
  res.status(404).json({ message: "Alamat API tidak ditemukan" });
});

// 7. JALANKAN SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
  console.log(`📝 Cek Produk: GET http://localhost:${PORT}/api/produk`);
});

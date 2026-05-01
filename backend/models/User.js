const db = require('../db');

exports.createUser = (data, callback) => {
  const [role, namaLengkap, email, password, namaToko] = data;

  // 🔥 VALIDASI ROLE
  if (!['admin', 'pengguna'].includes(role)) {
    return callback(new Error('Role tidak valid'));
  }

  const sql = `
    INSERT INTO users (role, nama_lengkap, email, password, nama_toko)
    VALUES (?, ?, ?, ?, ?)
  `;

  // 🔥 DEBUG (biar ketahuan dikirim apa)
  console.log('DATA MASUK DB:', {
    role,
    namaLengkap,
    email,
    password,
    namaToko
  });

  db.query(
    sql,
    [role, namaLengkap, email, password, namaToko || null],
    callback
  );
};
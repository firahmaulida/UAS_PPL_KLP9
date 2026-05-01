const db = require('../db');

const User = {
  // Create user baru (TANPA alamat_toko)
  createUser: (data, callback) => {
    const [role, namaLengkap, email, password, noTelp, namaToko] = data;

    // Validasi role
    if (!['admin', 'pengguna'].includes(role)) {
      return callback(new Error('Role tidak valid'));
    }

    const sql = `
      INSERT INTO users 
      (role, nama_lengkap, email, password, no_telp, nama_toko) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    console.log('📝 Inserting user:', {
      role,
      namaLengkap,
      email,
      noTelp,
      namaToko
    });

    db.query(
      sql,
      [role, namaLengkap, email, password, noTelp || null, namaToko || null],
      (err, result) => {
        if (err) {
          console.error('❌ Database insert error:', err);
          return callback(err);
        }
        console.log('✅ User created successfully, ID:', result.insertId);
        callback(null, result);
      }
    );
  },

  // Find user by email and role (untuk login)
  findUserByEmailAndRole: (email, role, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND role = ?';
    
    console.log('🔍 Finding user:', { email, role });
    
    db.query(sql, [email, role], (err, results) => {
      if (err) {
        console.error('❌ Database query error:', err);
        return callback(err);
      }
      console.log(`✅ Found ${results.length} user(s)`);
      callback(null, results);
    });
  },

  // Find user by email only
  findUserByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  // Find user by ID
  findUserById: (id, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // Update user profile (TANPA alamat_toko)
  updateUser: (id, data, callback) => {
    const { namaLengkap, noTelp, namaToko } = data;
    const sql = `
      UPDATE users 
      SET nama_lengkap = ?, no_telp = ?, nama_toko = ?
      WHERE id = ?
    `;
    db.query(sql, [namaLengkap, noTelp, namaToko, id], callback);
  },

  // Update password
  updatePassword: (id, hashedPassword, callback) => {
    const sql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(sql, [hashedPassword, id], callback);
  },

  // Delete user
  deleteUser: (id, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], callback);
  },

  // Get all users (untuk admin)
  getAllUsers: (callback) => {
    const sql = 'SELECT id, role, nama_lengkap, email, no_telp, nama_toko, created_at FROM users';
    db.query(sql, callback);
  },

  // Get users by role
  getUsersByRole: (role, callback) => {
    const sql = 'SELECT id, nama_lengkap, email, no_telp, nama_toko FROM users WHERE role = ?';
    db.query(sql, [role], callback);
  }
};

module.exports = User;
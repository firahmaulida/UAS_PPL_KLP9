const User = require('../models/User');

const register = (req, res) => {
  const { role, namaLengkap, email, password, namaToko } = req.body;

  if (!role || !namaLengkap || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  User.createUser(
    [role, namaLengkap, email, password, namaToko || null],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal register' });
      }

      res.json({ message: 'Register berhasil' });
    }
  );
};

module.exports = { register };
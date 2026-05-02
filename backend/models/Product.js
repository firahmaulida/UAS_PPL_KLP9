const db = require("../db");

const Product = {
  getAllProducts: (callback) => {
    const sql = `
      SELECT 
        produk.*, 
        users.nama_toko
      FROM produk
      JOIN users ON produk.id_toko = users.id
    `;

    db.query(sql, callback);
  },

  searchProducts: (keyword, callback) => {
    const sql = `
      SELECT 
        produk.*, 
        users.nama_toko
      FROM produk
      JOIN users ON produk.id_toko = users.id
      WHERE nama_produk LIKE ?
    `;

    db.query(sql, [`%${keyword}%`], callback);
  },
};

module.exports = Product;
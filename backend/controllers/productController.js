const Product = require("../models/Product");

const getProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Gagal mengambil produk",
      });
    }

    res.json(results);
  });
};

const searchProducts = (req, res) => {
  const keyword = req.query.search;

  Product.searchProducts(keyword, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Search gagal",
      });
    }

    res.json(results);
  });
};

module.exports = {
  getProducts,
  searchProducts,
};
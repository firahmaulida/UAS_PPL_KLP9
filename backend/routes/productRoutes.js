const express = require("express");
const router = express.Router();

const {
  getProducts,
  searchProducts,
} = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/products/search", searchProducts);

module.exports = router;
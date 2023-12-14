const express = require("express");
const router = express.Router({ mergeParams: true });
const productsController = require("../controllers/products.js");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.addProduct);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const productsController = require("../controllers/products.js");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.addProduct);

router.route("/:product_id").get(productsController.getProductDetail);

module.exports = router;

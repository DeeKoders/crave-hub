const express = require("express");
const router = express.Router();
const productsRouter = require("./products.js");

router.use("/products", productsRouter);

module.exports = router;

const express = require("express");
const router = express.Router();
const productsRouter = require("./products.js");
const userRouter = require("./user.js");


router.use("/products", productsRouter);
router.use("/users", userRouter);


module.exports = router;

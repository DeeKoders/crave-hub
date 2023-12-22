const { isArray, isEmpty } = require("lodash");
const productsService = require("../services/products");
const { logError } = require("../utils/logFunctions");

module.exports = {
  getAllProducts: async (_, res) => {
    try {
      const products = await productsService.fetchAllProducts();

      res.send(products);
    } catch (error) {
      logError(`Error occured in getAllProducts controller: ${error.message}`);
      res.send(error);
    }
  },
  getProductDetail: async (req, res) => {
    try {
      const { product_id } = req.params;

      const product = await productsService.fetchSingleProduct({
        productId: product_id,
      });

      res.send(product);
    } catch (error) {
      logError(
        `Error occured in getProductDetail controller: ${error.message}`
      );
      res.send({ error });
    }
  },
  addProduct: async (req, res) => {
    try {
      const files = isArray(req.files.data) ? req.files.data : [req.files.data];

      const uploadResults = await productsService.uploadImages({ files });
      let image_url = [];

      if (!isEmpty(uploadResults)) {
        image_url = uploadResults.map((file) => file.Location);
      }

      const productDetails = {
        ...req.body,
        image_url,
      };

      const product = await productsService.addNewProduct(productDetails);

      res.send(product);
    } catch (error) {
      logError(`Error occured in addProduct controller: ${error.message}`);
      res.status(500).send(error);
    }
  },
};

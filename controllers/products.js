const { isArray, isEmpty } = require("lodash");
const productsService = require("../services/products");

module.exports = {
  getAllProducts: async (_, res) => {
    try {
      const products = await productsService.fetchAllProducts();

      res.send(products);
    } catch (error) {
      console.error("Error occured in getAllProducts: ", error);
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
      console.error("Error occured in getProductDetail: ", error);
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
      console.error("Error occured in addProduct:", error);
      res.status(500).send(error);
    }
  },
};

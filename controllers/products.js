const { Products, Vendors, Categories } = require("../models");
const { isArray } = require("lodash");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const response = await Products.findAll({
        include: [
          {
            model: Vendors,
            as: "vendor",
          },
          {
            model: Categories,
            as: "category",
          },
        ],
        logging: console.log,
      });
      res.send(response);
    } catch (error) {
      res.send({ error });
    }
  },
  addProduct: async (req, res) => {
    try {
      const files = isArray(req.files.data) ? req.files.data : [req.files.data];

      const uploadResults = await Products.uploadProductImages(files);

      const image_url = uploadResults.map((file) => file.Location);

      const { name, quantity, price, fk_vendor_id, fk_category_id } = req.body;

      const product = await Products.create({
        name,
        quantity,
        price,
        fk_category_id,
        fk_vendor_id,
        image_url: JSON.stringify(image_url),
      });

      res.send(product);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send(error);
    }
  },
};

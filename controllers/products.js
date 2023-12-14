const { Products, Vendors, Categories } = require("../models");
const { s3Client } = require("../integrations/s3Client");
const { isArray } = require("lodash");
const config = require("../config");

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
      const uploadPromises = files.map((file) => {
        const fileContent = Buffer.from(file.data, "binary");
        const params = {
          Bucket: config.get("aws.default_bucket"),
          Key: `uploads/${file.name}`,
          Body: fileContent,
          ACL: "public-read", // Set ACL to make the object public
        };

        return new Promise((resolve, reject) => {
          s3Client.upload(params, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      });

      Promise.all(uploadPromises)
        .then(async (data) => {
          const image_url = data.map((file) => file.Location);
          const { name, quantity, price, fk_vendor_id, fk_category_id } =
            req.body;

          const product = await Products.create({
            name,
            quantity,
            price,
            fk_category_id,
            fk_vendor_id,
            image_url: JSON.stringify(image_url),
          });

          res.send(product);
        })
        .catch((error) => {
          console.error("Upload error:", error);
          res.status(500).send(error);
        });
    } catch (error) {
      res.send(error);
    }
  },
};

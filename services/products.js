const { Products, Vendors, Categories } = require("../models");
const { s3Client } = require("../integrations/s3Client");
const config = require("../config");

const productsService = {
  fetchAllProducts: async () => {
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
    return response;
  },

  fetchSingleProduct: async ({ productId }) => {
    const response = await Products.findByPk(productId, {
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
    });

    return response;
  },

  uploadImages: async ({ files }) => {
    const uploadPromises = files.map(async (file) => {
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

    const uploadResults = await Promise.all(uploadPromises);

    return uploadResults;
  },

  addNewProduct: async (body) => {
    const { name, quantity, price, fk_vendor_id, fk_category_id } = body;

    await Products.create({
      name,
      quantity,
      price,
      fk_category_id,
      fk_vendor_id,
      image_url: JSON.stringify(image_url),
    });
  },
};

module.exports = productsService;

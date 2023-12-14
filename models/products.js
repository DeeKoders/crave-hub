const moment = require("moment");
const { s3Client } = require("../integrations/s3Client");
const config = require("../config");

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fk_vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "vendors",
        key: "id",
      },
    },
    fk_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Products.associate = (models) => {
    Products.belongsTo(models.Categories, {
      as: "category",
      foreignKey: "fk_category_id",
      targetKey: "id",
    });
    Products.belongsTo(models.Vendors, {
      as: "vendor",
      foreignKey: "fk_vendor_id",
      targetKey: "id",
    });
    Products.hasMany(models.OrderItems, {
      foreignKey: "fk_product_id",
      as: "orderItem",
    });
  };

  Products.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  Products.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  Products.beforeBulkCreate(async (allProducts) => {
    allProducts.forEach((product) => {
      product.dataValues.createdAt = moment().unix();
    });
  });

  Products.uploadProductImages = async (files) => {
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
  };

  return Products;
};

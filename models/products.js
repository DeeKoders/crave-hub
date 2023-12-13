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
      type: DataTypes.STRING,
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
    Products.belongsTo(models.OrderItems, {
      as: "orderItem",
      foreignKey: "fk_product_id",
      targetKey: "id",
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

  return Products;
};

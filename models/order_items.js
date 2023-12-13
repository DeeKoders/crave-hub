module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define("order_items", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    fk_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
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

  OrderItems.associate = (models) => {
    OrderItems.belongsTo(models.Orders, {
      as: "order",
      foreignKey: "fk_order_id",
    });
  };
  OrderItems.associate = (models) => {
    OrderItems.hasOne(models.Products, {
      as: "product",
      foreignKey: "fk_product_id",
    });
  };

  OrderItems.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  OrderItems.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  OrderItems.beforeBulkCreate(async (allOrderItems) => {
    allOrderItems.forEach((orderItem) => {
      orderItem.dataValues.createdAt = moment().unix();
    });
  });

  return Users;
};

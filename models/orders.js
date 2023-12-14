const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
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

  Orders.associate = (models) => {
    Orders.belongsTo(models.Users, {
      as: "user",
      foreignKey: "fk_user_id",
    });
  };

  Orders.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  Orders.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  Orders.beforeBulkCreate(async (allOrders) => {
    allOrders.forEach((order) => {
      order.dataValues.createdAt = moment().unix();
    });
  });

  return Orders;
};

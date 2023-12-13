module.exports = (sequelize, DataTypes) => {
  const Vendors = sequelize.define("vendors", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Vendors.associate = (models) => {
    Vendors.hasMany(models.Products, {
      as: "products",
      foreignKey: "fk_vendor_id",
    });
  };

  Vendors.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  Vendors.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  Vendors.beforeBulkCreate(async (allVendors) => {
    allVendors.forEach((vendor) => {
      vendor.dataValues.createdAt = moment().unix();
    });
  });

  return Vendors;
};

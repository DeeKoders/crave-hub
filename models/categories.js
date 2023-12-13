module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("categories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
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

  Categories.associate = (models) => {
    Categories.hasMany(models.Products, {
      as: "products",
      foreignKey: "fk_category_id",
    });
  };

  Categories.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  Categories.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  Categories.beforeBulkCreate(async (allCategories) => {
    allCategories.forEach((category) => {
      category.dataValues.createdAt = moment().unix();
    });
  });

  return Categories;
};

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
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

  Users.beforeCreate(async (u) => {
    u.dataValues.createdAt = moment().unix();
    u.dataValues.updatedAt = moment().unix();
  });
  Users.beforeUpdate(async (u) => {
    u.dataValues.updatedAt = moment().unix();
  });

  Users.beforeBulkCreate(async (allUsers) => {
    allUsers.forEach((user) => {
      user.dataValues.createdAt = moment().unix();
    });
  });

  return Users;
};

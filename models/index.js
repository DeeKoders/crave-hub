"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const { camelCase, upperFirst } = require("lodash");
const { logInfo, logError } = require("../utils/logFunctions");
const db = {};

let sequelize = new Sequelize(
  config.get("db.name"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    port: config.get("db.port"),
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 120 * 1000,
    },
    logging: config.get("env") === "test" ? false : (log) => console.log(log),
  }
);

sequelize
  .authenticate()
  .then(() => {
    logInfo("Connection has been established successfully.");
  })
  .catch((err) => {
    logError(`Unable to connect to the database: ${err.message}`);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    let name = upperFirst(camelCase(model.name));
    db[name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

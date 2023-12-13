"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "fk_vendor_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "vendors",
        key: "id",
      },
    });
    await queryInterface.addColumn("products", "fk_category_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("products", "fk_vendor_id");
    await queryInterface.removeColumn("products", "fk_category_id");
  },
};

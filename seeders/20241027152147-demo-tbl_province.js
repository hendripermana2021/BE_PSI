"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_provinces",
      [
        {
          name_province: "Sumatera Utara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_province: "Sumatera Barat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_provinces", null, {});
  },
};

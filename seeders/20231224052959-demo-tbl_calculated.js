"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_calculateds",
      [
        {
          created_by: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          created_by: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_calculateds", null, {});
  },
};

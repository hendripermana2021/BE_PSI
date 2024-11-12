"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_programs",
      [
        {
          name_program: "Program 1",
          total_dana_alokasi: 10000000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_program: "Program 2",
          total_dana_alokasi: 10000000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_programs", null, {});
  },
};

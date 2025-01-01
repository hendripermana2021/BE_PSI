"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_programs",
      [
        {
          name_program:
            "PROGRAM PEMBINAAN DAN PENGEMBANGAN KETAHANAN EKONOMI, SOSIAL, DAN BUDAYA",
          total_dana_alokasi: 10000000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_program:
            "PROGRAM PEMBERDAYAAN DAN PENGAWASAN ORGANISASI KEMASYARAKATAN",
          total_dana_alokasi: 10000000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_program:
            "PROGRAM PENGUATAN IDEOLOGI PANCASILA DAN KARAKTER KEBANGSAAN",
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

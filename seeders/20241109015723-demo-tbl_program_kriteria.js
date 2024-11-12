"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_program_kriteria",
      [
        {
          id_program: 1,
          id_kriteria: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 4,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 4,
          id_kriteria: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 4,
          id_kriteria: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 5,
          id_kriteria: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 5,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 5,
          id_kriteria: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 6,
          id_kriteria: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 6,
          id_kriteria: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 6,
          id_kriteria: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_program_kriteria", null, {});
  },
};

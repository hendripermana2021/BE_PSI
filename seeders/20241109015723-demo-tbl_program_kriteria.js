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
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 2,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 3,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 4,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 5,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 6,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 7,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 1,
          id_kriteria: 8,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 1,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 2,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 3,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 4,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 5,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 6,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 7,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 2,
          id_kriteria: 8,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 1,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 2,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 3,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 4,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 5,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 6,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 7,
          weight_score: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_program: 3,
          id_kriteria: 8,
          weight_score: 0,
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

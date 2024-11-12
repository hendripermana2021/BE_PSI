"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_kriteria",
      [
        {
          name_kriteria: "Urgensi Program",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Kisaran Penerima Manfaat",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Kesesuaian dengan kebutuhan masyarakat",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Skala Implementasi",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Potensi hambatan operasional",
          weight_score: 0,
          type: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Kompleksitas kondisi lingkungan sekitar",
          weight_score: 0,
          type: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Konsep baru dalam pelaksanaan program",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_kriteria: "Peluang kolaborasi dengan pihak lain",
          weight_score: 0,
          type: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_kriteria", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_regions",
      [
        {
          name_region: "Deli Serdang",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Langkat",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Karo",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Simalungun",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Asahan",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Tapanuli Utara",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Medan",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Pematangsiantar",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Binjai",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Mandailing Natal",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_regions", null, {});
  },
};

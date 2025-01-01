"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_regions",
      [
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
        {
          name_region: "Padang Lawas",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Padang Lawas Utara",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Tapanuli Selatan",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Tapanuli Tengah",
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
          name_region: "Nias",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Nias Selatan",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Nias Barat",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Nias Utara",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Samosir",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Tobasa",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Dairi",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Pakpak Bharat",
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
          name_region: "Langkat",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Deli Serdang",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Serdang Bedagai",
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
          name_region: "Batubara",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Labuhanbatu",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Labuhanbatu Selatan",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Labuhanbatu Utara",
          id_province: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_region: "Toba Samosir",
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

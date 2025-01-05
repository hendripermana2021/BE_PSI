"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const idRegion = [1, 2, 3, 4, 19, 23, 21, 20, 16, 18];
    const createProgramEntries = (programId) => {
      return Array.from({ length: 10 }, (_, index) => ({
        id_users: index + 1,
        id_province: 1,
        id_region: idRegion[index], // Assuming id_region corresponds to id_users
        id_program: programId,
        psi_result: 0,
        commented: `Ajuan program pemerintahan ${index + 1}`,
        jlh_dana: 0,
        req_status: true,
        id_calculated: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    };

    const entries = [
      ...createProgramEntries(1),
      ...createProgramEntries(2),
      ...createProgramEntries(3),
    ];

    await queryInterface.bulkInsert("tbl_req_ajuans", entries, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_req_ajuans", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_req_ajuans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_users: {
        type: Sequelize.INTEGER,
      },
      id_province: {
        type: Sequelize.INTEGER,
      },
      id_region: {
        type: Sequelize.INTEGER,
      },
      id_program: {
        type: Sequelize.INTEGER,
      },
      jlh_dana: {
        type: Sequelize.DOUBLE,
      },
      psi_result: {
        type: Sequelize.FLOAT,
      },
      commented: {
        type: Sequelize.STRING,
      },
      req_status: {
        type: Sequelize.BOOLEAN,
      },
      id_calculated: {
        type: Sequelize.INTEGER,
      },
      rank: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_req_ajuans");
  },
};

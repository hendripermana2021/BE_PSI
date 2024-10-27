"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_reqs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      start_permission: {
        type: Sequelize.DATE,
      },
      end_permission: {
        type: Sequelize.DATE,
      },
      cpi_result: {
        type: Sequelize.FLOAT,
      },
      commented: {
        type: Sequelize.STRING,
      },
      permission_status: {
        type: Sequelize.INTEGER,
      },
      val_go_by: {
        type: Sequelize.INTEGER,
      },
      val_back_by: {
        type: Sequelize.INTEGER,
      },
      id_calculated: {
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
    await queryInterface.dropTable("tbl_reqs");
  },
};

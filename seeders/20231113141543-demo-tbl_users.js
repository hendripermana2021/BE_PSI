"use strict";
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          name: "Siti Kumalasari",
          sex: 1,
          email: "sitikumalasari@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 1,
          role_id: 1,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Setia Darma",
          sex: 1,
          email: "setia@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 3,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Yusuf",
          sex: 1,
          email: "yusuf@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 2,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dharma Bakti",
          sex: 1,
          email: "dharma@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 4,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sinka",
          sex: 1,
          email: "sinka@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 5,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Junaidah",
          sex: 1,
          email: "junaidah@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 6,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hilmi Ramadhan",
          sex: 1,
          email: "hilmi@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 7,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Satria",
          sex: 1,
          email: "satria@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 8,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Busri",
          sex: 1,
          email: "busri@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 9,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "talawi",
          sex: 1,
          email: "talawi@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 10,
          region_id: 10,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Juraima",
          sex: 1,
          email: "juraima@gmail.com",
          password: await bcrypt.hash("12345", 10),
          real_password: "12345",
          province_id: 1,
          region_id: 1,
          role_id: 2,
          accesstoken: "",
          refreshtoken: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_users", null, {});
  },
};

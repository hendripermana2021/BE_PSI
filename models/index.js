"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tbl_users = require("../models/tbl_user.js")(sequelize, Sequelize);
db.tbl_program = require("../models/tbl_program.js")(sequelize, Sequelize);
db.tbl_req_ajuan = require("../models/tbl_req_ajuan.js")(sequelize, Sequelize);
db.tbl_notification = require("../models/tbl_notification.js")(
  sequelize,
  Sequelize
);
db.tbl_calculated = require("../models/tbl_calculated.js")(
  sequelize,
  Sequelize
);
db.tbl_psi = require("../models/tbl_psi.js")(sequelize, Sequelize);
db.tbl_kriteria = require("../models/tbl_kriteria.js")(sequelize, Sequelize);
db.tbl_subkriteria = require("../models/tbl_subkriteria.js")(
  sequelize,
  Sequelize
);
db.tbl_role = require("../models/tbl_role.js")(sequelize, Sequelize);
db.tbl_province = require("../models/tbl_province.js")(sequelize, Sequelize);
db.tbl_region = require("../models/tbl_region.js")(sequelize, Sequelize);
db.tbl_program_kriteria = require("../models/tbl_program_kriteria.js")(
  sequelize,
  Sequelize
);

//FOR API PROGRAMS

db.tbl_program.hasMany(db.tbl_req_ajuan, {
  foreignKey: "id_program",
  as: "ajuan_program",
  sourceKey: "id",
});

db.tbl_program.hasMany(db.tbl_program_kriteria, {
  foreignKey: "id_program",
  as: "programs_kriteria",
  sourceKey: "id",
});

//END API PROGRAMS

//for API KRITERIA, SUBKRITERIA
db.tbl_kriteria.hasMany(db.tbl_subkriteria, {
  foreignKey: "id_kriteria",
  as: "sub_kriteria",
  sourceKey: "id",
});

//END API KRITERIA & SUBKRITERIA

//for API USERS
db.tbl_users.belongsTo(db.tbl_role, {
  as: "role",
  foreignKey: "role_id",
  targetKey: "id", // Example of a custom target key in tbl_role
});

db.tbl_users.belongsTo(db.tbl_province, {
  as: "province",
  foreignKey: "province_id",
  targetKey: "id",
});

db.tbl_users.belongsTo(db.tbl_region, {
  as: "region",
  foreignKey: "region_id",
  targetKey: "id",
});

db.tbl_users.hasMany(db.tbl_notification, {
  foreignKey: "user_id",
  as: "notification",
  sourceKey: "id",
});

db.tbl_users.hasMany(db.tbl_req_ajuan, {
  foreignKey: "id_user",
  as: "request_ajuan",
  sourceKey: "id",
});

//END API USERS

//FOR API REQUEST AJUAN
db.tbl_req_ajuan.belongsTo(db.tbl_province, {
  foreignKey: "id_provinces",
  as: "province",
  sourceKey: "id",
});

db.tbl_req_ajuan.belongsTo(db.tbl_province, {
  foreignKey: "id_region",
  as: "region",
  sourceKey: "id",
});

db.tbl_req_ajuan.belongsTo(db.tbl_program, {
  foreignKey: "id_program",
  as: "program",
  sourceKey: "id",
});

db.tbl_req_ajuan.hasMany(db.tbl_psi, {
  foreignKey: "id_order",
  as: "psi_data",
  sourceKey: "id",
});

db.tbl_req_ajuan.hasMany(db.tbl_psi, {
  as: "cpi_data",
  foreignKey: "id_order",
});

//END API PERMISSION

//RELATION API FOR KRITERIA & SUBKRITERIA

db.tbl_kriteria.hasMany(db.tbl_psi, {
  foreignKey: "id_order",
  as: "order",
  sourceKey: "id",
});

//END API

//for API METHOD PSI and ROC
db.tbl_psi.belongsTo(db.tbl_kriteria, {
  foreignKey: "id_kriteria",
  as: "kriteria",
  targetKey: "id",
});

db.tbl_psi.belongsTo(db.tbl_subkriteria, {
  foreignKey: "id_subkriteria",
  as: "subkriteria",
  targetKey: "id",
});

//END API METHOD PSI and ROC

//RELATION PROVINCE
db.tbl_region.hasMany(db.tbl_province, {
  foreignKey: "id",
  as: "province",
  sourceKey: "id_province",
});

db.tbl_province.hasMany(db.tbl_region, {
  foreignKey: "id_province",
  as: "region",
  sourceKey: "id",
});

//END RELATION PROVINCE

//PROGRAM WITH KRITERIA
db.tbl_program_kriteria.belongsTo(db.tbl_program, {
  foreignKey: "id",
  as: "program",
  sourceKey: "id_program",
});

db.tbl_program_kriteria.belongsTo(db.tbl_kriteria, {
  foreignKey: "id_kriteria",
  as: "kriteria",
  sourceKey: "id",
});

module.exports = db;

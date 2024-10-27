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

db.tbl_santri = require("../models/tbl_santri.js")(sequelize, Sequelize);
db.tbl_pegawai = require("../models/tbl_pegawai.js")(sequelize, Sequelize);
db.tbl_kriteria = require("../models/tbl_kriteria.js")(sequelize, Sequelize);
db.tbl_notification = require("../models/tbl_notification.js")(
  sequelize,
  Sequelize
);
db.tbl_req = require("../models/tbl_req.js")(sequelize, Sequelize);
db.tbl_role = require("../models/tbl_role.js")(sequelize, Sequelize);
db.tbl_room = require("../models/tbl_room.js")(sequelize, Sequelize);
db.tbl_subkriteria = require("../models/tbl_subkriteria.js")(
  sequelize,
  Sequelize
);
db.tbl_cpi = require("../models/tbl_cpi.js")(sequelize, Sequelize);

db.tbl_req.hasMany(db.tbl_cpi, {
  as: "cpi_data",
  foreignKey: "id_order",
});

//for API KRITERIA & SUBKRITERIA
db.tbl_kriteria.hasMany(db.tbl_subkriteria, {
  foreignKey: "id_kriteria",
  as: "sub_kriteria",
  sourceKey: "id",
});

//END API KRITERIA & SUBKRITERIA

//for API SANTRI
db.tbl_santri.belongsTo(db.tbl_room, {
  as: "nameroom",
  foreignKey: "id_room",
});

db.tbl_santri.belongsTo(db.tbl_req, {
  foreignKey: "id",
  as: "cpi",
  sourceKey: "student_id",
});

db.tbl_room.belongsTo(db.tbl_pegawai, {
  as: "walikamar",
  foreignKey: "id_ustadz",
});

//END API SANTRI

//for API PEGAWAI
db.tbl_pegawai.belongsTo(db.tbl_role, {
  as: "role",
  foreignKey: "role_id",
});

//END API PEGAWAI

//API FOR ROOMS
db.tbl_room.belongsTo(db.tbl_pegawai, {
  as: "namaustadz",
  foreignKey: "id_ustadz",
});

//END API ROOMS

//FOR API PERMISSION
db.tbl_req.belongsTo(db.tbl_santri, {
  foreignKey: "student_id",
  as: "namasantri",
});

db.tbl_req.belongsTo(db.tbl_pegawai, {
  foreignKey: "val_go_by",
  as: "val_go_name",
  targetKey: "id",
});

db.tbl_req.belongsTo(db.tbl_pegawai, {
  foreignKey: "created_by",
  as: "created_permission",
  targetKey: "id",
});

db.tbl_req.belongsTo(db.tbl_pegawai, {
  foreignKey: "val_back_by",
  as: "val_back_name",
  targetKey: "id",
});
//END API PERMISSION

//for API METHOD CPI and ROC
db.tbl_cpi.belongsTo(db.tbl_kriteria, {
  foreignKey: "id_kriteria",
  as: "kriteria",
  targetKey: "id",
});

db.tbl_cpi.belongsTo(db.tbl_subkriteria, {
  foreignKey: "id_subkriteria",
  as: "subkriteria",
  targetKey: "id",
});
//END API METHOD CPI and ROC

module.exports = db;

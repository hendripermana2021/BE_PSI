"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_req_ajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_req_ajuan.init(
    {
      id_province: DataTypes.INTEGER,
      id_region: DataTypes.INTEGER,
      id_program: DataTypes.INTEGER,
      jlh_dana: DataTypes.FLOAT,
      psi_result: DataTypes.FLOAT,
      commented: DataTypes.STRING,
      req_status: DataTypes.BOOLEAN,
      id_calculated: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_req_ajuan",
    }
  );
  return tbl_req_ajuan;
};

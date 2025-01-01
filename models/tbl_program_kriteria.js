"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_program_kriteria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_program_kriteria.init(
    {
      id_program: DataTypes.INTEGER,
      id_kriteria: DataTypes.INTEGER,
      weight_score: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "tbl_program_kriteria",
    }
  );
  return tbl_program_kriteria;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_province.init(
    {
      name_province: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_province",
    }
  );
  return tbl_province;
};

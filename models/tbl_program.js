'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_program.init({
    name_program: DataTypes.STRING,
    total_dana_alokasi: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tbl_program',
  });
  return tbl_program;
};
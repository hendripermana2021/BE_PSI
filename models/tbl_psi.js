'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_psi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_psi.init({
    id_kriteria: DataTypes.INTEGER,
    id_subkriteria: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    id_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_psi',
  });
  return tbl_psi;
};
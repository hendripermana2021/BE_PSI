'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_region extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_region.init({
    id_province: DataTypes.INTEGER,
    name_region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_region',
  });
  return tbl_region;
};
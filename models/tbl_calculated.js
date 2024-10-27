'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_calculated extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_calculated.init({
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_calculated',
  });
  return tbl_calculated;
};
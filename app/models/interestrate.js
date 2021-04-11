'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InterestRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  InterestRate.init({
    creditType: DataTypes.STRING,
    intervalInMonths: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InterestRate',
  });
  return InterestRate;
};
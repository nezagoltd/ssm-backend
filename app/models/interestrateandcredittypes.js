const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class interestRateAndCreditTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  interestRateAndCreditTypes.init({
    creditType: DataTypes.STRING,
    rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'interestRateAndCreditTypes',
  });
  return interestRateAndCreditTypes;
};
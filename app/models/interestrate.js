const {
  Model,
} = require('sequelize');

export default (sequelize, DataTypes) => {
  /**
   * @class
   */
  class InterestRate extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      InterestRate.belongsTo(models.User, {
        foreignKey: 'creatorId',
      });
    }
  }
  InterestRate.init({
    creatorId: DataTypes.INTEGER,
    creditType: DataTypes.STRING,
    intervalInMonths: DataTypes.STRING,
    rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'InterestRate',
    tableName: 'interestRates',
    paranoid: true,
    timestamps: true,
  });
  return InterestRate;
};
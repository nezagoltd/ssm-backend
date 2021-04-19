const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * @class
   */
  class TransactionType extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      TransactionType.belongsTo(models.User, {
        foreignKey: 'creatorId',
      });
    }
  }
  TransactionType.init({
    typeName: DataTypes.STRING,
    creatorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'TransactionType',
    tableName: 'transactionTypes',
    paranoid: true,
  });
  return TransactionType;
};
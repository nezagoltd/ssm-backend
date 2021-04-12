const {
  Model,
} = require('sequelize');

export default (sequelize, DataTypes) => {
  /**
   * @class
   */
  class AccountType extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      AccountType.belongsTo(models.User, {
        foreignKey: 'creatorId',
      });
    }
  }
  AccountType.init({
    creatorId: DataTypes.INTEGER,
    typeName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AccountType',
  });
  return AccountType;
};
const {
  Model,
} = require('sequelize');

export default (sequelize, DataTypes) => {
  /**
   * @class
   */
  class MemberType extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      MemberType.belongsTo(models.User, {
        foreignKey: 'creatorId',
      });
    }
  }
  MemberType.init({
    typeName: DataTypes.STRING,
    creatorId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MemberType',
  });
  return MemberType;
};
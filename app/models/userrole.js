import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  /**
   * @class
   */
  class UserRole extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      // define association here
      UserRole.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      UserRole.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }
  }
  UserRole.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'userRoles',
    paranoid: true,
    timestamps: true,
  });
  return UserRole;
};

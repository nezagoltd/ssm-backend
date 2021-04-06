import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  /**
   * @class
   */
  class Role extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description this is where we define asociation
     */
    static associate(models) {
      Role.hasMany(models.UserRole, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Role.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    paranoid: true,
    timestamps: true,
  });
  return Role;
};

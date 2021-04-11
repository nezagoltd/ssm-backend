import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
/**
 * @class
 */
  class User extends Model {
    /**
     * @param {object} models
     * @returns {void}
     * @description we define associations here
     */
    static associate(models) {
      User.hasMany(models.UserRole, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.UserRole, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN,
    isVerified: DataTypes.BOOLEAN,
    isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamps: true,
  });
  return User;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
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
    paranoid: true,
    timestamps: true,
  });
  return UserRole;
};

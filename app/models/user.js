const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    role: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isConfirmed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true,
  });
  return User;
};

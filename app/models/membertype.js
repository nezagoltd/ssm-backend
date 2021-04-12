'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class memberType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  memberType.init({
    typeName: DataTypes.STRING,
    creatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'memberType',
  });
  return memberType;
};
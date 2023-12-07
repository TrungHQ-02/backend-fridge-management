"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UnitOfMeasurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UnitOfMeasurement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      unitName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UnitOfMeasurement",
    }
  );
  return UnitOfMeasurement;
};

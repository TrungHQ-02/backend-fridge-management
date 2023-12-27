"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FridgeItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FridgeItem.belongsTo(models.User);
      FridgeItem.belongsTo(models.Food);
    }
  }
  FridgeItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      expiredDate: {
        type: DataTypes.DATE,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      note: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "FridgeItem",
    }
  );
  return FridgeItem;
};

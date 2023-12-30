"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShoppingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingList.belongsTo(models.User);
      ShoppingList.hasMany(models.ShoppingListDetail);
    }
  }
  ShoppingList.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
      belongsToGroupAdminId: {
        type: DataTypes.INTEGER,
      },
      assignedToUserId: {
        type: DataTypes.INTEGER,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ShoppingList",
    }
  );
  return ShoppingList;
};

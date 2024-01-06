"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MealPlan);
      User.hasMany(models.FridgeItem);
      User.hasMany(models.ShoppingList);
      User.hasMany(models.Food);

      // User.hasMany(models.User, {
      //   foreignKey: "belongsToGroupAdminId",
      // });

      // User.belongsTo(models.User);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      language: {
        type: DataTypes.STRING,
        defaultValue: "en",
      },
      gender: {
        type: DataTypes.STRING,
      },
      countryCode: {
        type: DataTypes.STRING,
      },
      timezone: {
        type: DataTypes.INTEGER,
      },
      birthDate: {
        type: DataTypes.DATE,
      },
      photoUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      deviceId: {
        type: DataTypes.STRING,
      },
      // added on 12/7/23
      belongsToGroupAdminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      notificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defautValue: "",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

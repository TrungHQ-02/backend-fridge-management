"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.hasOne(models.MealPlan);
      Food.hasMany(models.FridgeItem);
      Food.belongsTo(models.User);
      Food.belongsTo(models.FoodCategory);
      Food.belongsTo(models.UnitOfMeasurement);
      Food.hasMany(models.ShoppingListDetail);
    }
  }
  Food.init(
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
      imageUrl: {
        type: DataTypes.STRING,
        defaultValue:
          "https://th.bing.com/th/id/R.548a12fad490b2b1ef2064c7a9354245?rik=GmPntyKgA6kb5A&riu=http%3a%2f%2fimages.huffingtonpost.com%2f2014-04-07-af1.jpg&ehk=%2bp%2fkN95IBx6Uu7nvJHw%2fTtthzWSCeBu9iKakzrSJtJA%3d&risl=&pid=ImgRaw&r=0",
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: "ingredient",
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};

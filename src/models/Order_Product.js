const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order_product", {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    price: {
      type: DataTypes.FLOAT,
    },
  });
};

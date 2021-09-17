const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    state: {
      type: DataTypes.ENUM(
        "carrito",
        "creada",
        "despachado",
        "cancelada",
        "procesando",
        "completa"
      ),
      defaultValue: "carrito",
    },
  });
};

const jwt = require("jsonwebtoken");

const { Order, Product, User } = require("../../db");

const getOrders = async (req, res) => {
  try {
    //estados de una orden
    const { state } = req.query;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado order",
        });
      } else {
        if (state) {
          let orderForQuery = await Order.findAll({
            where: { state: state },
            include: [{ model: Product }, { model: User }],
          });
          if (orderForQuery) {
            res.status(200).json({
              order: orderForQuery,
              type: "orden segun estado requerído",
            });
          } else {
            res.status(404).json({
              msg: "no existe orden con el estado recibido",
            });
          }
        } else {
          let allOrders = await Order.findAll({
            include: [{ model: Product }, { model: User }],
          });

          if (allOrders) {
            res.status(200).json({
              order: allOrders,
              type: "todas las ordenes existentes en la base de datos",
            });
          } else {
            res.status(404).json({
              msg: "no existen ordenes en la base de datos",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al obtener todas las ordenes");
  }
};

module.exports = {
  getOrders,
};

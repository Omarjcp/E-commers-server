const jwt = require("jsonwebtoken");

const { Order } = require("../../db");

const updateStateOrder = async (req, res) => {
  try {
    const { orderId, state } = req.query;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado order",
        });
      } else {
        if (orderId) {
          let stateOrderUpdate = await Order.update(
            { state: state },
            { where: { id: orderId } }
          );

          if (stateOrderUpdate) {
            res.status(200).json({
              order: stateOrderUpdate,
              type: "estado de la orden actualizada",
            });
          } else {
            res.status(404).json({
              msg: "el id de la orden no existe",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al actualizar estado de orden", err);
  }
};

module.exports = {
  updateStateOrder,
};

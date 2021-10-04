const jwt = require("jsonwebtoken");

const { Order } = require("../../db");

const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado order",
        });
      } else {
        if (userId) {
          let myOrders = await Order.findAll({
            where: { userId: userId },
            include: [{ model: Product }, { model: User }],
          });

          if (myOrders) {
            res.status(200).json({
              orders: myOrders,
              type: "mis ordenes",
            });
          } else {
            res.status(404).json({
              msg: "id de usuario no corresponde a ninguna orden",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al obtener ordenes segun id del usuario", err);
  }
};

module.exports = {
  getMyOrders,
};

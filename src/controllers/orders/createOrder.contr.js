const { Order } = require("../../db");

const createOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const order = await Order.findOrCreate({
        where: {
          userId: req.params.userId,
          state: "completa",
        },
      });
    }
  } catch (err) {
    console.log("error al crear orden de compra", err);
  }
};

module.exports = {
  createOrder,
};

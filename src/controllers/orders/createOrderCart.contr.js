const jwt = require("jsonwebtoken");

const { Order, Order_product, Product } = require("../../db");

const createOrderCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const products = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado order",
        });
      } else {
        if (userId) {
          let order = await Order.create({
            where: {
              userId: userId,
              state: "creada",
            },
          });

          let orderProduct = products?.map((product) => {
            Order_product.create({
              where: {
                orderId: order[0].id,
                quantity: product.quantity,
                price: product.price,
                productId: product.productId,
              },
            });
          });

          let productsDb = await Order.findOne({
            where: {
              userId: userId,
              state: "creada",
            },
            include: [Product],
          });

          productsDb.products.map(async (product) => {
            let modifyProductStock = await Product.findOne({
              where: { id: product.id },
            });

            await Product.update(
              {
                stock:
                  modifyProductStock.stock - product.order_product.quantity < 0
                    ? 0
                    : modifyProductStock.stock - product.order_product.quantity,
              },
              { where: { id: product.id } }
            );
          });

          if (orderProduct) {
            res.status(200).json({
              products: productsDb,
              type: "orden creada con productos asociados",
            });
          }
        } else {
          res.status(404).json({
            msg: "usuario sin orden realizada",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear orden de compra", err);
  }
};

module.exports = {
  createOrderCart,
};

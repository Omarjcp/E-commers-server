const jwt = require("jsonwebtoken");
const { Product, Category } = require("../../db");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, type, image, category } = req.body;
    // jwt.verify(req.token, "secretKey", async (err, data) => {
    //   if (err) {
    //     res.json({
    //       msg: "acceso denegado",
    //     });
    //   } else {
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !type ||
      !image ||
      category
    ) {
      return res.status(404).json({
        message: "Todos los campos son obligatorios",
      });
    }
    if (category) {
      let categoryDb = await Category.findOne({
        where: { name: category },
      });
      if (!categoryDb) {
        let categoryCreate = await Category.create({
          name: category,
        });
        let productCreate = await Product.create({
          name,
          description,
          price,
          stock,
          type,
          image,
          categoriumId: categoryCreate.id,
        });
        if (productCreate) {
          res.json({
            msg: "Producto y categoria creado correctamente",
          });
        }
      } else {
        let productCreate = await Product.create({
          name,
          description,
          price,
          stock,
          type,
          image,
          categoriumId: categoryDb.id,
        });
        if (productCreate) {
          res.json({
            msg: "Producto creado correctamente",
          });
        }
      }
    }
    //   }
    // });
  } catch (err) {
    console.log("error en la creación del producto", err);
  }
};

module.exports = {
  createProduct,
};

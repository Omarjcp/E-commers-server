const { Product } = require("../../db");
const { getProductsIdDb } = require("../utils/getDataDb");

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let productId = await getProductsIdDb(id);

    if (id) {
      if (!productId) {
        res.json({
          msg: "Producto no existente",
        });
      } else {
        await Product.destroy({ where: { id } });
        res.json({
          msg: "Producto eliminado correctamente",
        });
      }
    } else {
      res.json({
        msg: "Debe enviar un id de producto",
      });
    }
  } catch (err) {
    console.log("error al borrar producto", err);
  }
};

module.exports = {
  deleteProduct,
};

const { Product } = require("../../db");
const { filterForName } = require("../utils/filterProductsForName");
const { getProductsDb } = require("../utils/getDataDb");

const getProducts = async (req, res) => {
  try {
    const { name, page } = req.query;

    let productsDb = await getProductsDb();

    if (name) {
      let productsFiltered = filterForName(productsDb, name);

      if (productsFiltered.length > 0) {
        if (page) {
          let productsCut = productsFiltered.slice(page * 4, page * 4 + 4);
          res.json({
            tipo: "productos segun el nombre y pagina",
            data: productsCut,
          });
        } else {
          let productsCut = productsFiltered.slice(0, 4);
          res.json({
            tipo: "productos segun el nombre del producto sin pagina",
            data: productsCut,
          });
        }
      } else {
        res.json({
          tipo: "Este producto no existe",
        });
      }
    } else {
      if (page) {
        let productsCut = productsDb.slice(page * 4, page * 4 + 4);
        res.json({
          tipo: "productos segun el nombre y pagina",
          data: productsCut,
        });
      } else {
        res.json({
          tipo: "Todos los productos",
          data: productsDb,
        });
      }
    }
  } catch (err) {
    console.log("error al obtener productos", err);
  }
};

module.exports = {
  getProducts,
};

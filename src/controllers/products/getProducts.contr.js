const { Product } = require("../../db");
const { filterForName } = require("../utils/filterProductsForName");
const {
  getProductsDb,
  getProductsIdDb,
  getProductsForCategoryDb,
} = require("../utils/getDataDb");

const getProducts = async (req, res) => {
  try {
    const { name, page } = req.query;

    let productsDb = await getProductsDb();

    if (name) {
      let productsFiltered = filterForName(productsDb, name);

      if (productsFiltered.length > 0) {
        // if (page) {
        //   let productsCut = productsFiltered.slice(page * 4, page * 4 + 4);
        //   res.json({
        //     type: "productos segun el nombre y pagina",
        //     data: productsCut,
        //     longitud: productsDb.length,
        //   });
        // } else {
        //   let productsCut = productsFiltered.slice(0, 4);
        res.json({
          type: "productos segun el nombre del producto sin pagina",
          data: productsFiltered,
          longitud: productsDb.length,
        });
        // }
      } else {
        res.json({
          type: "Este producto no existe",
        });
      }
    } else {
      // if (page) {
      //   let productsCut = productsDb.slice(page * 4, page * 4 + 4);
      //   res.json({
      //     type: "productos segun el nombre y pagina",
      //     data: productsCut,
      //     longitud: productsDb.length,
      //   });
      // } else {
      res.json({
        type: "Todos los productos",
        data: productsDb,
        longitud: productsDb.length,
      });
      // }
    }
  } catch (err) {
    console.log("error al obtener productos", err);
  }
};

const getOneProductsForId = async (req, res) => {
  try {
    const { id } = req.params;

    let productForIdDb = await getProductsIdDb(id);

    if (productForIdDb) {
      res.status(200).json({
        type: "producto segun id",
        data: productForIdDb,
      });
    } else {
      res.status(404).json({
        msg: "Producto no encontrado",
      });
    }
  } catch (err) {
    console.log("error al obtener un producto por id", err);
  }
};

const getProductsForCategory = async (req, res) => {
  try {
    const { category } = req.params;
    // const { page } = req.query;

    let productsForCategory = await getProductsForCategoryDb(category);

    if (category) {
      if (productsForCategory.length > 0) {
        // let productsCut = productsForCategory.slice(page * 4, page * 4 + 4);

        res.status(200).json({
          type: "productos segun categoria",
          data: productsForCategory,
          longitud: productsForCategory.length,
        });
      } else {
        res
          .status(404)
          .json({ msg: "Esta categoría no esta asociada a ningún producto" });
      }
    } else {
      res.status(404).json({ msg: "Categoria no encontrada" });
    }
  } catch (err) {
    console.log("error al obtener productos segun categoria", err);
  }
};

module.exports = {
  getProducts,
  getOneProductsForId,
  getProductsForCategory,
};

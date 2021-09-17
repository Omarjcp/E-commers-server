const { getCategoriesDb, getCategoriesIdDb } = require("../utils/getDataDb");

const getCategories = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const getCategoriesId = await getCategoriesIdDb(id);
      if (getCategoriesId) {
        res.status(200).json({
          type: "Categoria segun id",
          data: getCategoriesId,
        });
      } else {
        res.status(404).json({
          msg: "categoria no encontrada",
        });
      }
    } else {
      const getAllCategories = await getCategoriesDb();
      if (getAllCategories) {
        res.status(200).json({
          type: "Todas las categorias",
          data: getAllCategories,
        });
      }
    }
  } catch (err) {
    console.log("error al intentar obtener las categorias", err);
  }
};

module.exports = getCategories;

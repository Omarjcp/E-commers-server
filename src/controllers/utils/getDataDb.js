const { Product, Category } = require("../../db");

//productos de la base de datos

//todos los productos
const getProductsDb = async () => {
  try {
    const getAllProducts = await Product.findAll();
    return getAllProducts;
  } catch (err) {
    console.log(
      "error al obtener todos los productos de la base de datos",
      err
    );
  }
};

//productos segun el nombre pasado por parametro
const getProductsNameDb = async (nameProduct) => {
  try {
    const getAllProductsWithName = await Product.findAll({
      where: { name: nameProduct },
    });
    return getAllProductsWithName;
  } catch (err) {
    console.log(
      "error al obtener todos los productos por nombre de la base de datos",
      err
    );
  }
};

//producto segun id pasado por parametro
const getProductsIdDb = async (id) => {
  try {
    if (id) {
      const getProductId = await Product.findOne({
        where: { id: id },
      });
      return getProductId;
    }
  } catch (err) {
    console.log("error al obtener categoria segun id en la base de datos", err);
  }
};

//productos asociados a categoria pasado por parametro
const getProductsForCategoryDb = async (name) => {
  try {
    const { dataValues } = await Category.findOne({
      where: { name: name },
    });
    const getProductsForCategory = await Product.findAll({
      where: { categoryId: dataValues?.id },
    });
    return getProductsForCategory;
  } catch (err) {
    console.log(
      "error al obtener producto segun categoria en la base de datos",
      err
    );
  }
};

//Categorias de la base de datos

//todas las categorias
const getCategoriesDb = async () => {
  try {
    const getAllCategories = await Category.findAll();
    return getAllCategories;
  } catch (err) {
    console.log(
      "error al obtener todas las categorias de la base de datos",
      err
    );
  }
};

//categoria segun id pasado por parametro
const getCategoriesIdDb = async (id) => {
  try {
    if (id) {
      const getCategoriesId = await Category.findOne({
        where: { id: id },
      });
      return getCategoriesId;
    }
  } catch (err) {
    console.log("error al obtener categoria segun id en la base de datos", err);
  }
};

//categoria segun nombre pasado por parametro
const getCategoriesNameDb = async (name) => {
  try {
    if (name) {
      const getCategoryForName = await Category.findOne({
        where: { name: name },
      });
      return getCategoryForName;
    }
  } catch (err) {
    console.log(
      "error al obtener categoria segun nombre en la base de datos",
      err
    );
  }
};

module.exports = {
  getProductsDb,
  getProductsForCategoryDb,
  getProductsNameDb,
  getProductsIdDb,
  getCategoriesDb,
  getCategoriesIdDb,
  getCategoriesNameDb,
};

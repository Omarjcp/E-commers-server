const { Router } = require("express");

//importa controladores (funciones de las rutas)
const {
  createProduct,
} = require("../controllers/products/createProduct.contr.js");
const {
  deleteProduct,
} = require("../controllers/products/deleteProduct.contr.js");
const {
  getProducts,
  getOneProductsForId,
  getProductsForCategory,
} = require("../controllers/products/getProducts.contr.js");
const {
  modifyProduct,
} = require("../controllers/products/modifyProduct.contr.js");

//comprobacion de acceso con JWT
// const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//ruta post
router.post("/", createProduct);

//ruta put
router.put("/:id", modifyProduct);

//ruta get
router.get("/", getProducts);
router.get("/:id", getOneProductsForId);
router.get("/category/:category", getProductsForCategory);

//ruta delete
router.delete("/:id", deleteProduct);

module.exports = router;

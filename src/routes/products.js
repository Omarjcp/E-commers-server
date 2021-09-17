const { Router } = require("express");

//importa controladores (funciones de las rutas)
const {
  createProduct,
} = require("../controllers/products/createProduct.contr.js");
const { getProducts } = require("../controllers/products/getProducts.contr.js");

//comprobacion de acceso con JWT
// const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//ruta post
router.post("/", createProduct);

//ruta get
router.get("/", getProducts);

module.exports = router;

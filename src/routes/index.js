const { Router } = require("express");

//importa funciones de rutas
const products = require("./products");

const router = Router();

//crea endpoints
router.use("/products", products);

module.exports = router;

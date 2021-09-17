const { Router } = require("express");

//importa funciones de rutas
const products = require("./products");
const categories = require("./categories");

const router = Router();

//crea endpoints
router.use("/products", products);
router.use("/categories", categories);

module.exports = router;

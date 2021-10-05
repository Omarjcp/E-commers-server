const { Router } = require("express");

//importa funciones de rutas
const products = require("./products");
const categories = require("./categories");
const user = require("./user");
const login = require("./login");
const order = require("./orders");
const review = require("./reviews");

const router = Router();

//crea endpoints
router.use("/products", products);
router.use("/categories", categories);
router.use("/user", user);
router.use("/login", login);
router.use("/order", order);
router.use("/review", review);

module.exports = router;

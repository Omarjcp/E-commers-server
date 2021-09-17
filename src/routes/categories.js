const { Router } = require("express");

//importa controladores (funciones de las rutas)
const getCategories = require("../controllers/categories/getCategories.contr.js");

//comprobacion de acceso con JWT
// const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//ruta get
router.get("/", getCategories);

module.exports = router;

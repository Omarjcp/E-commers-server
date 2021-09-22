const { Router } = require("express");
const { createAdmin } = require("../controllers/users/createAdmin.contr");
const { createUser } = require("../controllers/users/createUser.contr");
const {
  getUsers,
  getUserById,
} = require("../controllers/users/getUsers.contr");

// comprobacion de acceso con JWT
const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//ruta post
router.post("/", createUser);
router.post("/admin", middelwareToken, createAdmin);

//ruta get
router.get("/", middelwareToken, getUsers);
router.get("/:id", middelwareToken, getUserById);

module.exports = router;

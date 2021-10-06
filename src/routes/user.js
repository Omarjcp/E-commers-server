const { Router } = require("express");
const { createAdmin } = require("../controllers/users/createAdmin.contr");
const { createUser } = require("../controllers/users/createUser.contr");
const {
  getUsers,
  getUserById,
} = require("../controllers/users/getUsers.contr");
const { modifyUser } = require("../controllers/users/modifyUser.contr");
const { resetPassword } = require("../controllers/users/resetPassword.contr");

// comprobacion de acceso con JWT
const middelwareToken = require(".././controllers/utils/verificationToken");
const isAdmin = require("../controllers/utils/verificationAdmin");

const router = Router();

//ruta post
router.post("/", createUser);
router.post("/admin", isAdmin, createAdmin);

//ruta put
router.put("/", middelwareToken, modifyUser);
router.put("/reset_password", middelwareToken, resetPassword);

//ruta get
router.get("/", isAdmin, getUsers);
router.get("/:id", isAdmin, getUserById);

module.exports = router;

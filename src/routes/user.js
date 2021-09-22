const { Router } = require("express");
const { createAdmin } = require("../controllers/users/createAdmin.contr");
const { createUser } = require("../controllers/users/createUser.contr");
const {
  getUsers,
  getUserById,
} = require("../controllers/users/getUsers.contr");

const router = Router();

//ruta post
router.post("/", createUser);
router.post("/admin", createAdmin);

//ruta get
router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;

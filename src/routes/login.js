const { Router } = require("express");
const { signIn } = require("../controllers/users/signIn.contr");

const router = Router();

router.post("/", signIn);

module.exports = router;

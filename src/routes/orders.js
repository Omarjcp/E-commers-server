const { Router } = require("express");

const {
  createOrderCart,
} = require("../controllers/orders/createOrderCart.contr");
const {
  updateStateOrder,
} = require("../controllers/orders/updateStateOrder.contr");
const { getMyOrders } = require("../controllers/orders/getMyOrders.contr");
const { getOrders } = require("../controllers/orders/getOrders.contr");

// comprobacion de acceso con JWT
const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//ruta post
router.post("/cart", middelwareToken, createOrderCart);

//ruta put
router.put("/changeState", middelwareToken, updateStateOrder);

//ruta get
router.get("/", middelwareToken, getOrders);
router.get("/:userId", middelwareToken, getMyOrders);

module.exports = router;

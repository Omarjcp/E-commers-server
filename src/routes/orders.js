const { Router } = require("express");
const { createOrder } = require("../controllers/orders/createOrder.contr");

//ruta post
router.post("/", createOrder);

//ruta get
// router.get("/", getOrders);

const router = Router();

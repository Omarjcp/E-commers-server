const { Router } = require("express");

const { createReview } = require("../controllers/reviews/createReview.contr");
const {
  getReviewForUserId,
} = require("../controllers/reviews/getReviewForUserId.contr");
const { getAllReview } = require("../controllers/reviews/getAllReview.contr");
const { deleteReview } = require("../controllers/reviews/deleteReview.contr");

// comprobacion de acceso con JWT
const middelwareToken = require(".././controllers/utils/verificationToken");

const router = Router();

//rutas post
router.post("/:userId/:productId", middelwareToken, createReview);

//rutas get
router.get("/all", getAllReview);
router.get("/:userId", getReviewForUserId);

//ruta delete
router.delete("/:idReview/:idProduct", middelwareToken, deleteReview);

module.exports = router;

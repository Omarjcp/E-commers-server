const jwt = require("jsonwebtoken");

const { Review } = require("../../db");

const createReview = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { comments, score } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado create review",
        });
      } else {
        if (comments && score) {
          let reviewCreate = await Review.create({
            comments: comments,
            score: score,
            userId: userId,
            productId: productId,
          });
          if (reviewCreate) {
            res.status(200).json({
              data: reviewCreate,
              type: "Review creada correctamente",
            });
          }
        } else {
          res.status(404).json({
            msg: "no se recibieron los datos necesarios para crear el review",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear review", err);
  }
};

module.exports = {
  createReview,
};

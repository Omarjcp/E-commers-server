const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const { Review } = require("../../db");

const deleteReview = async (req, res) => {
  try {
    const { idReview, idProduct } = req.params;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado delete review",
        });
      } else {
        let reviewByDelete = await Review.findOne({
          where: {
            [Op.and]: [
              {
                productId: idProduct,
              },
              {
                id: idReview,
              },
            ],
          },
        });

        if (reviewByDelete) {
          await reviewByDelete.destroy();
          res.status.json({
            msg: "review eliminada correctamente",
          });
        } else {
          res.status.json({
            msg: "review no encontrada",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al borrar review", err);
  }
};

module.exports = {
  deleteReview,
};

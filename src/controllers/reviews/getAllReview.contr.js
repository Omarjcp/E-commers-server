const { Review } = require("../../db");

const getAllReview = async (req, res) => {
  try {
    let allReview = await Review.findAll();

    if (allReview.length > 0) {
      res.status(200).json({
        data: allReview,
        type: "todos los review",
      });
    } else {
      res.status(200).json({
        msg: "no existen review actualmente",
      });
    }
  } catch (err) {
    console.log("error al obtener todos los review", err);
  }
};

module.exports = {
  getAllReview,
};

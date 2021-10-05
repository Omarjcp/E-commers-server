const jwt = require("jsonwebtoken");

const { Review, User } = require("../../db");

const getReviewForUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    let reviewOfUser = await Review.findAll({
      where: { userId: userId },
      include: [{ model: User }],
    });

    res.status(200).json({
      data: reviewOfUser,
      type: "review de usuario segun id",
    });
  } catch (err) {
    console.log("error al obtener los review de un usuario", err);
  }
};

module.exports = {
  getReviewForUserId,
};

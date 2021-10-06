const jwt = require("jsonwebtoken");
const { User } = require("../../db");

const resetPassword = async (req, res) => {
  try {
    const { email, password, rePassword } = req.body;
    const userid = req.headers["userid"];

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado reset password",
        });
      } else {
        if (userid && password === rePassword) {
          let passwordModified = await User.update(
            {
              password: password,
            },
            { where: { id: userid, email: email } }
          );
          if (passwordModified[0] > 0) {
            res.status(200).json({
              msg: "contraseña del usuario modificada correctamente",
            });
          } else {
            res.status(404).json({
              msg: "contraseña del usuario no fue modificada",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al modificar contraseña de un usuario", err);
  }
};

module.exports = {
  resetPassword,
};

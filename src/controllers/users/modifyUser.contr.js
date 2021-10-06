const jwt = require("jsonwebtoken");
const { User } = require("../../db");

const modifyUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userid = req.headers["userid"];

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado modify user",
        });
      } else {
        if (userid) {
          let userModified = await User.update(
            {
              firstName: firstName,
              lastName: lastName,
              email: email,
            },
            { where: { id: userid } }
          );
          if (userModified[0] > 0) {
            res.status(200).json({
              msg: "datos de usuario modificado correctamente",
            });
          } else {
            res.status(404).json({
              msg: "los datos del usuario no fueron modificados",
            });
          }
        }
      }
    });
  } catch (err) {
    console.log("error al modificar datos de un usuario", err);
  }
};

module.exports = {
  modifyUser,
};

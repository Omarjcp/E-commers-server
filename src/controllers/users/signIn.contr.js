const jwt = require("jsonwebtoken");
const { User } = require("../../db");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      let user = await User.findOne({
        where: { email: email, password: password },
      });
      if (user) {
        let token = jwt.sign({ password }, "secretKey");
        res.status(200).json({
          token: token,
          isAdmin: user.isAdmin,
          msg: `Bienvenido ${user.firstName}. Sesión iniciada correctamente`,
          user: user,
        });
      } else {
        res.status(404).json({
          msg: "Usuario no valido",
        });
      }
    }
  } catch (err) {
    console.log("error al intentar iniciar sesión", err);
  }
};

module.exports = {
  signIn,
};

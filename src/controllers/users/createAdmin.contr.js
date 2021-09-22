const jwt = require("jsonwebtoken");
const { User } = require("../../db");

const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        let admin = await User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          isAdmin: true,
        });

        if (admin) {
          res.status(201).json({
            msg: "Administrador creado correctamente",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al crear administrador", err);
  }
};

module.exports = {
  createAdmin,
};

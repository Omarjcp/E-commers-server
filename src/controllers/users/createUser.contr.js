const { User } = require("../../db");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user = await User.create({
      firstName,
      lastName,
      email,
      password,
      isAdmin: false,
    });

    if (user) {
      res.status(201).json({
        msg: "usuario creado correctamente",
      });
    }
  } catch (err) {
    console.log("error al crear usuario", err);
  }
};

module.exports = {
  createUser,
};

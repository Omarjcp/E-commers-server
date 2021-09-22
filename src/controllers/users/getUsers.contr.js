const jwt = require("jsonwebtoken");
const { getAllUsersDb, getUserIdDb } = require("../utils/getDataDb");

const getUsers = async (req, res) => {
  try {
    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        let usersDb = await getAllUsersDb();

        if (usersDb) {
          res.status(200).json({
            type: "Todos los usuarios resgistrados",
            data: usersDb,
          });
        } else {
          res.status(404).json({
            msg: "no existen usuarios registrados en la base de datos",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al obtener todos los usuarios", err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    let userDb = await getUserIdDb(id);

    if (userDb) {
      res.status(201).json({
        type: "usuario segun id",
        data: userDb,
      });
    } else {
      res.status(404).json({
        msg: "no existen usuario registrado con ese id en la base de datos",
      });
    }
  } catch (error) {
    console.log("error al obtener usuario por id", err);
  }
};

module.exports = {
  getUsers,
  getUserById,
};

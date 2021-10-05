const midDelToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const isAdmi = req.headers["isadmi"];
  if (typeof bearerHeader !== "undefined" && isAdmi === "false") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({
      msg: "acceso denegado",
    });
  }
};

module.exports = midDelToken;

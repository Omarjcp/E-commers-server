const midDelToken = (req, res, next) => {
  console.log(req);
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
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

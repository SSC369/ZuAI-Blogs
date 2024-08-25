const jwt = require("jsonwebtoken");
const secretKey = "SSC";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(404).json({
      status: false,
      msg: "Login to access features :)",
    });
  }
  try {
    const data = jwt.verify(token, secretKey);
    req.user = data;
    next();
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Server issue :(",
    });
  }
};

module.exports = authMiddleware;

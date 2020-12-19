const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const { AUTHORIZATION_MSG, ADMIN_AUTH_MSG } = require("../Shared/constants");

exports.loginCheck = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: AUTHORIZATION_MSG });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: ADMIN_AUTH_MSG });
  }
  next();
};

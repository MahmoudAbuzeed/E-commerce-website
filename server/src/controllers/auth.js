const AuthService = require("../services/auth");
const { INVALID_MSG } = require("../Shared/constants");
const authservice = new AuthService();
exports.userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const userSignup = await authservice.usersSignup(name, email, password);
  if (userSignup.error) {
    return res.status(400).json(userSignup.error);
  } else {
    return res.status(201).json({ user: userSignup });
  }
};

exports.adminSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const adminSignup = await authservice.adminSignup(name, email, password);
  if (adminSignup.error) {
    return res.status(400).json(adminSignup.error);
  } else {
    return res.status(201).json({ user: adminSignup });
  }
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  const userSignin = await authservice.signin(email, password);
  if (userSignin) {
    return res.status(201).json({ user: userSignin });
  } else {
    return res.status(400).json({ error: INVALID_MSG });
  }
};

exports.allUser = async (req, res) => {
  const getAllUsers = await authservice.allUser();
  return res.status(200).json({ users: getAllUsers });
};

const userModel = require("../models/users");

const AuthService = require("../services/auth");

const AuthController = new AuthService();
exports.userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const userSignup = await AuthController.usersSignup(name, email, password);
  return res.status(201).json({ user: userSignup });
};

exports.adminSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const adminSignup = await AuthController.adminSignup(name, email, password);
  return res.status(201).json({ user: adminSignup });
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  const userSignin = await AuthController.signin(email, password);
  return res.status(201).json({ user: userSignin });
};

exports.allUser = async (req, res) => {
  try {
    let allUser = await userModel.find({});
    res.json({ users: allUser });
  } catch {
    res.status(404);
  }
};

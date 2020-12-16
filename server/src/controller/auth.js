const userModel = require("../models/users");

const { signupController, signinController } = require("../services/auth");

exports.userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const userSignup = await signupController.userSignup(name, email, password);
  return res.status(201).json({ user: userSignup });
};

exports.adminSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const adminSignup = await signupController.adminSignup(name, email, password);
  return res.status(201).json({ user: adminSignup });
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  const userSignin = await signinController.signin(email, password);
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

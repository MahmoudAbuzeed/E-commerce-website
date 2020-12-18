const userModel = require("../models/users");
const AuthService = require("../services/auth");

const AuthController = new AuthService();
exports.userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const data = await userModel.findOne({ email: email });
  if (data) {
    return res.status(400).json({ error: "Email already exists" });
  } else {
    const userSignup = await AuthController.usersSignup(name, email, password);
    return res.status(201).json({ user: userSignup });
  }
};

exports.adminSignup = async (req, res) => {
  let { name, email, password } = req.body;
  const data = await userModel.findOne({ email: email });
  if (data) {
    return res.status(400).json({ error: "Email already exists" });
  } else {
    const adminSignup = await AuthController.adminSignup(name, email, password);
    return res.status(201).json({ user: adminSignup });
  }
};

exports.signin = async (req, res) => {
  let { email, password } = req.body;
  const data = await userModel.findOne({ email: email });
  if (!data) {
    return res.status(400).json({ error: "Email Not Found" });
  } else {
    const userSignin = await AuthController.signin(email, password);
    if (userSignin) {
      return res.status(201).json({ user: userSignin });
    } else {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  }
};

exports.allUser = async (req, res) => {
  try {
    let allUser = await userModel.find({});
    res.json({ users: allUser });
  } catch {
    res.status(404);
  }
};

const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class AuthService {
  async allUser() {
    let allUser = await userModel.find({});
    return allUser;
  }
  async usersSignup(name, email, password) {
    password = bcrypt.hashSync(password);
    try {
      let newUser = new userModel({
        name,
        email,
        password,
      });
      newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async adminSignup(name, email, password) {
    password = bcrypt.hashSync(password);
    try {
      let newUser = new userModel({
        name,
        email,
        password,
        userRole: "admin",
      });
      newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async signin(email, password) {
    try {
      const data = await userModel.findOne({ email: email });
      const login = await bcrypt.compare(password, data.password);
      if (login) {
        const token = jwt.sign(
          { _id: data._id, role: data.userRole },
          JWT_SECRET
        );
        const encode = jwt.verify(token, JWT_SECRET);
        return {
          token: token,
          user: encode,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AuthService;

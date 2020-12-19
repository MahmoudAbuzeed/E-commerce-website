const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const { EMAIL_EXISTS_MSG } = require("../Shared/constants");

class AuthService {
  async allUser() {
    let allUser = await userModel.find({});
    return allUser;
  }
  async usersSignup(name, email, password) {
    const data = await userModel.findOne({ email: email });
    if (data) {
      return { error: EMAIL_EXISTS_MSG };
    } else {
      password = bcrypt.hashSync(password);
      let newUser = new userModel({
        name,
        email,
        password,
      });
      newUser.save();
      return newUser;
    }
  }

  async adminSignup(name, email, password) {
    const data = await userModel.findOne({ email: email });
    if (data) {
      return { error: EMAIL_EXISTS_MSG };
    } else {
      password = bcrypt.hashSync(password);
      let newUser = new userModel({
        name,
        email,
        password,
        userRole: "admin",
      });
      newUser.save();
      return newUser;
    }
  }

  async signin(email, password) {
    const data = await userModel.findOne({ email: email });
    if (data) {
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
    }
  }
}

module.exports = AuthService;

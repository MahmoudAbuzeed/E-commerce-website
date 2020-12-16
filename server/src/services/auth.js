const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Signup {
  async userSignup(name, email, password) {
    try {
      password = bcrypt.hashSync(password);
      const data = await userModel.findOne({ email: email });
      if (data) {
        return "Email already exists";
      } else {
        let newUser = new userModel({
          name,
          email,
          password,
        });
        newUser.save();
        return newUser;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async adminSignup(name, email, password) {
    try {
      password = bcrypt.hashSync(password);
      const data = await userModel.findOne({ email: email });
      if (data) {
        return "Email already exists";
      } else {
        let newUser = new userModel({
          name,
          email,
          password,
          userRole: "admin",
        });
        newUser.save();
        return newUser;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

class Signin {
  async signin(email, password) {
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
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
        } else {
          return { error: "Invalid email or password" };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const signupController = new Signup();
const signinController = new Signin();
module.exports = { signupController, signinController };

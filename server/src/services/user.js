const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const { INVALID_MSG, EMAIL_EXISTS_MSG } = require("../Shared/constants");

class UserService {
  async getAllUsers() {
    let Users = await userModel
      .find({})
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    return Users;
  }

  async getSingleUser(uId) {
    let User = await userModel
      .findById(uId)
      .select("name email phoneNumber userImage updatedAt createdAt");
    return User;
  }

  async addUser(name, email, password) {
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

  async editUser(uId, name, phoneNumber) {
    const user = await userModel.findById(uId);
    if (user) {
      user.name = name;
      user.phoneNumber = phoneNumber;
      updatedAt: Date.now();
      let editedUser = await user.save();
      return editedUser;
    }
  }

  async deleteUser(uId) {
    let deletedUser = await userModel.findByIdAndDelete(uId);
    return deletedUser;
  }

  async changeUserPassword(uId, oldPassword, newPassword) {
    const data = await userModel.findOne({ _id: uId });
    if (!data) {
      return {
        error: INVALID_MSG,
      };
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
      if (oldPassCheck) {
        newPassword = bcrypt.hashSync(newPassword, 10);
        const user = await userModel.findById(uId);
        if (user) {
          user.password = newPassword;

          let passChange = await user.save();
          return passChange;
        }
      }
    }
  }
}

module.exports = UserService;

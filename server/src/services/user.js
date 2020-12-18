const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class UserService {
  async getSingleUser(uId) {
    try {
      let User = await userModel
        .findById(uId)
        .select("name email phoneNumber userImage updatedAt createdAt");
      if (User) {
        return User;
      }
    } catch (err) {
      console.log(err);
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
    try {
      let deletedUser = await userModel.findByIdAndDelete(uId);
      if (deletedUser) {
        return deletedUser;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async changeUserPassword(uId, oldPassword, newPassword) {
    const data = await userModel.findOne({ _id: uId });
    if (!data) {
      return {
        error: "Invalid user",
      };
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
      if (oldPassCheck) {
        newPassword = bcrypt.hashSync(newPassword, 10);
        let passChange = userModel.findOneAndUpdate(uId, {
          password: newPassword,
        });
        if (passChange) {
          return passChange;
        }
      }
    }
  }
}

module.exports = UserService;

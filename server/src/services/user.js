const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

class GetSingleUser {
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
}

class AddUser {
  async addUser(allProduct, user, amount, transactionId, address, phone) {
    try {
      let newUser = new userModel({
        allProduct,
        user,
        amount,
        transactionId,
        address,
        phone,
      });
      let save = await newUser.save();
      if (save) {
        return save;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

class EditUser {
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
}

class DeleteUser {
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
}

class ChangeUserPassword {
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

const getSingleUserController = new GetSingleUser();
const addUserController = new AddUser();
const editUserController = new EditUser();
const deleteUserController = new DeleteUser();
const changeUserPasswordController = new ChangeUserPassword();

module.exports = {
  getSingleUserController,
  addUserController,
  editUserController,
  deleteUserController,
  changeUserPasswordController,
};

const userModel = require("../models/users");

const UserService = require("../services/user");
const userController = new UserService();

exports.getAllUser = async (req, res) => {
  try {
    let Users = await userModel
      .find({})
      .populate("allProduct.id", "pName pImages pPrice")
      .populate("user", "name email")
      .sort({ _id: -1 });
    if (Users) {
      return res.json({ Users });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleUser = async (req, res) => {
  let { uId } = req.body;
  const singleUser = await userController.getSingleUser(uId);
  if (singleUser) {
    return res.status(201).json({ singleUser: singleUser });
  } else {
    return res.status(400).json({ message: "Can not find user" });
  }
};

exports.editUser = async (req, res) => {
  let { uId, name, phoneNumber } = req.body;
  const editedUser = await userController.editUser(uId, name, phoneNumber);
  if (editedUser) {
    return res.status(201).json({ editedUser: editedUser });
  } else {
    return res.status(400).json({ message: "Can not edit user" });
  }
};

exports.deleteUser = async (req, res) => {
  let { uId } = req.body;
  await userController.deleteUser(uId);
  return res.status(201).json({ message: "User Deleted" });
};

exports.changeUserPassword = async (req, res) => {
  let { uId, oldPassword, newPassword } = req.body;
  const changedPassword = await userController.changeUserPassword(
    uId,
    oldPassword,
    newPassword
  );
  if (changedPassword) {
    return res.status(201).json({ changedPassword: changedPassword });
  } else {
    return res.status(400).json({ message: "Your old password is wrong!!" });
  }
};

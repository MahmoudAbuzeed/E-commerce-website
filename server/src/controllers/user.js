const userModel = require("../models/users");

const {
  getSingleUserController,
  addUserController,
  editUserController,
  deleteUserController,
  changeUserPasswordController,
} = require("../services/user");

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
  const singleUser = await getSingleUserController.getSingleUser(uId);
  if (singleUser) {
    return res.status(201).json({ singleUser: singleUser });
  } else {
    return res.status(400).json({ message: "Can not find user" });
  }
};

// exports.addUser = async (req, res) => {
//   let { allProduct, user, amount, transactionId, address, phone } = req.body;
//   const User = await addUserController.addUser(
//     allProduct,
//     user,
//     amount,
//     transactionId,
//     address,
//     phone
//   );
//   if (User) {
//     return res.status(201).json({ User: User });
//   } else {
//     return res.status(400).json({ message: "Can not add user" });
//   }
// };

exports.editUser = async (req, res) => {
  let { uId, name, phoneNumber } = req.body;
  const editedUser = await editUserController.editUser(uId, name, phoneNumber);
  if (editedUser) {
    return res.status(201).json({ editedUser: editedUser });
  } else {
    return res.status(400).json({ message: "Can not edit user" });
  }
};

exports.deleteUser = async (req, res) => {
  let { uId } = req.body;
  const deletedUser = await deleteUserController.deleteUser(uId);
  return res.status(201).json({ message: "User Deleted" });
};

exports.changeUserPassword = async (req, res) => {
  let { uId, oldPassword, newPassword } = req.body;
  const changedPassword = await changeUserPasswordController.changeUserPassword(
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

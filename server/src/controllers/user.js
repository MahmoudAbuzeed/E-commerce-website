const UserService = require("../services/user");
const {
  FAILURE_OLD_PASSWORD_MSG,
  FAILURE_UPDATING_MSG,
  REMOVED_SUCCESS_MSG,
  NOT_FOUND_MSG,
} = require("../Shared/constants");
const userService = new UserService();

exports.getAllUser = async (req, res) => {
  const Users = await userService.getAllUsers();
  if (Users) {
    return res.status(200).json({ Users: Users });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.getSingleUser = async (req, res) => {
  let { uId } = req.body;
  const singleUser = await userService.getSingleUser(uId);
  if (singleUser) {
    return res.status(200).json({ singleUser: singleUser });
  } else {
    return res.status(400).json({ message: NOT_FOUND_MSG });
  }
};

exports.editUser = async (req, res) => {
  let { uId, name, phoneNumber } = req.body;
  const editedUser = await userService.editUser(uId, name, phoneNumber);
  if (editedUser) {
    return res.status(201).json({ editedUser: editedUser });
  } else {
    return res.status(400).json({ message: FAILURE_UPDATING_MSG });
  }
};

exports.deleteUser = async (req, res) => {
  let { uId } = req.body;
  await userService.deleteUser(uId);
  return res.status(201).json({ message: REMOVED_SUCCESS_MSG });
};

exports.changeUserPassword = async (req, res) => {
  let { uId, oldPassword, newPassword } = req.body;
  const changedPassword = await userService.changeUserPassword(
    uId,
    oldPassword,
    newPassword
  );
  if (changedPassword) {
    return res.status(201).json({ changedPassword: changedPassword });
  } else {
    return res.status(400).json({ message: FAILURE_OLD_PASSWORD_MSG });
  }
};

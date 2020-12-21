const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getSingleUser,
  editUser,
  deleteUser,
  changeUserPassword,
  addUser,
} = require("../controllers/user");
const { loginCheck } = require("../middleware/auth");

const {
  validateChangeUserPasswordRequest,
  validateDeleteUserRequest,
  validateEditUserRequest,
  validateGetSingleUserRequest,
  isRequestValidated,
} = require("../validators/user");

router.get("/all-user", loginCheck, getAllUser);
router.post(
  "/single-user",
  loginCheck,
  validateGetSingleUserRequest,
  isRequestValidated,
  getSingleUser
);

router.post("/add-user", loginCheck, addUser);
router.post(
  "/edit-user",
  loginCheck,
  validateEditUserRequest,
  isRequestValidated,
  editUser
);
router.post(
  "/delete-user",
  loginCheck,
  validateDeleteUserRequest,
  isRequestValidated,
  deleteUser
);

router.post(
  "/change-password",
  loginCheck,
  validateChangeUserPasswordRequest,
  isRequestValidated,
  changeUserPassword
);

module.exports = router;

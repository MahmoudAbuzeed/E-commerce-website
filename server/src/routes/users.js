const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getSingleUser,
  editUser,
  deleteUser,
  changeUserPassword,
} = require("../controllers/user");
const {
  validateChangeUserPasswordRequest,
  validateDeleteUserRequest,
  validateEditUserRequest,
  validateGetSingleUserRequest,
  isRequestValidated,
} = require("../validators/user");

router.get("/all-user", getAllUser);
router.post(
  "/single-user",
  validateGetSingleUserRequest,
  isRequestValidated,
  getSingleUser
);

router.post(
  "/edit-user",
  validateEditUserRequest,
  isRequestValidated,
  editUser
);
router.post(
  "/delete-user",
  validateDeleteUserRequest,
  isRequestValidated,
  deleteUser
);

router.post(
  "/change-password",
  validateChangeUserPasswordRequest,
  isRequestValidated,
  changeUserPassword
);

module.exports = router;

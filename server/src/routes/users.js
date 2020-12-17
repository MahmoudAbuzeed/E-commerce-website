const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getSingleUser,
  //addUser,
  editUser,
  deleteUser,
  changeUserPassword,
} = require("../controllers/user");

router.get("/all-user", getAllUser);
router.post("/single-user", getSingleUser);

// router.post("/add-user", addUser);
router.post("/edit-user", editUser);
router.post("/delete-user", deleteUser);

router.post("/change-password", changeUserPassword);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  userSignup,
  adminSignup,
  signin,
  allUser,
} = require("../controller/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth");
const { loginCheck, adminMiddleware } = require("../middleware/auth");

router.post("/signup", validateSignupRequest, isRequestValidated, userSignup);
router.post(
  "/admin/signup",
  validateSignupRequest,
  isRequestValidated,
  adminSignup
);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/user", loginCheck, adminMiddleware, allUser);

module.exports = router;

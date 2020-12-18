const { check, validationResult } = require("express-validator");

exports.validateEditUserRequest = [
  check("uId").notEmpty().withMessage("User Id is required"),
  check("name").notEmpty().withMessage("name is required"),
  check("phoneNumber").notEmpty().withMessage("phoneNumber is required"),
];
exports.validateChangeUserPasswordRequest = [
  check("uId").notEmpty().withMessage("User Id  is required"),
  check("oldPassword").notEmpty().withMessage("oldPassword is required"),
  check("newPassword").notEmpty().withMessage("newPassword is required"),
];

exports.validateGetSingleUserRequest = [
  check("uId").notEmpty().withMessage("User Id  is required"),
];
exports.validateDeleteUserRequest = [
  check("uId").notEmpty().withMessage("User Id  is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

const { check, validationResult } = require("express-validator");

exports.validateGetOrderByUserRequest = [
  check("uId").notEmpty().withMessage("User Id is required"),
];

exports.validateCreateOrderRequest = [
  check("allProduct").notEmpty().withMessage("Products is required"),
  check("user").notEmpty().withMessage("user is required"),
  check("amount").notEmpty().withMessage("amount is required"),
  check("transactionId").notEmpty().withMessage("transactionId is required"),
  check("address").notEmpty().withMessage("address is required"),
  check("phone").notEmpty().withMessage("phone is required"),
];

exports.validateUpdateOrderRequest = [
  check("oId").notEmpty().withMessage("Order Id is required"),
  check("status").notEmpty().withMessage("status is required"),
];
exports.validateDeleteOrderRequest = [
  check("oId").notEmpty().withMessage("Order Id is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

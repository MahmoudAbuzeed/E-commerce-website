const { check, validationResult } = require("express-validator");

exports.validateAddCategoryRequest = [
  check("cName").notEmpty().withMessage("Category Name is required"),
  check("cDescription")
    .notEmpty()
    .withMessage("Category Description is required"),
  check("cStatus").notEmpty().withMessage("Category Status is required"),
  check("cImage").notEmpty().withMessage("Category Image is required"),
];

exports.validateEditCategoryRequest = [
  check("cId").notEmpty().withMessage("Category Id is required"),
  check("cName").notEmpty().withMessage("Category Name is required"),
  check("cDescription")
    .notEmpty()
    .withMessage("Category Description is required"),
  check("cStatus").notEmpty().withMessage("Category Stetus is required"),
];

exports.validateDeleteCategoryRequest = [
  check("cId").notEmpty().withMessage("Category Id is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

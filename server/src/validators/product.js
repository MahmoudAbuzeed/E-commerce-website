const { check, validationResult } = require("express-validator");

exports.validateAddProductRequest = [
  check("pName").notEmpty().withMessage("Product Name is required"),
  check("pDescription")
    .notEmpty()
    .withMessage("Product Description is required"),
  check("pStatus").notEmpty().withMessage("Product Status is required"),
  check("pPrice").notEmpty().withMessage("Product Price is required"),
  check("pQuantity").notEmpty().withMessage("Product Quantity is required"),
  check("pCategory").notEmpty().withMessage("Product Category is required"),
  check("pOffer").notEmpty().withMessage("Product Offer is required"),
  check("images").notEmpty().withMessage("Product images is required"),
];

exports.validateEditProductRequest = [
  check("pId").notEmpty().withMessage("Product Id is required"),
  check("pName").notEmpty().withMessage("Product Name is required"),
  check("pDescription")
    .notEmpty()
    .withMessage("Product Description is required"),
  check("pStatus").notEmpty().withMessage("Product Status is required"),
  check("pPrice").notEmpty().withMessage("Product Price is required"),
  check("pQuantity").notEmpty().withMessage("Product Quantity is required"),
  check("pCategory").notEmpty().withMessage("Product Category is required"),
  check("pOffer").notEmpty().withMessage("Product Offer is required"),
];

exports.validateDeleteProductRequest = [
  check("pId").notEmpty().withMessage("Product Id is required"),
];
exports.validateGetProductByCategoryRequest = [
  check("cId").notEmpty().withMessage("Category Id is required"),
];
exports.validateGetProductByPriceRequest = [
  check("price").notEmpty().withMessage("Price is required"),
];
exports.validateGetSingleProductRequest = [
  check("pId").notEmpty().withMessage("Product Id is required"),
];
exports.validateGetWishProductRequest = [
  check("productArray").notEmpty().withMessage("productArray is required"),
];
exports.validateGetCartProductRequest = [
  check("productArray").notEmpty().withMessage("productArray is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};

const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getProductByCategory,
  getProductByPrice,
  getWishProduct,
  getCartProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getSingleProduct,
  //addReview,
  //deleteReview,
} = require("../controllers/product");
const { loginCheck } = require("../middleware/auth");

const {
  isRequestValidated,
  validateEditProductRequest,
  validateDeleteProductRequest,
  validateGetProductByCategoryRequest,
  validateGetProductByPriceRequest,
  validateGetSingleProductRequest,
  validateGetWishProductRequest,
  validateGetCartProductRequest,
  validateAddProductRequest,
} = require("../validators/product");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-product", getAllProduct);

router.post(
  "/product-by-category",
  validateGetProductByCategoryRequest,
  isRequestValidated,
  getProductByCategory
);
router.post(
  "/product-by-price",
  validateGetProductByPriceRequest,
  isRequestValidated,
  getProductByPrice
);
router.post(
  "/wish-product",
  validateGetWishProductRequest,
  isRequestValidated,
  getWishProduct
);
router.post(
  "/cart-product",
  validateGetCartProductRequest,
  isRequestValidated,
  getCartProduct
);

router.post(
  "/add-product",
  loginCheck,
  validateAddProductRequest,
  isRequestValidated,
  upload.any(),
  addProduct
);
router.post(
  "/edit-product",
  loginCheck,
  validateEditProductRequest,
  isRequestValidated,
  editProduct
);
router.post(
  "/delete-product",
  loginCheck,
  validateDeleteProductRequest,
  isRequestValidated,
  deleteProduct
);
router.post(
  "/single-product",
  validateGetSingleProductRequest,
  isRequestValidated,
  getSingleProduct
);

// router.post("/add-review", addReview);
// router.post("/delete-review", deleteReview);

module.exports = router;

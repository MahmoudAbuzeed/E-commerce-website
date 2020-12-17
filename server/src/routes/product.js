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
  addReview,
  deleteReview,
} = require("../controllers/product");
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
router.post("/product-by-category", getProductByCategory);
router.post("/product-by-price", getProductByPrice);
router.post("/wish-product", getWishProduct);
router.post("/cart-product", getCartProduct);

router.post("/add-product", upload.any(), addProduct);
router.post("/edit-product", editProduct);
router.post("/delete-product", deleteProduct);
router.post("/single-product", getSingleProduct);

// router.post("/add-review", addReview);
// router.post("/delete-review", deleteReview);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controller/category");
const multer = require("multer");
const { loginCheck } = require("../middleware/auth");
const {
  validateAddCategoryRequest,
  validateDeleteCategoryRequest,
  validateEditCategoryRequest,
  isRequestValidated,
} = require("../validators/category");

// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", getAllCategory);
router.post(
  "/add-category",
  /*validateAddCategoryRequest,*/
  isRequestValidated,
  loginCheck,
  upload.single("cImage"),
  addCategory
);
router.post(
  "/edit-category",
  validateEditCategoryRequest,
  isRequestValidated,
  loginCheck,
  editCategory
);
router.post(
  "/delete-category",
  validateDeleteCategoryRequest,
  isRequestValidated,
  loginCheck,
  deleteCategory
);

module.exports = router;

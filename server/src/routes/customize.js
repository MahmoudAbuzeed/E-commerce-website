const express = require("express");
const router = express.Router();
const {
  getImages,
  deleteSlideImage,
  uploadSlideImage,
  getAllData,
} = require("../controllers/customize");
const { loginCheck } = require("../middleware/auth");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/customize");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", loginCheck, getImages);
router.post("/delete-slide-image", loginCheck, deleteSlideImage);
router.post(
  "/upload-slide-image",
  loginCheck,
  upload.single("image"),
  uploadSlideImage
);
router.post("/dashboard-data", loginCheck, getAllData);

module.exports = router;

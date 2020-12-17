const customizeModel = require("../models/customize");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");

const {
  uploadSideImageController,
  deleteSideImageController,
} = require("../services/customize");

exports.getImages = async (req, res) => {
  try {
    let Images = await customizeModel.find({});
    if (Images) {
      return res.json({ Images });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.uploadSlideImage = async (req, res) => {
  let image = req.file.filename;
  const ImageUploaded = await uploadSideImageController.uploadSlideImage(image);
  if (ImageUploaded) {
    return res.status(201).json({ ImageUploaded: ImageUploaded });
  } else {
    return res.status(400).json({ message: "Image Not Uploaded" });
  }
};

exports.deleteSlideImage = async (req, res) => {
  let { id } = req.body;
  const ImageDeleted = await deleteSideImageController.deleteSlideImage(id);
  return res.status(201).json({ message: "Image Deleted" });
};

exports.getAllData = async (req, res) => {
  try {
    let Categories = await categoryModel.find({}).count();
    let Products = await productModel.find({}).count();
    let Orders = await orderModel.find({}).count();
    let Users = await userModel.find({}).count();
    if (Categories && Products && Orders) {
      return res.json({ Categories, Products, Orders, Users });
    }
  } catch (err) {
    console.log(err);
  }
};

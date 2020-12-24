const fs = require("fs");
const customizeModel = require("../models/customize");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");

class CustomizeSlideBarService {
  async getImages() {
    let Images = await customizeModel.find({});
    return Images;
  }

  async getAllData() {
    let Categories = await categoryModel.find({}).count();
    let Products = await productModel.find({}).count();
    let Orders = await orderModel.find({}).count();
    let Users = await userModel.find({}).count();
    return { Categories, Products, Orders, Users };
  }
  async uploadSlideImage(image) {
    let newCustomzie = new customizeModel({
      slideImage: image,
    });
    let save = await newCustomzie.save();
    if (save) {
      return save;
    }
  }

  async deleteSlideImage(id) {
    let deletedSlideImage = await customizeModel.findById(id);
    const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`;
    let deletedImage = await customizeModel.findByIdAndDelete(id);
    if (deletedImage) {
      // Delete Image from tem folder
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    return deletedImage;
  }
}

module.exports = CustomizeSlideBarService;

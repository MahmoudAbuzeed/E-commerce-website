const fs = require("fs");
const customizeModel = require("../models/customize");

class UploadSlideImage {
  async uploadSlideImage(image) {
    try {
      let newCustomzie = new customizeModel({
        slideImage: image,
      });
      let save = await newCustomzie.save();
      if (save) {
        return save;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

class DeleteSlideImage {
  async deleteSlideImage(id) {
    try {
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
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const uploadSideImageController = new UploadSlideImage();
const deleteSideImageController = new DeleteSlideImage();

module.exports = {
  uploadSideImageController,
  deleteSideImageController,
};

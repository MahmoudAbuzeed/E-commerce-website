const categoryModel = require("../models/categories");
const fs = require("fs");
const { NOT_FOUND_MSG } = require("../Shared/constants");

class CategoryService {
  async getAllCategory() {
    let Categories = await categoryModel.find({}).sort({ _id: -1 });
    return Categories;
  }

  async addCategory(cName, cDescription, cStatus, cImage) {
    const filePath = `../server/public/uploads/categories/${cImage}`;
    let checkCategoryExists = await categoryModel.findOne({ cName: cName });
    if (checkCategoryExists) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      let newCategory = new categoryModel({
        cName,
        cDescription,
        cStatus,
        cImage,
      });
      await newCategory.save();
      return newCategory;
    }
  }

  async editCategory(cId, cName, cDescription, cStatus) {
    const category = await categoryModel.findById(cId);
    if (category) {
      category.cName = cName;
      category.cDescription = cDescription;
      category.cStatus = cStatus;
      updatedAt: Date.now();
      let editedCategory = await category.save();
      return editedCategory;
    }
  }

  async deleteCategory(cId) {
    let deletedCategoryFile = await categoryModel.findById(cId);
    const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`;
    let deletedCategory = await categoryModel.findByIdAndDelete(cId);
    if (deletedCategory) {
      // Delete Image from tem folder
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      return { error: NOT_FOUND_MSG };
    }
  }
}

module.exports = CategoryService;

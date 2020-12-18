const categoryModel = require("../models/categories");
const fs = require("fs");

class CategoryService {
  async addCategory(cName, cDescription, cStatus, cImage) {
    const filePath = `../server/public/uploads/categories/${cImage}`;

    try {
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
    } catch (err) {
      console.log(err);
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
    try {
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
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = CategoryService;

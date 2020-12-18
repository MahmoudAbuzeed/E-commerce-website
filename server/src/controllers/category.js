const categoryModel = require("../models/categories");

const CategoryService = require("../services/category");

const categoryController = new CategoryService();

exports.getAllCategory = async (req, res) => {
  try {
    let Categories = await categoryModel.find({}).sort({ _id: -1 });
    if (Categories) {
      return res.json({ Categories });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addCategory = async (req, res) => {
  let { cName, cDescription, cStatus } = req.body;
  let cImage = req.file.filename;
  const addedCategory = await categoryController.addCategory(
    cName,
    cDescription,
    cStatus,
    cImage
  );
  if (addedCategory) {
    return res.status(201).json({ addedCategory: addedCategory });
  } else {
    return res.status(400).json({ message: "Category already exists." });
  }
};

exports.editCategory = async (req, res) => {
  let { cId, cName, cDescription, cStatus } = req.body;
  const editedCategory = await categoryController.editCategory(
    cId,
    cName,
    cDescription,
    cStatus
  );
  if (editedCategory) {
    return res.status(201).json({ editedCategory: editedCategory });
  } else {
    return res.status(400).json({ message: " Error in Updating Product." });
  }
};

exports.deleteCategory = async (req, res) => {
  let { cId } = req.body;
  await categoryController.deleteCategory(cId);
  return res.status(201).json({ message: "Category Deleted" });
};

const CategoryService = require("../services/category");
const {
  EXISTS_MSG,
  FAILURE_UPDATING_MSG,
  REMOVED_SUCCESS_MSG,
} = require("../Shared/constants");

const categoryService = new CategoryService();

exports.getAllCategory = async (req, res) => {
  const Categories = await categoryService.getAllCategory();
  return res.status(200).json({ AllCategories: Categories });
};

exports.addCategory = async (req, res) => {
  let { cName, cDescription, cStatus, cImage } = req.body;
  //let cImage = req.file.filename;
  const addedCategory = await categoryService.addCategory(
    cName,
    cDescription,
    cStatus,
    cImage
  );
  if (addedCategory) {
    return res.status(201).json({ addedCategory: addedCategory });
  } else {
    return res.status(400).json({ message: EXISTS_MSG });
  }
};

exports.editCategory = async (req, res) => {
  let { cId, cName, cDescription, cStatus } = req.body;
  const editedCategory = await categoryService.editCategory(
    cId,
    cName,
    cDescription,
    cStatus
  );
  if (editedCategory) {
    return res.status(201).json({ editedCategory: editedCategory });
  } else {
    return res.status(400).json({ message: FAILURE_UPDATING_MSG });
  }
};

exports.deleteCategory = async (req, res) => {
  let { cId } = req.body;
  await categoryService.deleteCategory(cId);
  return res.status(201).json({ message: REMOVED_SUCCESS_MSG });
};

const CustomizeSlideBarService = require("../services/customize");
const {
  FAILURE_UPLOADING_MSG,
  REMOVED_SUCCESS_MSG,
} = require("../Shared/constants");
const customizeService = new CustomizeSlideBarService();

exports.getImages = async (req, res) => {
  const Images = await customizeService.getImages();
  return res.status(200).json({ Images: Images });
};

exports.uploadSlideImage = async (req, res) => {
  let image = req.file.filename;
  const ImageUploaded = await customizeService.uploadSlideImage(image);
  if (ImageUploaded) {
    return res.status(201).json({ ImageUploaded: ImageUploaded });
  } else {
    return res.status(400).json({ message: FAILURE_UPLOADING_MSG });
  }
};

exports.deleteSlideImage = async (req, res) => {
  let { id } = req.body;
  await customizeService.deleteSlideImage(id);
  return res.status(201).json({ message: REMOVED_SUCCESS_MSG });
};

exports.getAllData = async (req, res) => {
  const AllData = await customizeService.getAllData();
  return res.status(200).json({ AllData: AllData });
};

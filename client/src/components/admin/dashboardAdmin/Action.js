import {
  DashboardData,
  postDeleteImage,
  postUploadImage,
  getSliderImages,
} from "./FetchApi";

export const GetAllData = async (dispatch) => {
  let responseData = await DashboardData();
  if (responseData) {
    dispatch({ type: "totalData", payload: responseData });
  }
};

export const sliderImages = async (dispatch) => {
  try {
    let responseData = await getSliderImages();
    if (responseData && responseData.Images) {
      dispatch({ type: "sliderImages", payload: responseData.Images });
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (image, dispatch) => {
  dispatch({ type: "imageUpload", payload: true });
  let formData = new FormData();
  formData.append("image", image);
  console.log(formData.get("image"));
  try {
    let responseData = await postUploadImage(formData);
    if (responseData && responseData.success) {
      setTimeout(function () {
        dispatch({ type: "imageUpload", payload: false });
        sliderImages(dispatch);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (id, dispatch) => {
  dispatch({ type: "imageUpload", payload: true });
  try {
    let responseData = await postDeleteImage();
    if (responseData && responseData.success) {
      setTimeout(function () {
        dispatch({ type: "imageUpload", payload: false });
        sliderImages(dispatch);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";
import { dashboardConstants } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

export const DashboardData = async () => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/dashboard-data`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllDashboardData = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstants.GET_ALL_DATA_REQUEST });
    let res = await axios.post(`${apiURL}/api/customize/dashboard-data`);
    console.log("HERRRRREEee", res);

    // if (res.status === 200) {
    //   console.log("HIIIIIIIIIIIIII", res.data);
    //   dispatch({
    //     type: dashboardConstants.GET_ALL_DATA_SUCCESS,
    //     payload: res.data,
    //   });
    // } else {
    //   dispatch({
    //     type: dashboardConstants.GET_ALL_DATA_FAILURE,
    //     payload: "error",
    //   });
    // }
  };
};

const getSliderImages = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/customize/get-slide-image`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const sliderImages = () => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstants.GET_ALL_IMAGES_REQUEST });
    let responseData = await getSliderImages();
    if (responseData && responseData.Images) {
      dispatch({
        type: dashboardConstants.GET_ALL_IMAGES_SUCCESS,
        payload: responseData.Images,
      });
    } else {
      dispatch({
        type: dashboardConstants.GET_ALL_IMAGES_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

const postUploadImage = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/upload-slide-image`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const uploadImage = (image) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstants.ADD_NEW_IMAGE_REQUEST });
    let formData = new FormData();
    formData.append("image", image);
    let responseData = await postUploadImage(formData);
    if (responseData && responseData.success) {
      dispatch({
        type: dashboardConstants.ADD_NEW_IMAGE_SUCCESS,
        payload: true,
      });
      sliderImages();
    } else {
      dispatch({
        type: dashboardConstants.ADD_NEW_IMAGE_FAILURE,
        payload: false,
      });
    }
  };
};

const postDeleteImage = async (id) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/delete-slide-image`, { id });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteImage = (id) => {
  return async (dispatch) => {
    dispatch({ type: dashboardConstants.DELETE_IMAGE_REQUEST });
    let responseData = await postDeleteImage(id);
    if (responseData && responseData.success) {
      dispatch({ type: dashboardConstants.DELETE_IMAGE_SUCCESS, payload: true });
    } else {
      dispatch({
        type: dashboardConstants.DELETE_IMAGE_FAILURE,
        payload: false,
      });
    }
  };
};

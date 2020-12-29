import axios from "axios";
import { categoryConstants } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () => (localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")).token : false);
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const AllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    let responseData = await AllCategory();
    if (responseData && responseData.AllCategories) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: responseData.AllCategories,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

export const saveCategory = (category) => {
  let formData = new FormData();
  formData.append("cName", category.cName);
  formData.append("cImage", category.cImage);
  formData.append("cDescription", category.cDescription);
  formData.append("cStatus", category.cStatus);

  if (!category._id) {
    return async (dispatch) => {
      dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
      try {
        let res = await axios.post(`${apiURL}/api/category/add-category`, formData);
        if (res.status === 201) {
          dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
            payload: { category: res.data.category },
          });
        } else {
          dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: res.data.error,
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };
  } else {
    let data = {
      cId: category._id,
      cName: category.cName,
      cDescription: category.cDescription,
      cStatus: category.cStatus,
    };
    return async (dispatch) => {
      dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
      let res = await axios.post(`${apiURL}/api/category/edit-category`, data);
      if (res.status === 201) {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({
          type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
          payload: { error },
        });
      }
    };
  }
};

export const deleteCategory = (cId) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
    let res = await axios.post(`${apiURL}/api/category/delete-category`, { cId });

    if (res.status === 201) {
      dispatch(getAllCategory());
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstants.DELETE_CATEGORIES_FAILURE,
        payload: { error },
      });
    }
  };
};

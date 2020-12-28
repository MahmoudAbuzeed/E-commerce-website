import axios from "axios";
import { categoryConstants } from "../constants";

const apiURL = process.env.REACT_APP_API_URL

const BearerToken = () => localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")).token : false
const Headers = () => {
    return {
        headers: {
            'token': `Bearer ${BearerToken()}`
        }
    }
}

export const getAllCategory = async () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
        let res = await axios.get(`${apiURL}/api/category/all-category`)
        if (res.status === 200) {
            const { categoryList } = res.data;
            console.log(categoryList)
        
        dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: { categories: categoryList }
          });
        } else {
          dispatch({
            type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            payload: { error: res.data.error },
          });
        }
    }
}

export const createCategory = async ({ cName, cImage, cDescription, cStatus }) => {
    let formData = new FormData();
    formData.append("cImage", cImage)
    formData.append("cName", cName)
    formData.append("cDescription", cDescription)
    formData.append("cStatus", cStatus)

    return async (dispatch) => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        try {
            let res = await axios.post(`${apiURL}/api/category/add-category`, formData, Headers())
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

    
}

export const editCategory = async (cId, des, status) => {
    let data = { cId: cId, cDescription: des, cStatus: status }
    return async (dispatch) => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
        let res = await axios.post(`${apiURL}/api/category/edit-category`, data, Headers())
        if (res.status === 201) {
          dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
          dispatch(getAllCategory());
        } else {
          const { error } = res.data;
          dispatch({
            type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
            payload: { error },
          });
        }
      };
   
}

export const deleteCategory = async (cId) => {

    return async (dispatch) => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
        let res = await axios.post(`${apiURL}/api/category/delete-category`, { cId }, Headers())

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
   
}
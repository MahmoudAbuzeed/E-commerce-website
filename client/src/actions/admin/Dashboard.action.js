import axios from "axios";
import { dashboardConstants } from "../constants";

const apiURL = process.env.REACT_APP_API_URL

export const DashboardData = async () => {

    return async (dispatch) => {
        dispatch({ type: dashboardConstants.GET_ALL_DATA_REQUEST });
        let res = await axios.post(`${apiURL}/api/customize/dashboard-data`)
        if (res.status === 200) {
            const { allData } = res.data;
        
        dispatch({
            type: dashboardConstants.GET_ALL_DATA_SUCCESS,
            payload: { allData: allData },
          });
        } else {
          dispatch({
            type: dashboardConstants.GET_ALL_DATA_FAILURE,
            payload: { error: res.data.error },
          });
        }    }

}

export const sliderImages = async () => {
    return async (dispatch) => {
        dispatch({ type: dashboardConstants.GET_ALL_IMAGES_REQUEST });
    
        let res = await axios.get(`${apiURL}/api/customize/get-slide-image`)
        if (res.status === 200) {
            const { allImages } = res.data;
        
        dispatch({
            type: dashboardConstants.GET_ALL_IMAGES_SUCCESS,
            payload: { allImages: allImages },
          });
        } else {
          dispatch({
            type: dashboardConstants.GET_ALL_IMAGES_FAILURE,
            payload: { error: res.data.error },
          });
        }
    
    }
}

export const uploadImage = async (formData) => {
    return async (dispatch) => {
        dispatch({ type: dashboardConstants.ADD_NEW_IMAGE_REQUEST });
        let res = await axios.post(`${apiURL}/api/customize/upload-slide-image`, formData)
        if (res.status === 201) {
        
        dispatch({
            type: dashboardConstants.ADD_NEW_IMAGE_SUCCESS,
            payload: { image: res.data.image },
        });
        } else {
          dispatch({
            type: dashboardConstants.ADD_NEW_IMAGE_FAILURE,
            payload: { error: res.data.error },
          });
        }
   
    }
}

export const deleteImage = async (id) => {
    return async (dispatch) => {
        dispatch({ type: dashboardConstants.DELETE_IMAGE_REQUEST });
        let res = await axios.post(`${apiURL}/api/customize/delete-slide-image`, {id})
        if (res.status === 201) {
            dispatch({ type: dashboardConstants.DELETE_IMAGE_SUCCESS });
          } else {
            const { error } = res.data;
            dispatch({
              type: dashboardConstants.DELETE_IMAGE_FAILURE,
              payload: { error },
            });
          }
    }
}

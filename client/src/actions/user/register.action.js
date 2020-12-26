import { userConstants } from "../constants";
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    try {
      const { data } = await axios.post(`${apiURL}/api/signup`, {
        ...user,
      });
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { data },
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: userConstants.USER_REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};

import axios from "axios";
import { orderConstants } from "../constants";
const apiURL = process.env.REACT_APP_API_URL;

const AllOrder = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/order/all-orders`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrder = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST });
    let responseData = await AllOrder();
    if (responseData && responseData.AllOrders) {
      dispatch({
        type: orderConstants.GET_ALL_ORDERS_SUCCESS,
        payload: responseData.AllOrders,
      });
    } else {
      dispatch({
        type: orderConstants.GET_ALL_ORDERS_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

export const updateOrder = async (data) => {
  let data2 = { oId: data.oId, status: data.status };
  try {
    let res = await axios.post(`${apiURL}/api/order/update-order`, data2);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const editOrder = (order) => {
  let data = {
    oId: order._id,
    status: order.status,
  };
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_REQUEST });
    try {
      let responseData = await updateOrder(data);
      if (responseData && responseData.updatedOrder) {
        dispatch({
          type: orderConstants.UPDATE_ORDER_SUCCESS,
          payload: responseData.updatedOrder,
        });
      } else {
        dispatch({
          type: orderConstants.UPDATE_ORDER_FAILURE,
          payload: { error: responseData.error },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteOrder = (oId) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.DELETE_ORDER_REQUEST });
    let res = await axios.post(`${apiURL}/api/order/delete-order`, { oId });
    if (res.status === 201) {
      dispatch(getAllOrder());
      dispatch({ type: orderConstants.DELETE_ORDER_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: orderConstants.DELETE_ORDER_FAILURE,
        payload: { error },
      });
    }
  };
};

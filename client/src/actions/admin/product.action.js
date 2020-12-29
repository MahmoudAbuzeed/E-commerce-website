import axios from "axios";
import { productConstants } from "../constants";

const apiURL = process.env.REACT_APP_API_URL;

const AllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProduct = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
    let responseData = await AllProduct();
    if (responseData && responseData.allProducts) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: responseData.allProducts,
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

export const createPorductImage = async ({ pImage }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const saveProduct = async (product) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);

  if (!category._id) {
    return async (dispatch) => {
      dispatch({ type: productConstants.ADD_NEW_PRODUCT_REQUEST });
      try {
        let res = await axios.post(`${apiURL}/api/product/add-product`, formData);
        if (res.status === 201) {
          dispatch({
            type: productConstants.ADD_NEW_PRODUCT_SUCCESS,
            payload: { category: res.data.product },
          });
        } else {
          dispatch({
            type: productConstants.ADD_NEW_PRODUCT_FAILURE,
            payload: res.data.error,
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    };
  } else {
    let data = {
      pId: product.pId,
      pName: product.pName,
      pDescription: product.pDescription,
      pStatus: product.pStatus,
      pCategory: product.pCategory,
      pQuantity: product.pQuantity,
      pPrice: product.pPrice,
      pOffer: product.pOffer,
    };
    return async (dispatch) => {
      dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });
      let res = await axios.post(`${apiURL}/api/category/edit-category`, data);
      if (res.status === 201) {
        dispatch({ type: productConstants.UPDATE_PRODUCT_SUCCESS });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.UPDATE_PRODUCT_FAILURE,
          payload: { error },
        });
      }
    };
  }
};

export const deleteProduct = (pId) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

    let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId });
    if (res.status === 201) {
      dispatch(getAllProduct());
      dispatch({ type: productConstants.DELETE_PRODUCT_SUCCESS });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
};

const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-category`, { catId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCategory = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_CATEGORY_REQUEST });
    let responseData = await productByCategory();
    if (responseData && responseData.productByCategory) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: responseData.productByCategory,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_CATEGORY_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

const productByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-price`, { price });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductByPrice = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_PRICE_REQUEST });
    let responseData = await productByPrice();
    if (responseData && responseData.productByPrice) {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_PRICE_SUCCESS,
        payload: responseData.productByPrice,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCTS_BY_PRICE_FAILURE,
        payload: { error: responseData.error },
      });
    }
  };
};

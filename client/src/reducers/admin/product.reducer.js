import { productConstants } from "../../actions/constants";

const initState = {
  products: [],
  productsById: [],
  productsByCategory: [],
  productsByPrice: [],
  loading: false,
  error: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case productConstants.ADD_NEW_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

    case productConstants.ADD_NEW_PRODUCT_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;

    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.DELETE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case productConstants.DELETE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case productConstants.GET_PRODUCTS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_ID_SUCCESS:
      state = {
        ...state,
        productsById: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_PRICE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case productConstants.GET_PRODUCTS_BY_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      state = {
        ...state,
        productsByCategory: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case productConstants.GET_PRODUCTS_BY_PRICE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_PRICE_SUCCESS:
      state = {
        ...state,
        productsByPrice: action.payload,
        loading: false,
      };
      break;
    case productConstants.GET_PRODUCTS_BY_PRICE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default productReducer;

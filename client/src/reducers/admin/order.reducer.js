import { orderConstants } from "../../actions/constants";

const initState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case orderConstants.UPDATE_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case orderConstants.UPDATE_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.UPDATE_ORDER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case orderConstants.DELETE_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case orderConstants.DELETE_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case orderConstants.DELETE_ORDER_FAILURE:
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

export default orderReducer;

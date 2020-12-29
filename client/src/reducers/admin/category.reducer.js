import { categoryConstants } from "../../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
  addCategoryModal: false,
  editCategoryModal: {
    modal: false,
    cId: null,
    des: "",
    status: "",
  },
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };

    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      break;

    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.DELETE_CATEGORIES_FAILURE:
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

export default categoryReducer;

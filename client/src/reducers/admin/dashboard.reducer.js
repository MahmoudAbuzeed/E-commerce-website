import { dashboardConstants } from "../../actions/constants";

export const initState = {
  totalData: [],
  sliderImages: [],
  loading: false,
  error: null,
  imageUpload: false,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case dashboardConstants.GET_ALL_DATA_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case dashboardConstants.GET_ALL_DATA_SUCCESS:
      state = {
        ...state,
        totalData: action.payload,
      };
      break;

    case dashboardConstants.GET_ALL_DATA_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    case dashboardConstants.ADD_NEW_IMAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case dashboardConstants.ADD_NEW_IMAGE_SUCCESS:
      state = {
        ...state,
        imageUpload: action.payload,
      };
      break;

    case dashboardConstants.ADD_NEW_IMAGE_FAILURE:
      state = {
        ...initState,
        loading: false,
        imageUpload: action.payload,
      };
      break;

    case dashboardConstants.DELETE_IMAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case dashboardConstants.DELETE_IMAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case dashboardConstants.DELETE_IMAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case dashboardConstants.GET_ALL_IMAGES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case dashboardConstants.GET_ALL_IMAGES_SUCCESS:
      state = {
        ...state,
        sliderImages: action.payload,
      };
      break;
    case dashboardConstants.GET_ALL_IMAGES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default dashboardReducer;

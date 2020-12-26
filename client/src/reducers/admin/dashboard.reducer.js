import { dashboardConstants } from "../../actions/constants"

export const initState = {
    totalData: [],
    sliderImages:[],
    loading: false,
    error: null,
    uploadSliderBtn: true,
    imageUpload:false,
}

 const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case dashboardConstants.GET_ALL_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case dashboardConstants.GET_ALL_DATA_SUCCESS:
            return {
                ...state,
                totalData: action.payload
            }
            case dashboardConstants.GET_ALL_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.error,
            }
            case dashboardConstants.ADD_NEW_IMAGE_REQUEST:
                state = {
                    ...state,
                    loading: true,
                };
                break;
            case dashboardConstants.ADD_NEW_IMAGE_SUCCESS:
                return {
                    ...state,
                    sliderImages: action.payload
                };
    
    
            case dashboardConstants.ADD_NEW_IMAGE_FAILURE:
                state = {
                    ...initState,
                    loading: false,
                    error: action.payload.error,
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
                return {
                ...state,
                loading: true,
            }
            case dashboardConstants.GET_ALL_IMAGES_SUCCESS:
                return {
                ...state,
                sliderImages: action.payload
            }
            case dashboardConstants.GET_ALL_IMAGES_FAILURE:
                return {
                ...state,
                error: action.payload.error,
            }

        default:
            return state
    }
}

export default dashboardReducer
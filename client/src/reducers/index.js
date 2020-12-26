import userRegisterReducer from "./user/register.reducer";
import userAuthReducer from "./user/auth.reducer";
import adminCategoryReducer from "./admin/category.reducer";
import adminDashboardReducer from "./admin/dashboard.reducer";



import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: userAuthReducer,

  userRegister: userRegisterReducer,
  category: adminCategoryReducer,
  dashboard: adminDashboardReducer,
});

export default rootReducer;

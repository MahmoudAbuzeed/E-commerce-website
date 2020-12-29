import userRegisterReducer from "./user/register.reducer";
import userAuthReducer from "./user/auth.reducer";
import adminCategoryReducer from "./admin/category.reducer";
import adminProductReducer from "./admin/product.reducer";
import adminDashboardReducer from "./admin/dashboard.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: userAuthReducer,

  userRegister: userRegisterReducer,
  category: adminCategoryReducer,
  product: adminProductReducer,
  dashboard: adminDashboardReducer,
});

export default rootReducer;

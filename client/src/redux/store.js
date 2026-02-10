import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice"
import restaurantReducer from "./features/restaurant/restaurant.slice";
import branchReducer from "./features/branch/branch.slice";
import userReducer from "./features/user/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    branch: branchReducer,
    users: userReducer,
  }
});



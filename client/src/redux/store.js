import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice"
import restaurantReducer from "./features/restaurant/restaurant.slice";
import branchReducer from "./features/branch/branch.slice";
import userReducer from "./features/user/user.slice";
import menuReducer from "./features/menu/menu.slice";
import placeReducer from "./features/place/place.slice";
import orderReducer from "./features/order/order.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    branch: branchReducer,
    users: userReducer,
    menu: menuReducer,
    place: placeReducer,
    order: orderReducer
  }
});



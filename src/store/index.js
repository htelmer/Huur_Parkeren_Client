import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import appStateReducer from "./appState/slice";
import areaReducer from "./rentalAreas/slice";
import filterReducer from "./filters/slice";

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    area: areaReducer,
    filter: filterReducer,
  },
});

export default store;

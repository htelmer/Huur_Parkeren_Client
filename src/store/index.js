import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import appStateReducer from "./appState/slice";
import areaReducer from "./rentalAreas/slice";

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    area: areaReducer,
  },
});

export default store;

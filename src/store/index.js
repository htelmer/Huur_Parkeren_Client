import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import appStateReducer from "./appState/slice";

const store = configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
  },
});

export default store;

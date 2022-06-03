import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    toggleFavorites: (state, action) => {
      const idToAdd = action.payload;
      const newFavs = state.profile.favorites.userFavorites.includes(idToAdd)
        ? state.profile.favorites.userFavorites.filter(
            (areaId) => areaId !== idToAdd
          )
        : [...state.profile.favorites.userFavorites, idToAdd];
      state.user.profile.favorites.userFavorites = newFavs;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  auctionPostedSuccess,
  toggleFavorites,
} = userSlice.actions;

export default userSlice.reducer;

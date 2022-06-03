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
      console.log("id", idToAdd.areaId);
      // console.log("state", state.profile?.favorites);
      const newFavs = state.profile?.favorites?.includes(idToAdd)
        ? state.profile.favorites.filter((areaId) => areaId !== idToAdd)
        : [...state.profile.favorites, idToAdd];

      console.log("new favorites", newFavs);
      state.user.profile.favorites = newFavs;
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

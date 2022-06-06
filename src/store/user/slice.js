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
        ? state.profile.favorites.filter((areaId) => areaId.id !== idToAdd)
        : [...state.profile.favorites, idToAdd];

      console.log("new favorites", newFavs);
      state.profile.favorites = newFavs;
    },
    areaDeleteSuccess: (state, action) => {
      const areaId = action.payload;
      const deleteArea = state.profile?.owner.filter(
        (area) => area.id !== areaId
      );
      state.profile.owner = deleteArea;
    },
    removeFavsSuccess: (state, action) => {
      const favId = action.payload;
      const removeFavs = state.profile?.favorites.filter(
        (favs) => favs.id !== favId
      );
      state.profile.favorites = removeFavs;
    },
  },
});

export const {
  loginSuccess,
  logOut,
  tokenStillValid,
  auctionPostedSuccess,
  toggleFavorites,
  areaDeleteSuccess,
  removeFavsSuccess,
} = userSlice.actions;

export default userSlice.reducer;

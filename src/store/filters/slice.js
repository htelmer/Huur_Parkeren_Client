import { createSlice } from "@reduxjs/toolkit";

const initialState = { cities: [] };

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterCities: (state, action) => {
      const city = action.payload;
      state.cities = [...city];
    },

    //postNewArea: (state, action) => {
    //state.artworkDetails.bids = [
    //  ...state.artworkDetails.bids,
    // action.payload,
    // ];
    // },
  },
});

export const { filterCities } = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { allRentalAreas: [], areaDetails: null, loading: true };

export const areaSlice = createSlice({
  name: "rentalArea",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    fetchAreas: (state, action) => {
      const areas = action.payload;
      state.allRentalAreas = [...areas];
      state.loading = false;
    },
    areaDetailsFetched: (state, action) => {
      state.areaDetails = action.payload;
    },
    //postNewArea: (state, action) => {
    //state.artworkDetails.bids = [
    //  ...state.artworkDetails.bids,
    // action.payload,
    // ];
    // },
  },
});

export const { fetchAreas, areaDetailsFetched, startLoading } =
  areaSlice.actions;

export default areaSlice.reducer;

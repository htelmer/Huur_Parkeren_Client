import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [
    {
      id: 0,
      name: "Amsterdam",
      value: "Amsterdam",
    },
    {
      id: 1,
      name: "Utrecht",
      value: "Utrecht",
    },
    {
      id: 2,
      name: "Nieuwegein",
      value: "Nieuwegein",
    },
    {
      id: 3,
      name: "The Hague",
      value: "The Hague",
    },
    {
      id: 4,
      name: "Leiden",
      value: "Leiden",
    },
    {
      id: 5,
      name: "Rotterdam",
      value: "Rotterdam",
    },
    {
      id: 6,
      name: "Tilburg",
      value: "Tilburg",
    },
    {
      id: 7,
      name: "Maastricht",
      value: "Maastricht",
    },
    {
      id: 8,
      name: "Roermond",
      value: "Roermond",
    },
    {
      id: 9,
      name: "Nijmegen",
      value: "Nijmegen",
    },
    {
      id: 10,
      name: "Lelystad",
      value: "Lelystad",
    },
    {
      id: 11,
      name: "Hertogenbosch",
      value: "Hertogenbosch",
    },
  ],
};

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

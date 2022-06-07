import { fetchAreas, startLoading, areaDetailsFetched } from "./slice";
import { appDoneLoading } from "../appState/slice";
import { areaDeleteSuccess, removeFavsSuccess } from "../user/slice";
import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";
//import { selectToken } from "../user/selectors";
//import { appLoading, appDoneLoading } from "../appState/slice";
//import { setMessage } from "../appState/slice";
import { apiUrl } from "../../config/constants";

export async function fetchAllAreas(dispatch, getState) {
  try {
    dispatch(startLoading());
    console.log("startLoading", startLoading);
    const response = await axios.get(`${apiUrl}/area`);
    console.log("response", response);
    const areas = response.data;
    console.log("areas?", areas);
    dispatch(fetchAreas(areas));
    console.log("fetch areas??", fetchAreas(areas));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e.message);
  }
}
export const fetchAreaById = (id) => async (dispatch, getState) => {
  try {
    console.log("id in the thunk", id);
    dispatch(startLoading());
    console.log("startLoading", startLoading);
    const response = await axios.get(`${apiUrl}/area/${id}`);
    console.log("detail", response);
    console.log(response);
    dispatch(areaDetailsFetched(response.data));
    console.log("details fetched?", areaDetailsFetched(response.data));
    dispatch(appDoneLoading());
  } catch (e) {
    console.log(e);
  }
};

export const deleteArea = (id) => async (dispatch, getState) => {
  console.log("id", id);
  try {
    dispatch(startLoading());

    const response = await axios.delete(`${apiUrl}/area/myArea/${id}`);

    console.log(response.data);

    dispatch(areaDeleteSuccess({ areaId: id })); //
  } catch (e) {
    console.log(e.message);
    dispatch(appDoneLoading());
  }
};

export const removeFavorites = (areaId) => async (dispatch, getState) => {
  console.log("id", areaId);
  try {
    dispatch(startLoading());

    const response = await axios.delete(`${apiUrl}/area/savedAreas`);

    console.log("response", response.data);

    dispatch(removeFavsSuccess(areaId)); //
  } catch (e) {
    console.log(e.message);
    dispatch(appDoneLoading());
  }
};

export const postBooking = (newBooking) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const { tillWhen, areaId } = newBooking;
      console.log("newBooking", newBooking);
      const response = await axios.post(
        `${apiUrl}/area/bookings/`,
        { tillWhen, areaId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);

      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your Reservation is Received!!",
          3000
        )
      );
    } catch (e) {
      console.log(e.message);
      dispatch(appDoneLoading());
    }
  };
};

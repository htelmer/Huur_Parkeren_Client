import { fetchAreas, startLoading, areaDetailsFetched } from "./slice";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { appLoading, appDoneLoading } from "../appState/slice";
import { setMessage } from "../appState/slice";
import { apiUrl } from "../../config/constants";

export async function fetchAllAreas(dispatch, getState, id) {
  try {
    dispatch(startLoading());
    console.log("startLoading", startLoading);
    const response = await axios.get(`${apiUrl}/area`);
    console.log("response", response);
    const area = response.data;
    console.log("areas?", area);
    dispatch(fetchAreas(area));
  } catch (e) {
    console.log(e.message);
  }
}
export const fetchAreaById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/area/${id}`);
      console.log(response);
      dispatch(areaDetailsFetched(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

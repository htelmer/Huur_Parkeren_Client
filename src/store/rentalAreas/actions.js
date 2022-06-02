import { fetchAreas, startLoading, areaDetailsFetched } from "./slice";
import { appDoneLoading } from "../appState/slice";
import axios from "axios";
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

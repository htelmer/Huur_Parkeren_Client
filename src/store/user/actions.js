import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid } from "./slice";

export const signUp = (firstName, lastName, email, password, phone) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        phone,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};
export const postNewArea = (newArea) => async (dispatch, getState) => {
  console.log("newArea", newArea);
  try {
    const token = selectToken(getState());
    console.log("token", token);
    const {
      city,
      postalCode,
      streetName,
      houseNo,
      price,
      latitude,
      longtitude,
      availableStartDate,
      availableEndDate,
      availableSpots,
      description,
      image,
    } = newArea;
    console.log();
    dispatch(appLoading());
    const response = await axios.post(
      `${apiUrl}/area/newArea`,
      {
        city,
        postalCode,
        streetName,
        houseNo,
        price,
        latitude,
        longtitude,
        availableStartDate,
        availableEndDate,
        availableSpots,
        description,
        image,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //dispatch(areaPostedSuccess(response.data));
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        "Artwork is posted successfully!!",
        1500
      )
    );
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
};

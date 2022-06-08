import { DEFAULT_MESSAGE_TIMEOUT } from "../../config/constants";
import { setMessage, clearMessage } from "./slice";

export const showMessageWithTimeout = (
  severity,
  dismissable,
  text,
  timeOutMilliSeconds
) => {
  return (dispatch) => {
    dispatch(setMessage({ severity, dismissable, text }));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};

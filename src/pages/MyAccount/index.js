import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { getUserWithStoredToken } from "../../store/user/actions";
import { Link } from "react-router-dom";

export default function MyAccount() {
  const dispatch = useDispatch();
  const areas = useSelector(selectUser);
  console.log("selectors", areas);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  return (
    <div>
      <h1>My account</h1>
      <Link to="/MyAccount/SavedAreas">
        <button>Saved Parking Areas</button>
      </Link>
      <Link to="/MyAccount/NewParkingArea">
        <button>New Parking Area</button>
      </Link>
      <Link to="/MyAccount/MyParkingArea">
        <button>My Parking Area</button>
      </Link>
    </div>
  );
}

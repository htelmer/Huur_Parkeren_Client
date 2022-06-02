import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";
import { getUserWithStoredToken } from "../../store/user/actions";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
//import { Link } from "react-router-dom";

export default function SavedAreas() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("selectors", user);
  const token = useSelector(selectToken);
  const area = useSelector(selectAreas);

  /*useEffect(() => {
    dispatch(fetchAllAreas());
  }, [dispatch]);*/
  return (
    <div>
      <h1>Saved Areas</h1>
      {token ? <div>{user.profile.favorites.city}</div> : null}
    </div>
  );
}

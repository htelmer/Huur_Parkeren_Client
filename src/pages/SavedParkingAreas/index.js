import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";
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
      {user.favorites
        ? user.favorites.map((fav) => {
            return (
              <div>
                <h3>
                  {fav.city} {fav.postalCode}
                </h3>
                <p>
                  {fav.streetName} {fav.houseNo}
                </p>
                <img href={fav.image} />
                <p>{fav.description}</p>
              </div>
            );
          })
        : "You have not any favorites yet"}
    </div>
  );
}

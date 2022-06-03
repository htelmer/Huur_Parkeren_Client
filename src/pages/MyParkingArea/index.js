import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";

export default function MyParkingArea() {
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
      <h1>My Areas</h1>
      {user.owner
        ? user.owner.map((own) => {
            return (
              <div>
                <h3>
                  {own.city} {own.postalCode}
                </h3>
                <p>
                  {own.streetName} {own.houseNo}
                </p>
                <img href={own.image} />
                <p>{own.description}</p>
              </div>
            );
          })
        : "You have not any area yet"}
    </div>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { removeFavorites } from "../../store/rentalAreas/actions";

export default function SavedAreas() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("selectors", user);
  const token = useSelector(selectToken);
  const area = useSelector(selectAreas);
  const onRemoveClick = (areaId) => {
    console.log("clicked?", areaId);
    dispatch(removeFavorites(areaId));
  };

  /*useEffect(() => {
    dispatch(fetchAllAreas());
  }, [dispatch]);*/

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>
        <Typography color="text.primary">Saved Parking Areas</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ fontSize: "2rem" }}>
        Saved Areas
      </Typography>
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
                <img src={fav.image} width="200" />
                <p>{fav.description}</p>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onRemoveClick(fav.id)}
                >
                  Remove
                </Button>
              </div>
            );
          })
        : "You have not any favorites yet"}
    </div>
  );
}

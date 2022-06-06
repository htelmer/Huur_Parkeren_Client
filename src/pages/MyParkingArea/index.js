import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectToken,
  selectMyAreas,
} from "../../store/user/selectors";
import { selectAreas } from "../../store/rentalAreas/selectors";
import { deleteArea } from "../../store/rentalAreas/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export default function MyParkingArea() {
  const dispatch = useDispatch();
  const myAreas = useSelector(selectMyAreas);
  const onDeleteClick = (id) => {
    console.log("clicked?", id);
    dispatch(deleteArea(id));
  };

  /*useEffect(() => {
    dispatch(fetchAllAreas());
  }, [dispatch]);*/

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>
        <Typography color="text.primary">My Parking Area</Typography>
      </Breadcrumbs>
      <div>
        <h1>My Areas</h1>
        {myAreas
          ? myAreas.map((own) => {
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
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDeleteClick(own.id)}
                  >
                    Delete
                  </Button>
                </div>
              );
            })
          : "You have not any area yet"}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaById, postBooking } from "../../store/rentalAreas/actions";
import {
  getLoading,
  selectAreaDetails,
  selectAreas,
  selectAllReducer,
} from "../../store/rentalAreas/selectors";
import { useParams } from "react-router-dom";
import { setFavorites } from "../../store/user/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { selectUser } from "../../store/user/selectors";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardMedia from "@mui/material/CardMedia";

export default function AreaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const details = useSelector(selectAreaDetails);
  const areas = useSelector(selectAreas);
  const user = useSelector(selectUser);

  console.log("areas", areas);
  const reducer = useSelector(selectAllReducer);
  console.log("reducer?", reducer);
  //const { userId } = user?.id;

  const [open, setOpen] = React.useState(false);
  const [tillWhen, setTillWhen] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (event) => {
    // event.preventDefault();
    const newBooking = {
      tillWhen,
      areaId: id,
    };
    dispatch(postBooking(newBooking));
    setTillWhen("");
  };

  console.log("details??", details);
  useEffect(() => {
    dispatch(fetchAreaById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">
          {details?.streetName}, {details?.houseNo}
        </Typography>
      </Breadcrumbs>
      <div>
        {!details || details === null ? (
          "Loading"
        ) : (
          <div>
            <h2>
              {details.streetName} {details.houseNo}
            </h2>
            <h3>
              {details.postalCode} {details.city}
            </h3>
            <p>{details.price}</p>
            <img alt={details.name} src={details.image} width="200" />
            <h3>Features:</h3>
            <p>Price: € {details.price}/per mounth</p>
            <p>{details.description}</p>
            <p>Available spots: {details.availableSpots}</p>
            <button>Send a message</button>
            <button
              variant="secondary"
              style={{ borderRadius: "10px", height: "50px" }}
              onClick={() => dispatch(setFavorites(details.id))}
            >
              {user?.favorites?.some((u) => u.id === details.id)
                ? "Unsave"
                : "Save"}{" "}
            </button>
            {details.bookings.length === 0 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Book now!
              </Button>
            ) : (
              <p>
                {" "}
                This area is reserved till{" "}
                {details.bookings.map((when) => when.tillWhen)}
              </p>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Reservation</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To book for this area, please enter the end date (DD MM YYYY)
                  of your reservation here. We will contact with you in three
                  working days.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="tillWhen"
                  label="Till Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  value={tillWhen}
                  onChange={(event) => setTillWhen(event.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={submit}>
                  Book Now!
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}

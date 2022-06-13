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
import {
  DialogTitle,
  Paper,
  Card,
  Grid,
  CardContent,
  Box,
} from "@mui/material";
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
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">
          {details?.streetName}, {details?.houseNo}
        </Typography>
      </Breadcrumbs>
      <div>
        <Paper
          item
          xs={12}
          md={6}
          p={2}
          sx={{ mx: "auto", width: 1000, flexWrap: "wrap" }}
        >
          {!details || details === null ? (
            "Loading"
          ) : (
            <div>
              <Card sx={{ width: 1000, display: "flex" }}>
                <Grid>
                  <CardMedia
                    component="img"
                    sx={{ width: 400, display: { sm: "block" }, m: 3 }}
                    image={details.image}
                    alt="img"
                  />
                </Grid>
                <CardContent
                  justifyContent="flex-end"
                  sx={{ textAlign: "left" }}
                >
                  <Typography
                    component="h2"
                    variant="h5"
                    sx={{ mb: 1, fontWeight: "bold", color: "#2196f3" }}
                  >
                    {details.streetName} {details.houseNo}
                  </Typography>
                  <Typography
                    component="h4"
                    variant="h6"
                    sx={{ mb: 1, fontWeight: "medium" }}
                    color="inherit"
                  >
                    {details.postalCode} {details.city}
                  </Typography>
                  <h7 style={{ opacity: 0.7 }}>
                    <strong>Price:</strong> € {details.price}/per month
                  </h7>
                  <h3>Features:</h3>
                  <p>
                    <strong style={{ opacity: 0.7 }}>Available spots: </strong>
                    {details.availableSpots}
                  </p>

                  {details.bookings.length === 0 && (
                    <p style={{ opacity: 0.7 }}>
                      {" "}
                      <strong> Available From: </strong>
                      {details.availableStartDate.substring(0, 10)}
                    </p>
                  )}

                  {details.bookings.length === 0 && (
                    <p style={{ opacity: 0.7 }}>
                      {" "}
                      <strong> Available To:</strong>
                      {details.availableEndDate.substring(0, 10)}
                    </p>
                  )}

                  <p>
                    <strong>Description: </strong>
                    {details.description}
                  </p>
                  <p>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ display: { sm: "block" }, m: 3 }}
                      onClick={() => dispatch(setFavorites(details.id))}
                    >
                      {user?.favorites?.some((u) => u.id === details.id)
                        ? "Unsave"
                        : "Save"}{" "}
                    </Button>
                    {details.bookings.length === 0 ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                      >
                        Book now!
                      </Button>
                    ) : (
                      <Typography color="error">
                        {" "}
                        Sorry, this space is currently let by another customer
                        till {details.bookings.map((when) => when.tillWhen)}
                      </Typography>
                    )}
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Reservation</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          To book for this area, please enter the end date (DD
                          MM YYYY) of your reservation here. We will contact
                          with you in three working days.
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
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </Paper>
      </div>
    </Box>
  );
}

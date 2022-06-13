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
import { setFavorites, updateMyArea } from "../../store/user/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { selectUser } from "../../store/user/selectors";
import { selectCityFilter } from "../../store/filters/selectors";
import { filterCities } from "../../store/filters/slice";

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
  MenuItem,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
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

  console.log("details??", details);
  useEffect(() => {
    dispatch(fetchAreaById(id));
  }, [dispatch, id]);
  const [city, setCity] = useState(details.city);
  const [postalCode, setPostalCode] = useState(details.postalCode);
  const [streetName, setStreetName] = useState(details.streetName);
  const [houseNo, setHouseNo] = useState(details.houseNo);
  const [price, setPrice] = useState(details.price);
  const [latitude, setLatitude] = useState(details.latitude);
  const [longtitude, setLongtitude] = useState(details.longtitude);
  const [availableStartDate, setAvailableStartDate] = useState(
    details.availableStartDate
  );
  const [availableEndDate, setAvailableEndDate] = useState(
    details.availableEndDate
  );
  const [availableSpots, setAvailableSpots] = useState(
    details.setAvailableSpots
  );
  const [description, setDescription] = useState(details.description);
  const [image, setImage] = useState(details.image);

  const allArea = useSelector(selectCityFilter);
  useEffect(() => {
    dispatch(filterCities);
  }, [dispatch]);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ieyzmdtf");
    console.log("main", files);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dk3j2476r/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(file);
    setImage(file.url);
  };
  const submit = (event) => {
    const updatedArea = {
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
    };
    dispatch(updateMyArea(updatedArea));
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount/myParkingArea">
          My Parking Area
        </Link>
        <Typography color="text.primary">
          Update of {details.streetName}, {details.houseNo}
        </Typography>
      </Breadcrumbs>
      <Grid align="center">
        {" "}
        <h1>Update Your Parking Area</h1>
      </Grid>
      <form onSubmit={submit} autoComplete="off">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TextField
            id="select-city"
            select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            sx={{ m: 1, width: "25ch" }}
            margin="normal"
            required
            className={city.textField}
            SelectProps={{
              MenuProps: {
                className: city.menu,
              },
            }}
            label="Select City"
          >
            {allArea.map((area) => (
              <MenuItem value={area.name}>{area.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            id="postalCode"
            label="Postal Code"
            required
            type="string"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch" }}
          />
          <TextField
            id="streetName"
            label="Street Name"
            required
            type="string"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch" }}
          />
          <TextField
            id="houseNo"
            label="House Number"
            required
            type="string"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch" }}
          />

          <FormControl fullWidth sx={{ m: 1, width: "25ch" }} required>
            <TextField
              id="outlined-adornment-amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price €"
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              required
            />
          </FormControl>
          <TextField
            id="latitude"
            label="Latitude"
            required
            type="string"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch" }}
          />
          <TextField
            id="longtitude"
            label="Longtitude"
            required
            type="string"
            value={longtitude}
            onChange={(e) => setLongtitude(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch", marginRight: 30 }}
          />
          <FormControl fullWidth sx={{ m: 1, width: "35ch" }} required>
            <InputLabel htmlFor="outlined-adornment-amount">
              Available From
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={availableStartDate}
              onChange={(e) => setAvailableStartDate(e.target.value)}
              label="Available From"
              type="date"
              startAdornment={<InputAdornment position="start" />}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: "35ch" }} required>
            <InputLabel htmlFor="outlined-adornment-amount">
              Available To
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={availableEndDate}
              onChange={(e) => setAvailableEndDate(e.target.value)}
              label="Available From"
              type="date"
              startAdornment={<InputAdornment position="start" />}
            />
          </FormControl>
          <TextField
            id="availableSpots"
            label="Available Spots"
            required
            type="number"
            value={availableSpots}
            onChange={(e) => setAvailableSpots(e.target.value)}
            margin="normal"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{ inputProps: { min: 0 } }}
          />
          <TextField
            id="description"
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            fullWidth
            sx={{ m: 1, width: "115ch", marginRight: 10 }}
          />
          <Typography>Image</Typography>
          <input type="file" />
          <Button
            sx={{ m: 5, marginLeft: 90 }}
            variant="contained"
            size="large"
            type="submit"
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

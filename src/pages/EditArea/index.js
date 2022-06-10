import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMyAreas } from "../../store/user/selectors";
import { selectAreaDetails } from "../../store/rentalAreas/selectors";
//import { updateMyArea } from "../../store/user/actions";
import { deleteArea, fetchAreaById } from "../../store/rentalAreas/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import { selectCityFilter } from "../../store/filters/selectors";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { filterCities } from "../../store/filters/slice";

import Box from "@mui/material/Box";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export default function EditParkingArea() {
  const areaDetails = useSelector(selectAreaDetails);
  const allArea = useSelector(selectCityFilter);
  console.log("areaDetails", areaDetails);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAreaById(id));
  }, [dispatch, id]);
  const ownerId = areaDetails.ownerId;
  const [city, setCity] = useState(areaDetails.city);
  const [postalCode, setPostalCode] = useState(areaDetails.postalCode);
  const [streetName, setStreetName] = useState(areaDetails.streetName);
  const [houseNo, setHouseNo] = useState(areaDetails.houseNo);
  const [price, setPrice] = useState(areaDetails.price);
  const [latitude, setLatitude] = useState(areaDetails.latitude);
  const [longtitude, setLongtitude] = useState(areaDetails.longtitude);
  const [availableStartDate, setAvailableStartDate] = useState(
    areaDetails.availableStartDate
  );
  const [availableEndDate, setAvailableEndDate] = useState(
    areaDetails.availableEndDate
  );
  const [availableSpots, setAvailableSpots] = useState(
    areaDetails.availableSpots
  );
  const [description, setDescription] = useState(areaDetails.description);
  const [image, setImage] = useState(areaDetails.image);
  /* function submit(event) {
    dispatch(
      updateMyArea(
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
        image
      )
    );
  }*/
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 3 }}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>

        <Typography color="text.primary">New Parking Area</Typography>
      </Breadcrumbs>
      <div>
        <Grid align="center">
          {" "}
          <h1>Update Your Parking Area</h1>
        </Grid>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
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
            sx={{ m: 1, width: "25ch" }}
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
            sx={{ m: 1 }}
          />
          <Typography>Image</Typography>
          <input type="file" />
          <Button sx={{ m: 1 }} variant="contained" size="large" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </div>
    </div>
  );
}

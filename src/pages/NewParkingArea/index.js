import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewArea } from "../../store/user/actions";
import { filterCities } from "../../store/filters/slice";
import { selectCityFilter } from "../../store/filters/selectors";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export default function NewParkingArea() {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [availableStartDate, setAvailableStartDate] = useState("");
  const [availableEndDate, setAvailableEndDate] = useState("");
  const [availableSpots, setAvailableSpots] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const allArea = useSelector(selectCityFilter);
  useEffect(() => {
    dispatch(filterCities);
  }, [dispatch]);

  const submit = (event) => {
    event.preventDefault();
    const newArea = {
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
    dispatch(postNewArea(newArea));
    setCity("");
    setPostalCode("");
    setStreetName("");
    setHouseNo("");
    setPrice("");
    setLatitude("");
    setLongtitude("");
    setAvailableStartDate("");
    setAvailableEndDate("");
    setAvailableSpots("");
    setDescription("");
    setImage("");
  };

  /* <p>
  <label>
    City:{" "}
    <input
      type="string"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  </label>
</p>*/

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/myAccount">
          My Account
        </Link>

        <Typography color="text.primary">New Parking Area</Typography>
      </Breadcrumbs>
      <div>
        <form onSubmit={submit} autoComplete="off">
          <Grid align="center">
            {" "}
            <h1>Post Your Parking Area</h1>
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
            <TextField
              id="image"
              label="Image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              margin="normal"
              fullWidth
              sx={{ m: 1, width: "35ch" }}
            />

            <Button
              sx={{ m: 1 }}
              variant="contained"
              size="large"
              type="submit"
            >
              {" "}
              Submit{" "}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

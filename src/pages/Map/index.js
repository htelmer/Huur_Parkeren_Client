import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
  Card,
} from "@mui/material";

//just some mock data, but remember you'll always need latitude and longitude
import {
  selectAreas,
  getPricesLowerThan,
} from "../../store/rentalAreas/selectors";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import { selectCityFilter } from "../../store/filters/selectors";
import SearchIcon from "@mui/icons-material/Search";
import { filterCities } from "../../store/filters/slice";
import "./style.css";
import "leaflet/dist/leaflet.css";

//Step 1. https://leafletjs.com/examples/quick-start/
//Step 2. https://react-leaflet.js.org/docs/start-setup/

export default function Map() {
  const dispatch = useDispatch();
  const areas = useSelector(selectAreas);
  console.log("selectors", areas);
  const allArea = useSelector(selectCityFilter);
  console.log("filterreducer", allArea);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState("");
  const [booked, setBooked] = useState("");

  const [lowerPrices, setLowerPrices] = useState();
  const parsedLowerPrices = parseInt(lowerPrices);
  const lPrices = useSelector(getPricesLowerThan(parsedLowerPrices));
  const latAndLong = useSelector(selectAreas);
  useEffect(() => {
    dispatch(fetchAllAreas);
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterCities);
  }, [dispatch]);

  useEffect(() => {
    console.log(city);
  }, [city]);

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);
  return (
    <>
      <Grid
        sx={{ display: "flex", m: 1 }}
        variant="outlined"
        style={{ marginLeft: 1200 }}
      >
        <div className="map-list-box">
          <div class="search-content">
            <Link className="active-view-type" href={`/`}>
              LIST
            </Link>
            <Link href={`/map`}> MAP </Link>
          </div>
        </div>
      </Grid>
      <Paper sx={{ display: "flex", flexWrap: "wrap" }}>
        <Grid
          item
          xs={12}
          md={6}
          p={2}
          sx={{ m: 3, width: "30ch" }}
          justifyContent="flex-start"
          direction="column"
        >
          <div>
            <Grid>
              <FormControl fullWidth sx={{ mb: 4, width: "25ch" }} required>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by city, street etc."
                  type="text"
                  startAdornment={<SearchIcon position="start" />}
                />
              </FormControl>
            </Grid>
            <Grid>
              <Typography>
                Price to:
                <OutlinedInput
                  type="number"
                  placeholder="No Limit"
                  value={lowerPrices}
                  onChange={(e) => setLowerPrices(e.target.value)}
                />
              </Typography>
            </Grid>
            <FormControl
              sx={{ mt: 4, ml: 7, minWidth: 120, maxWidth: 300, width: "20ch" }}
            >
              <InputLabel shrink htmlFor="select-multiple-native">
                City
              </InputLabel>
              <Select
                multiple
                native
                value={city}
                // @ts-ignore Typings are not considering `native`
                onChange={(event) => setCity(event.target.value)}
                label="City"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {allArea.map((area) => (
                  <option value={area.name}>{area.name} </option>
                ))}
              </Select>
            </FormControl>
            <Grid
              sx={{ mt: 4, ml: 7, minWidth: 120, maxWidth: 300, width: "20ch" }}
            >
              <Typography variant="h6">Current Status</Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={available}
                      onChange={(e) => {
                        e.target.checked
                          ? setAvailable(true)
                          : setAvailable(false);
                      }}
                    />
                  }
                  label="Available Areas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={booked}
                      onChange={(e) => {
                        e.target.checked ? setBooked(true) : setBooked(false);
                      }}
                    />
                  }
                  label="Booked Areas"
                />
              </FormGroup>
            </Grid>
          </div>
        </Grid>

        {/* to see your map, you need to add height property */}
        {/* center is where the map will get started */}

        <Card
          variant="outlined"
          item
          xs={12}
          md={6}
          p={2}
          sx={{ m: 5, width: "86ch" }}
          justifyContent="flex-end"
        >
          <MapContainer
            style={{
              border: "2px solid",
              borderRadius: "10px",
              height: "50vw",
              width: "60vw",
              maxWidth: "1000px",
              maxHeight: "800px",
              margin: "0px",
            }}
            center={[52.36994, 4.906]}
            zoom={9}
            scrollWheelZoom={false}
            justifyContent="flex-end"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {lPrices.length
              ? lPrices
                  .filter((c) => (city ? c.city === city : true))
                  .filter(
                    (a) =>
                      a.streetName
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      a.city.toLowerCase().includes(search.toLowerCase()) ||
                      a.postalCode
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      a.description.toLowerCase().includes(search.toLowerCase())
                  )
                  .filter((avail) =>
                    available ? avail.bookings.length === 0 : true
                  )
                  .filter((book) =>
                    booked ? book.bookings.length !== 0 : true
                  )
                  .map((area) => (
                    // the marker is every pointer you see on the map
                    <Marker
                      key={area.streetName}
                      position={[area.latitude, area.longtitude]}
                    >
                      {/* when we click on the marker, we see the popup */}
                      <Popup>
                        <img
                          alt={area.streetName}
                          style={{ width: "100px", borderRadius: "0.5em" }}
                          src={area.image}
                        />
                        <p>{area.streetName}</p>
                      </Popup>
                    </Marker>
                  ))
              : "No areas with this conditions"}
          </MapContainer>
        </Card>
      </Paper>
    </>
  );
}

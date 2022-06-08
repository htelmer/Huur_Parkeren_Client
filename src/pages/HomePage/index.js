import React, { useEffect, useState } from "react";
import "./styles.css";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import AreaCard from "../../components/AreaCard";
import {
  selectAreas,
  getPricesLowerThan,
} from "../../store/rentalAreas/selectors";
import SearchIcon from "@mui/icons-material/Search";
import "react-calendar/dist/Calendar.css";
import { selectCityFilter } from "../../store/filters/selectors";
import { filterCities } from "../../store/filters/slice";

export default function Home() {
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

  useEffect(() => {
    dispatch(fetchAllAreas);
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterCities);
  }, [dispatch]);

  useEffect(() => {
    console.log(city);
  }, [city]);

  return (
    <Grid>
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
              <FormControl fullWidth sx={{ m: 1, width: "25ch" }} required>
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
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
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
            <Grid>
              <Typography>Current Status</Typography>
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

        <Grid
          sx={{ display: "flex", m: 1.5 }}
          variant="outlined"
          style={{ marginLeft: 90 }}
        >
          <div className="display_areas">
            <p>
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
                        a.description
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .filter((avail) =>
                      available ? avail.bookings.length === 0 : true
                    )
                    .filter((book) =>
                      booked ? book.bookings.length !== 0 : true
                    )
                    .map((s) => (
                      <AreaCard
                        key={s.id}
                        id={s.id}
                        streetName={s.streetName}
                        houseNo={s.houseNo}
                        postalCode={s.postalCode}
                        city={s.city}
                        price={s.price}
                        image={s.image}
                        favorites={s.favorites}
                        bookings={s.bookings}
                      />
                    ))
                : "No areas with this conditions"}
            </p>
          </div>
        </Grid>
      </Paper>
    </Grid>
  );
}

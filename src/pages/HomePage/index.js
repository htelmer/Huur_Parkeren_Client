import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import AreaCard from "../../components/AreaCard";
import {
  selectAreas,
  getPricesLowerThan,
  getPricesHigherThan,
} from "../../store/rentalAreas/selectors";
import SearchIcon from "@mui/icons-material/Search";

import "react-calendar/dist/Calendar.css";
import {
  selectCityFilter,
  selectAllCityFilter,
} from "../../store/filters/selectors";
import { filterCities } from "../../store/filters/slice";

export default function Home() {
  const dispatch = useDispatch();
  const areas = useSelector(selectAreas);
  console.log("selectors", areas);
  const allArea = useSelector(selectCityFilter);
  console.log("filterreducer", allArea);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const [lowerPrices, setLowerPrices] = useState();
  const [higherPrices, setHigherPrices] = useState(0);
  const parsedLowerPrices = parseInt(lowerPrices);
  const lPrices = useSelector(getPricesLowerThan(parsedLowerPrices));
  const allAreaReducer = useSelector(selectAllCityFilter);

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
      <div className="map-list-box">
        <div class="search-content">
          <a className="active-view-type" href={`/`}>
            LIST
          </a>
          <a href={`/map`}> MAP </a>
        </div>
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
              <Grid>
                <Typography>
                  Price from:
                  <OutlinedInput
                    type="number"
                    placeholder="No Limit"
                    value={lowerPrices}
                    onChange={(e) => setLowerPrices(e.target.value)}
                    sx={{ m: 3, width: "20ch" }}
                  />
                </Typography>
              </Grid>
              <Grid>
                <TextField
                  id="select-city"
                  select
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  sx={{ m: 1, width: "25ch" }}
                  margin="normal"
                  className={city.textField}
                  SelectProps={{
                    MenuProps: {
                      className: city.menu,
                    },
                  }}
                  label="Select City"
                >
                  <MenuItem value={allAreaReducer.filter}>All Cities</MenuItem>
                  {allArea.map((area) => (
                    <MenuItem value={area.name}>{area.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </div>
          </Grid>

          <Grid
            sx={{ display: "flex", m: 1.5 }}
            variant="outlined"
            justifyContent="flex-end"
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
      </div>
    </Grid>
  );
}

import React, { useEffect, useState } from "react";
import "./styles.css";
import { Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import AreaCard from "../../components/AreaCard";
import {
  selectAreas,
  getPricesLowerThan,
} from "../../store/rentalAreas/selectors";
import { Link } from "react-router-dom";
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

  const [lowerPrices, setLowerPrices] = useState(1000);
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
      <Paper>
        <div>
          <input
            placeholder="Search by city, street etc."
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          ></input>
          <label>Price to:</label>
          <input
            type="number"
            placeholder="No Limit"
            value={lowerPrices}
            onChange={(e) => setLowerPrices(e.target.value)}
          />
          <select
            name="cities"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            <option value={allAreaReducer.filter}>All Cities</option>
            {allArea.map((area) => (
              <option value={area.name}>{area.name}</option>
            ))}
          </select>
          <div>
            <Link to={`/map`}>
              <button>View Map</button>
            </Link>

            <h1>Areas</h1>
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
                        />
                      ))
                  : "No areas with this conditions"}
              </p>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

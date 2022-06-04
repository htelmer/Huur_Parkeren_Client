import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import AreaCard from "../../components/AreaCard";
import { selectAreas } from "../../store/rentalAreas/selectors";
import { Link } from "react-router-dom";
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
    <div>
      <select
        name="cities"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      >
        <option value={allArea.allRentalAreas}>All Cities</option>
        {allArea.map((area) => (
          <option value={area.name}>{area.name}</option>
        ))}
      </select>
      <div>
        <Link to={`/map`}>
          <button>View Map</button>
        </Link>
        <h1>Areas</h1>
        <p>
          {areas
            .filter((c) => (city ? c.city === city : true))
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
            ))}
        </p>
      </div>
    </div>
  );
}

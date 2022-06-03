import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import AreaCard from "../../components/AreaCard";
import { selectAreas } from "../../store/rentalAreas/selectors";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const dispatch = useDispatch();
  const areas = useSelector(selectAreas);
  console.log("selectors", areas);

  useEffect(() => {
    dispatch(fetchAllAreas);
  }, [dispatch]);

  return (
    <div>
      <Link to={`/map`}>
        <button>View Map</button>
      </Link>
      <h1>Areas</h1>
      <p>
        {areas.map((s) => (
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
  );
}

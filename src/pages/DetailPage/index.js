import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaById } from "../../store/rentalAreas/actions";
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

export default function AreaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const details = useSelector(selectAreaDetails);
  const areas = useSelector(selectAreas);
  console.log("areas", areas);
  const reducer = useSelector(selectAllReducer);
  console.log("reducer?", reducer);
  //const userId = details.favorites.userId;
  //console.log("favorites", favorites); //const favorites = useSelector(selectFavorites);
  console.log("details??", details);
  useEffect(() => {
    dispatch(fetchAreaById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">
          {details?.streetName}, {details?.houseNo}
        </Typography>
      </Breadcrumbs>
      <div>
        {!details || details === null ? (
          "Loading"
        ) : (
          <div>
            <h2>
              {details.streetName} {details.houseNo}
            </h2>
            <h3>
              {details.postalCode} {details.city}
            </h3>
            <p>{details.price}</p>
            <img alt={details.name} href={details.image} />

            <h3>Features:</h3>
            <p>Price: € {details.price}/per mounth</p>
            <p>{details.description}</p>
            <p>Available spots: {details.availableSpots}</p>
            <button>Send a message</button>
            <button
              variant="secondary"
              style={{ borderRadius: "10px", height: "50px" }}
              onClick={() => dispatch(setFavorites(details.id))}
            >
              Save
            </button>
            {details.bookings.length === 0 ? (
              <button>Book now!</button>
            ) : (
              <p>
                {" "}
                This area is reserved till{" "}
                {details.bookings.map((when) => when.tillWhen)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

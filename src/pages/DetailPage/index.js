import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaById } from "../../store/rentalAreas/actions";
import {
  getLoading,
  selectAreaDetails,
} from "../../store/rentalAreas/selectors";
import { useParams } from "react-router-dom";
import { selectToken, selectFavorites } from "../../store/user/selectors";
import { setFavorites } from "../../store/user/actions";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function AreaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const details = useSelector(selectAreaDetails);
  const userId =
    details.favorites//const favorites = useSelector(selectFavorites);
    //console.log("favorites", favorites);
    .console
      .log("details??", details);
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
              {details.favorites ? "Remove" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

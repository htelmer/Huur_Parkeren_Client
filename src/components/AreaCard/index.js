import React from "react";
import { Link } from "react-router-dom";

export default function AreaCard(props) {
  return (
    <div>
      <h2>
        {props.streetName} {props.houseNo}
      </h2>
      <p>
        {props.postalCode} {props.City}
      </p>
      <p>{props.price}</p>
      <img src={props.image} alt="img" style={{ width: 200 }} />
      <p> ♥ {props.favorites.length}</p>
      <Link to={`/area/${props.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

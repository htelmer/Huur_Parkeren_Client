import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAreaById } from "../../store/rentalAreas/actions";
import {
  getLoading,
  selectAreas,
  selectAreaDetails,
} from "../../store/rentalAreas/selectors";
import { useParams } from "react-router-dom";
import { selectToken, selectUser } from "../../store/user/selectors";

export default function AreaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const details = useSelector(selectAreaDetails);
  useEffect(() => {
    dispatch(fetchAreaById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Hello from details page</h1>
    </div>
  );
}

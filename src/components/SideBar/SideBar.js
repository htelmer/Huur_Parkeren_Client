import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAreas } from "../../store/rentalAreas/selectors";

export default function Products() {
  const dispatch = useDispatch();
  const areas = useSelector(selectAreas);
  const [searchTerm, setSearchTerm] = useState("");
  return <div></div>;
}

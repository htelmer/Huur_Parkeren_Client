import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewArea } from "../../store/user/actions";
export default function NewParkingArea() {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [price, setPrice] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [availableStartDate, setAvailableStartDate] = useState("");
  const [availableEndDate, setAvailableEndDate] = useState("");
  const [availableSpots, setAvailableSpots] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const submit = (event) => {
    event.preventDefault();
    const newArea = {
      city,
      postalCode,
      streetName,
      houseNo,
      price,
      latitude,
      longtitude,
      availableStartDate,
      availableEndDate,
      availableSpots,
      description,
      image,
    };
    dispatch(postNewArea(newArea));
    setCity("");
    setPostalCode("");
    setStreetName("");
    setHouseNo("");
    setPrice("");
    setLatitude("");
    setLongtitude("");
    setAvailableStartDate("");
    setAvailableEndDate("");
    setAvailableSpots("");
    setDescription("");
    setImage("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Post Your Parking Area</h1>
        <p>
          <label>
            City:{" "}
            <input
              type="string"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Postal Code:{" "}
            <input
              type="string"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Street Name:{" "}
            <input
              type="string"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            House Number:{" "}
            <input
              type="string"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Price: €{""}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            /permonth
          </label>
        </p>
        <p>
          <label>
            Latitude:
            <input
              type="string"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Longtitude:
            <input
              type="string"
              value={longtitude}
              onChange={(e) => setLongtitude(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Available Start Date:
            <input
              type="date"
              value={availableStartDate}
              onChange={(e) => setAvailableStartDate(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Available End Date:
            <input
              type="date"
              value={availableEndDate}
              onChange={(e) => setAvailableEndDate(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Available Spots:
            <input
              type="number"
              value={availableSpots}
              onChange={(e) => setAvailableSpots(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Image:
            <input
              type="string"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit"> Submit </button>
        </p>
      </form>
    </div>
  );
}

/* export default function Auction() {
 
 return (
    <div>
      <form onSubmit={submit}>
        <h1>Post a New Auction</h1>
        <p>
          <label>
            Title:{" "}
            <input
              type="string"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Minimum Bid:{" "}
            <input
              type="number"
              value={minimumBid}
              onChange={(e) => setBid(e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Image URL:{" "}
            <input
              type="string"
              value={imageUrl}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </p>
        <p>
          <button type="submit"> Post a New Auction</button>
        </p>
      </form>
    </div>
  );
}*/

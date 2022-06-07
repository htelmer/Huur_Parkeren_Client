import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//just some mock data, but remember you'll always need latitude and longitude
import { selectAreas } from "../../store/rentalAreas/selectors";
import { fetchAllAreas } from "../../store/rentalAreas/actions";
import "./style.css";
import "leaflet/dist/leaflet.css";
import Card from "@mui/material/Card";

//Step 1. https://leafletjs.com/examples/quick-start/
//Step 2. https://react-leaflet.js.org/docs/start-setup/

export default function Map() {
  const dispatch = useDispatch();
  const latAndLong = useSelector(selectAreas);
  useEffect(() => {
    dispatch(fetchAllAreas);
  }, [dispatch]);

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);
  return (
    <>
      <div>
        <h1>Areas</h1>
      </div>
      {/* to see your map, you need to add height property */}
      {/* center is where the map will get started */}
      <div className="map-list-box">
        <div class="search-content">
          <a className="view-type" href={`/`}>
            LIST
          </a>
          <a className="active-view-type" href={`/map`}>
            {" "}
            MAP{" "}
          </a>
        </div>
      </div>
      <Card sx={{ display: "flex", m: 1.5 }} variant="outlined">
        <MapContainer
          style={{
            border: "2px solid",
            borderRadius: "10px",
            height: "50vw",
            width: "60vw",
            maxWidth: "1000px",
            maxHeight: "800px",
            margin: "0px 19.5%",
          }}
          center={[52.36994, 4.906]}
          zoom={9}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {latAndLong.map((area) => (
            // the marker is every pointer you see on the map
            <Marker
              key={area.streetName}
              position={[area.latitude, area.longtitude]}
            >
              {/* when we click on the marker, we see the popup */}
              <Popup>
                <img
                  alt={area.streetName}
                  style={{ width: "100px", borderRadius: "0.5em" }}
                  src={area.image}
                />
                <p>{area.streetName}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card>
    </>
  );
}

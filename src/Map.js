import React, { useState } from "react";
import { db } from "./base";
import FcShop from "react-icons";
import GoogleMapReact from "google-map-react";
import "./map.css";

const Marker = ({ text, price }) => {
  <div>
    <FcShop />
    <div>{text}</div>
    <div>{price}</div>
  </div>;
};

const Map = ({ setMap, label, center, zoom }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  try {
    db.collection("vendors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          let data = element.data();
          if (data.product === label) {
            setName(data.name);
            setPrice(data.price);
            setLongitude(data.longitude);
            setLatitude(data.latitude);
          }
        });
      });
  } catch (error) {
    alert(error);
  }

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyChnvXXBWr2yCxZ8pzCtPBeERlBD7tLBKg" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={latitude} lng={longitude} text={name} price={price} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;

Map.defaultProps = {
  center: {
    lat: -6.776012,
    lng: 39.178326,
  },
  zoom: 11,
};

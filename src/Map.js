import React, { useState } from "react";
import { db } from "./base";
import GoogleMapReact from "google-map-react";
import "./map.css";

const Marker = ({ text }) => {
  return (
    <div>
      <div className="mark">{text}🛒</div>
    </div>
  );
};

const Detail = ({ name, price, product }) => {
  return (
    <div className="card">
      <h2>Seller Detail</h2>
      <div className="detail">
        <h4>Name : </h4>
        <h4>{name}</h4>
      </div>
      <div className="detail">
        <h4>Product : </h4>
        <h4>{product}</h4>
      </div>
      <div className="detail">
        <h4>Price : </h4>
        <h4>{price}</h4>
      </div>
    </div>
  );
};

const Map = ({ setMap, label, center, zoom }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
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
            setProduct(data.product);
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
        <Marker lat={latitude} lng={longitude} text={name} />
      </GoogleMapReact>
      <Detail name={name} price={price} product={product} />
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

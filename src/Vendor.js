import React, { useState } from "react";
import { db } from "./base";
import "./vendor.css";

const Vendor = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const { name, product } = e.target.elements;
    try {
      db.collection("vendors").add({
        name: name.value,
        product: product.value,
        latitude: lat,
        longitude: lng,
      });
      console.log("data succesfully pushed");
    } catch (error) {
      console.log(error);
    }

    e.target.reset();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div>
      <h1>Vendors part</h1>
      <form onSubmit={handleLogin}>
        <label>Full Name</label>
        <input
          className="straight"
          name="name"
          type="name"
          placeholder="Full Name"
        />
        <label>Product</label>
        <input
          className="straight"
          name="product"
          type="name"
          placeholder="Product"
        />

        <button type="submit">Register</button>
      </form>
      <button onClick={getLocation}>Get Location</button>
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
    </div>
  );
};

export default Vendor;

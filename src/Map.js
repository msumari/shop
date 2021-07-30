import React, { useState } from "react";
import { db } from "./base";

const Map = ({ setMap, label }) => {
  const [name, setName] = useState("");
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
            setLongitude(data.longitude);
            setLatitude(data.latitude);
          }
        });
      });
  } catch (error) {
    alert(error);
  }

  return (
    <div>
      <h1>{label}</h1>
      <h1>{name}</h1>
      <h1>{latitude}</h1>
      <h1>{longitude}</h1>
    </div>
  );
};

export default Map;

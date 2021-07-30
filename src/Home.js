import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5";
import { app } from "./base";
import "./home.css";
import Map from "./Map";

const Home = () => {
  const fileInputRef = useRef();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [confidence, setConfidence] = useState();
  const [label, setLabel] = useState();
  const [map, setMap] = useState(false);
  // Initialize the Image Classifier method with shoe model
  const classifier = ml5.imageClassifier("./model/model.json", modelLoaded);
  // When the model is loaded
  function modelLoaded() {
    console.log("Model Loaded!");
  }
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const store = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const Changed = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const img = document.querySelector("#myImage");

  if (img != null) {
    classifier.predict(img, 3, (error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      setLabel(result[0].label);
      setConfidence(result[0].confidence);
    });
  }

  // console.log(img);

  let assurance = confidence * 100;

  return (
    <div>
      <div className="header">
        <h1>Home</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </div>
      <div className="uploader">
        <img
          id="myImage"
          src={preview}
          alt="upload"
          onClick={() => {
            setImage(null);
          }}
        />
        <form>
          <label onClick={Changed}>choose photo</label>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={store}
          />
        </form>
        <div>
          <h3>Label:</h3>
          <h4>{label}</h4>
          <h3>Confidence:</h3>
          <h4>{assurance}</h4>
        </div>
        <button
          onClick={() => {
            setMap(true);
          }}
        >
          Locate
        </button>
        {map && <Map map={map} setMap={setMap} label={label} />}
      </div>
    </div>
  );
};

export default Home;

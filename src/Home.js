import React, { useEffect, useRef, useState } from "react";
import app from "./base";
import "./home.css";

const Home = () => {
  const fileInputRef = useRef();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
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

  return (
    <div>
      <div className="header">
        <h1>Home</h1>
        <button onClick={() => app.auth().signOut()}>Sign out</button>
      </div>
      <div className="uploader">
        <img
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
        <button>Locate</button>
      </div>
    </div>
  );
};

export default Home;

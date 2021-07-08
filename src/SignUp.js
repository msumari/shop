import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { Link } from "react-router-dom";
import "./form.css";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div>
      <form onSubmit={handleSignUp} className="bg_form">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="form">
          <h2>Sign up</h2>
          <label>Email</label>
          <input
            className="straight"
            name="email"
            type="email"
            placeholder="Email"
          />
          <label>Password</label>
          <input
            className="straight"
            name="password"
            type="password"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
          <p className="account">
            already have an account?{" "}
            <Link to="/login" className="signuplink">
              Sign in here
            </Link>{" "}
            <br />{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default withRouter(SignUp);

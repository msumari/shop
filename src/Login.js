import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import "./form.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="bg_form">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="form">
          <h2>Log in</h2>
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
          <button type="submit">Log in</button>
          <p className="account">
            Don't have an account?{" "}
            <Link to="signup" className="signuplink">
              Sign up here
            </Link>{" "}
            <br />{" "}
            <Link to="/reset" className="resetlink">
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);

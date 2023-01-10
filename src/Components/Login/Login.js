import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="container">
      {" "}
      <h2>Please Login</h2>
      <form>
        <div className="myform ele">
          <input type="text"></input>
          <label>Email</label>
        </div>

        <div className="myform ele">
          <input type="password"></input>
          <label>Password</label>
        </div>

        <button className="btn">Login</button>

        <div className="register ele">
          Don't have an account?&nbsp;
          <div className="outerlink">
            <a href="" className="link">
              Register
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

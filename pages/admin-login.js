import React, { useState, useEffect } from "react";
import Input from "../Components/Input";
import PBtn from "../Components/PBtn";
import api from "../utils/api";
import AdminNav from "../Components/AdminNav/AdminNav";
const Login = props => {
  return (
    <div className="login">
      <AdminNav />
      <form className="login-form" action="/api/login" method="POST">
        <div className="form-group">
          <h2>The Teacher Next Door</h2>
        </div>
        <div className="form-group">
          <Input
            className="form-control"
            type="text"
            placeholder="Username"
            name="username"
          />
          <Input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
          />
          <PBtn type="submit">Login</PBtn>
        </div>
      </form>
      <style jsx>
        {`
          .login {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;
            max-height: 100vh;
            height: 100vh;
          }

          .login-form {
            max-width: 25em;
            justify-content: space-evenly;
            align-items: center;
            display: flex;
            flex-direction: column;
            max-height: 25em;
            height: 100%;
            width: 100%;
            border: 1px solid black;
            padding: 35px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;

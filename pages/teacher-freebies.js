import React, { Component } from "react";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import Header from "../Components/Header";
import api from "../utils/api";
import Link from "next/link";
import "isomorphic-fetch";
const Freebies = props => {
  const logout = async () => {
    await api.logout();

    window.location.reload();
  };
  return (
    <div className="freebies">
      <Header />
      <div className="container">
        {props.user ? (
          <div className="column">
            <PBtn onClick={logout}>Logout</PBtn>
            <div className="container">
              <div className="columns">
                {props.freebies.map((freebie, index) => {
                  return (
                    <div className="column is-3">
                      <img src={freebie.img} alt="" />
                      <Link href={freebie.path}>
                        <a>Download</a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="columns is-centered is-multiline">
            <div className="column is-12 heading">
              <h1>Make sure to login with the info that I sent you.</h1>
            </div>
            <div className="column is-8 has-text-centered">
              <form className="login-form" action="/api/login" method="POST">
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
                <PBtn type="submit">Get Freebies</PBtn>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Freebies.getInitialProps = async function({ req, query }) {
  console.log(query);
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/freebies");

  const freebies = await response.json();
  return { freebies: freebies };
};
export default Freebies;

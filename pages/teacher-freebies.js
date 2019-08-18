import React, { Component } from "react";
import PBtn from "../Components/PBtn";
import SBtn from "../Components/SBtn";
import Input from "../Components/Input";
import Header from "../Components/Header";
import api from "../utils/api";
import Link from "next/link";
import "isomorphic-fetch";
import Footer from "../Components/Footer";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import Layout from "../Components/Layout/Layout";
import Backpack from "../images/E.png";
import TitleComponent from "../Components/TitleComponent";
const Freebies = props => {
  const logout = async () => {
    await api.logout();

    window.location.reload();
  };
  return (
    <Layout>
      <div className="freebies">
        <Header />
        <Container>
          {props.user ? (
            <Container className="teacher-freebies-container">
              <TitleComponent img={Backpack} h1="Freebies" />
              {/* <Columns className="is-centered">
                <Column className="is-2 has-text-centered">
                  <PBtn onClick={logout}>Logout</PBtn>
                </Column>
              </Columns> */}
              <Columns className="is-multiline is-centered">
                {props.freebies.map((freebie, index) => {
                  return (
                    <Column className="is-3 has-text-centered">
                      <div className="card">
                        <div className="card-image">
                          <figure className="image">
                            <img src={freebie.img} alt={freebie.originalname} />
                          </figure>
                        </div>

                        <div className="card-body">
                          <h2 className="card-title">{freebie.originalname}</h2>
                        </div>
                        <div className="card-footer">
                          <p className="card-footer-item">
                            <Link href={freebie.path}>
                              <a>
                                <i className="fas fa-download"></i> Download
                              </a>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Column>
                  );
                })}
              </Columns>
            </Container>
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
        </Container>
        <Footer />
      </div>
    </Layout>
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

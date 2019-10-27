import React, { Component } from "react";
import PBtn from "../Components/PBtn";
import SBtn from "../Components/SBtn";
import Input from "../Components/Input";
import Header from "../Components/Header";
import api from "../utils/api";
import Link from "next/link";
import "isomorphic-fetch";
import Footer from "../Components/Footer/FooterNext";
import ContainerFluid from "../Components/FormatComponents/ContainerFluid";
import Container from "../Components/FormatComponents/Container";
import Columns from "../Components/FormatComponents/Columns";
import Column from "../Components/FormatComponents/Column";
import Layout from "../Components/Layout/Layout";
import Backpack from "../images/E.png";
import TitleComponent from "../Components/TitleComponent";
import FooterNext from "../Components/Footer/FooterNext";
import AboutSection from "../Components/AboutSection";
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
              <div className="column is-8 has-text-centered">
                <form className="login-form" action="/api/login" method="POST">
                  <h2>Make sure to login with the info that I sent you.</h2>

                  <div className="centerdiv">
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Username"
                          name="username"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <div class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Password"
                          name="password"
                        />
                      </div>
                      <PBtn type="submit">Get Freebies</PBtn>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Container>
        <AboutSection />
        <FooterNext />
      </div>
    </Layout>
  );
};

Freebies.getInitialProps = async function({ req, query }) {
  const baseUrl = req ? `${req.protocol}://${req.get("Host")}` : "";
  const response = await fetch(baseUrl + "/api/freebies");

  const freebies = await response.json();
  return { freebies: freebies };
};
export default Freebies;

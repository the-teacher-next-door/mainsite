import React, { Component } from "react";
import Header from "../Components/Header";
import ContactForm from "../Components/ContactForm";
import Layout from "../Components/Layout/Layout";
import Footer from "../Components/Footer/FooterNext";
const Contact = props => {
  return (
    <Layout>
      <div className="contact">
        <Header />
        <ContactForm />
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default Contact;

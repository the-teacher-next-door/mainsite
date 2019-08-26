import React, { Component } from "react";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import IconNav from "../Components/IconNav";
import Header from "../Components/Header";
import ContactForm from "../Components/ContactForm";
import Layout from "../Components/Layout/Layout";
import Footer from "../Components/Footer";
import TabletNav from "../Components/TabletNav";
const Contact = props => {
  return (
    <Layout>
      <div className="contact">
        <TabletNav />
        <Header />
        <ContactForm />
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default Contact;

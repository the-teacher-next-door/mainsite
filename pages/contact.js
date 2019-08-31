import React, { Component } from "react";
import PBtn from "../Components/PBtn";
import Input from "../Components/Input";
import IconNav from "../Components/IconNav";
import Header from "../Components/Header";
import ContactForm from "../Components/ContactForm";
import Layout from "../Components/Layout/Layout";
import Footer from "../Components/Footer";
import TabletNav from "../Components/TabletNav";
import MobileNav from "../Components/MobileNav";
import MobileFooter from "../Components/mobileFooter";
const Contact = props => {
  return (
    <Layout>
      <div className="contact">
        <TabletNav />
        <MobileNav />
        <Header />
        <ContactForm />
        <Footer></Footer>
        <MobileFooter />
      </div>
    </Layout>
  );
};

export default Contact;

import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Input from "./Input";
import ContainerFluid from "./FormatComponents/ContainerFluid";
import Container from "./FormatComponents/Container";
import Columns from "./FormatComponents/Columns";
import Column from "./FormatComponents/Column";
import PBtn from "./PBtn";
import Letter from "../images/A.png";
const ContactForm = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [topic, settopic] = useState("blog");
  const handleSubmit = e => {
    e.preventDefault();
    let fd = new FormData(e.target);

    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      text: fd.get("text"),
      topic: fd.get("topic")
    };
    api.sendEmail(data).then(res => {
      console.log(res);
    });
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "text":
        setText(e.target.value);
        break;
      case "topic":
        settopic(e.target.value);
      default:
        break;
    }
  };

  return (
    <ContainerFluid className="contact-form light-gray-background">
      <Container>
        <img src={Letter} alt="" />
        <h1>Contact Jenn</h1>
        <p>
          Have questions? Please contact me and I will respond as soon as
          possible.
        </p>
      </Container>
      <form id="convert-form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="columns is-centered is-multiline">
            <div className="column is-2 relative">
              <Input
                className="convert-input"
                id="convert-name"
                type="text"
                placeholder="First Name"
                name="name"
                onChange={handleChange}
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="column is-2 relative">
              <Input
                className="convert-input"
                id="convert-email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <i className="far fa-envelope"></i>
            </div>
            <div className="column is-2 relative">
              <select name="topic" onChange={handleChange} value={topic}>
                <option value="blog">Blog</option>
                <option value="purchase">Purchase</option>
                <option value="testimonial">Testimonial</option>
                <option value="other">Other</option>
              </select>
              <i className="fas fa-info"></i>
            </div>
          </div>
          <Container>
            <Columns className="is-centered">
              <Column className="is-6">
                <label for="message">Email Message:</label>
                <textarea
                  id="message"
                  value={text}
                  name="text"
                  onChange={handleChange}
                ></textarea>
              </Column>
            </Columns>
          </Container>
        </div>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-2">
              <PBtn type="submit">Send</PBtn>
            </div>
          </div>
        </div>
      </form>
    </ContainerFluid>
  );
};

export default ContactForm;

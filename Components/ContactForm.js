import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Input from "./Input";

const ContactForm = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [issue, setIssue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    let fd = new FormData(e.target);

    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      text: fd.get("text"),
      issue: fd.get("issue")
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
      case "issue":
        setIssue(e.target.value);
      default:
        break;
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} method="POST">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="form-group">
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="email"
        />
        <select name="issue" onChange={handleChange}>
          <option value="blog">Blog</option>
          <option value="purchase">Purchase</option>
          <option value="testimonial">Testimonial</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label for="message">Email</label>
        <textarea
          className="form-control"
          rows="5"
          id="message"
          value={text}
          name="text"
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;

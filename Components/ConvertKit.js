import React, { Component } from "react";
import Input from "./Input";
import PBtn from "./PBtn";
import { Helmet } from "react-helmet";
import api from "../utils/api";
import Letter from "../images/A.png";
class ConvertKit extends Component {
  state = {
    name: "",
    email: "",
    tags: "",
    loading: false,
    title: this.props.title,
    button: "Yes, Please"
  };

  /**
   * Submit the convertkit form
   * @param {*} e
   */
  submitForm = e => {
    this.onSuccess();
    e.preventDefault();
    console.log(e.target);
    let data = {
      first_name: this.state.name,
      email: this.state.email,
      tags: this.state.tags
    };

    /**
     * submit the subscriber and update the form
     */
    api.submitSubscriber(data).then(data => {
      this.setState({
        loading: false,
        title: "Check your email!",
        name: "",
        email: "",
        button: "SUBMITTED"
      });
      document.getElementById("convert-name").value = "";
      document.getElementById("convert-email").value = "";
      document.getElementById("convert-select").value = "grade";
      console.log(data);
    });
  };

  /**
   *  Handle the change event when typing in the input
   * @param {*} event
   */
  handleChange = event => {
    if (event.target.name === "name") {
      this.setState({
        name: event.target.value
      });
    }

    if (event.target.name === "email") {
      this.setState({
        email: event.target.value
      });
    }

    if (event.target.name === "tags") {
      console.log(event.target.value);
      this.setState({
        tags: event.target.value
      });
    }
  };

  onSuccess = () => {
    this.setState({
      loading: true,
      title: "Submitting form...",
      button: "..."
    });
  };
  render() {
    return (
      <div className="container-fluid convertKit">
        <div className="container">
          <img src={Letter} alt="" />
          <h1>{this.state.title}</h1>
          <h2>
            Gain access to a library of FREE resources for upper elementary
            grades!
          </h2>
          <p>
            By entering your information, you agree to receive email from me.
            Per my privacy policy, you may unsubscribe at any time.
          </p>
        </div>

        <form id="convert-form" onSubmit={this.submitForm}>
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-2 relative">
                <Input
                  className="convert-input"
                  id="convert-name"
                  type="text"
                  placeholder="First Name"
                  name="name"
                  onChange={this.handleChange}
                />
                <i class="fas fa-user"></i>
              </div>
              <div className="column is-2 relative">
                <Input
                  className="convert-input"
                  id="convert-email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
                <i class="far fa-envelope"></i>
              </div>
              <div className="column is-2 relative">
                <select
                  name="tags"
                  onChange={this.handleChange}
                  id="convert-select"
                >
                  <option value="grade" defaultValue="selected">
                    Select a Grade
                  </option>
                  <option value="548828">Pre-k</option>
                  <option value="548830">First</option>
                  <option value="548832">Second</option>
                  <option value="548833">Third</option>
                  <option value="548834">Fourth</option>
                  <option value="548836">Fifth</option>
                  <option value="548837">Sixth</option>
                </select>
                <i class="fas fa-graduation-cap"></i>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-2">
                <PBtn type="submit">{this.state.button}</PBtn>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ConvertKit;

//TYgg8lXToCzj3_E7q4JnLw
//988284

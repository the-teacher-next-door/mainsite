import React, { Component } from "react";
import Input from "./Input";
import PBtn from "./PBtn";
import { Helmet } from "react-helmet";
import api from "../utils/api";
import Letter from "../images/A.png";
import TitleComponent from "./TitleComponent";
import Container from "./FormatComponents/Container";
import Columns from "./FormatComponents/Columns";
import Column from "./FormatComponents/Column";
class ConvertKit extends Component {
  state = {
    name: "",
    email: "",
    tags: "",
    loading: false,
    title: this.props.title,
    button: "Yes, Please",
    errorText: ""
  };

  /**
   * Submit the convertkit form
   * @param {*} e
   */
  submitForm = e => {
    e.preventDefault();
    if (this.state.name === "") {
      this.setState({
        errorText: "Name is required."
      });
    } else if (this.state.email === "") {
      this.setState({
        errorText: "Email is required."
      });
    } else if (this.state.tags === "grade" || this.state.tags === "") {
      this.setState({
        errorText: "A grade must be selected."
      });
    } else {
      this.onSuccess();
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
          button: "SUBMITTED",
          errorText: ""
        });
        document.getElementById("convert-name").value = "";
        document.getElementById("convert-email").value = "";
        document.getElementById("convert-select").value = "grade";
        console.log(data);
      });
    }
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
          <TitleComponent img={Letter} h1={this.state.title} />
          <h2>
            Gain access to a library of FREE resources for upper elementary
            classrooms!
          </h2>
          <p>
            By entering your information, you agree to receive email from me.
            Per my privacy policy, you may unsubscribe at any time.
          </p>
        </div>

        <form id="convert-form" onSubmit={this.submitForm}>
          <Container>
            <Columns className="is-centered">
              <Column className="is-6">
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field has-addons">
                      <p className="control">
                        <a className="button is-static">
                          <i class="fas fa-user"></i>
                        </a>
                      </p>
                      <p className="control is-expanded">
                        <Input
                          className="input"
                          id="convert-name"
                          type="text"
                          placeholder="First Name"
                          name="name"
                          onChange={this.handleChange}
                        />
                      </p>
                    </div>
                    <div className="field has-addons">
                      <p className="control">
                        <a className="button is-static">
                          <i class="far fa-envelope"></i>
                        </a>
                      </p>
                      <p className="control is-expanded">
                        <Input
                          className="input"
                          id="convert-email"
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={this.handleChange}
                        />
                      </p>
                    </div>

                    <div className="field has-addons is-narrow">
                      <p className="control">
                        <a className="button is-static">
                          <i class="fas fa-graduation-cap"></i>
                        </a>
                      </p>
                      <p className="control full">
                        <div className="select is-fullwidth">
                          <select
                            className="is-fullwidth"
                            name="tags"
                            onChange={this.handleChange}
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
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
                <PBtn type="submit">{this.state.button}</PBtn>
                <p className="errorText">{this.state.errorText}</p>
              </Column>
            </Columns>
          </Container>
        </form>
      </div>
    );
  }
}

export default ConvertKit;

//TYgg8lXToCzj3_E7q4JnLw
//988284

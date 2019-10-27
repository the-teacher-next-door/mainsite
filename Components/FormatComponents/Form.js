import React from "react";
import Input from "../Input";
import Container from "./Container";
import Columns from "./Columns";
import Column from "./Column";
import PBtn from "../PBtn";
const Form = props => {
  return (
    <form
      className={props.className === undefined ? " " : props.className}
      id={props.id === undefined ? " " : props.id}
      action={props.actions}
      method={props.method}
      onSubmit={props.onSubmit}
    >
      <Container>
        <Columns>
          <Column className="is-2 relative">
            <Input
              className="convert-input"
              id="convert-name"
              type="text"
              placeholder="First Name"
              name="name"
              onChange={props.onChange}
            />
            <i className={props.nameIcon}></i>
          </Column>
          <Column className="is-2 relative">
            <Input
              className="convert-input"
              id="convert-email"
              type="text"
              placeholder="Email"
              name="email"
              onChange={props.onChange}
            />
            <i className={props.emailIcon}></i>
          </Column>
          <Column className="is-2 relative">
            <select
              name={props.selectName}
              onChange={props.onChange}
              id="convert-select"
            >
              {props.options}
            </select>
            <i className={props.selectIcon}></i>
          </Column>

          {/* Any additional fields like the TextBox on the Contact Form */}
          {props.children === undefined ? (
            ""
          ) : (
            <Column>{props.children}</Column>
          )}
        </Columns>

        {/*  Button Container */}
      </Container>
      <Container>
        <Columns>
          <Column className="is-2">
            <PBtn type="submit">{props.buttonText}</PBtn>
          </Column>
        </Columns>
      </Container>
    </form>
  );
};

export default Form;

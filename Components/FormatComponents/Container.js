import React from "react";

const Container = props => (
  <div
    className={`container ${
      props.className === undefined ? "" : props.className
    }`}
    id={props.id === undefined ? "" : props.id}
  >
    {props.children}
  </div>
);

export default Container;
